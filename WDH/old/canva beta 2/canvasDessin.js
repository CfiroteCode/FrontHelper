var canvas = document.getElementById("canvasZone");
var context = canvas.getContext("2d");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var typeFonction = 0;
canvas.width = document.getElementById("canvasZone").clientWidth;
canvas.height = document.getElementById("canvasZone").clientHeight;
var sectionV = Math.round(canvas.width / 12);
var sectionH = Math.round(canvas.height / 14);
var ligneTotalV = 12;
var ligneTotalH = 14;
var pLigne = 0;
var plus = canvas.height;
var moins = 0;
var enregistrement = [];
var redo = [];
var zones = [];
var division;
var dirrection = 500;
var total = 0;
var parrentDiv = "texthtml";
var block = [];
var compteur = 0;

function affichageLignes() {
  if (enregistrement.length >= 1) {
    for (i = 0; i < enregistrement.length; i++) {

      if (enregistrement[i][1] == 0) {
        context.moveTo(enregistrement[i][2], enregistrement[i][4]);
        context.lineTo(enregistrement[i][2], enregistrement[i][3]);
      } else {
        context.moveTo(enregistrement[i][4], enregistrement[i][2]);
        context.lineTo(enregistrement[i][3], enregistrement[i][2]);
      }
    }
    context.stroke();
  }
}

function writeMessage(canvas, message) { // zone et type de text de debugage
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.globalAlpha = 1;
  context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) { // recupere la position de la souris sur le canvas
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

btn1.addEventListener('click', function () {//detecte le clic sur le boutton 1
  typeFonction = 0;
  plus = canvas.height;
}, false);

btn2.addEventListener('click', function () {//detecte le clic sur le boutton 2
  typeFonction = 1;
  plus = canvas.width;
}, false);

btn3.addEventListener('click', function () {  //crée la fonction de UNDO
  if (enregistrement.length >= 1) {
    redo.push(enregistrement[enregistrement.length - 1]);
    enregistrement.splice(enregistrement.length - 1, 1)
    moins = 0;
    plus = canvas.width;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    context.setLineDash([1, 0]);
    context.globalAlpha = 1;
    context.beginPath();

    affichageLignes();
  }
}, false);

btn4.addEventListener('click', function () {  //crée la fonction de UNDO
  if (redo.length >= 1) {
    enregistrement.push(redo[redo.length - 1]);
    redo.splice(redo.length - 1, 1)
    moins = 0;
    plus = canvas.width;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    context.setLineDash([1, 0]);
    context.globalAlpha = 1;
    context.beginPath();

    affichageLignes();
  }
}, false);

canvas.addEventListener('mousemove', function (evt) {//fonction principale qui fonctionne tout le temp dés que la souris est sur le canvas
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' , ' + enregistrement.length;
  writeMessage(canvas, message);
  context.lineWidth = 1;
  context.setLineDash([1, 0]);
  context.globalAlpha = 1;
  context.beginPath();

  affichageLignes();

  //si on utilise l'outil de ligne verticale (btn1)

  if (typeFonction == 0) {
    moins = 0;
    plus = canvas.height;

    if (enregistrement.length >= 1) {
      for (i = 0; i < enregistrement.length; i++) {
        if (enregistrement[i][1] == 1) {
          if (enregistrement[i][3] > mousePos.x && enregistrement[i][4] < mousePos.x) {
            if (enregistrement[i][2] > moins && enregistrement[i][2] < mousePos.y) {

              moins = enregistrement[i][2];
            } else if (enregistrement[i][2] < plus && enregistrement[i][2] > mousePos.y) {

              plus = enregistrement[i][2];
            }

          }
        }
      }
    }
    if (mousePos.x < sectionV) {
      pLigne = sectionV;
      context.moveTo(pLigne, moins);
      context.lineTo(pLigne, plus);
      block = 0;
    } else if (mousePos.x > (sectionV * 10) + (sectionV / 2)) {
      pLigne = sectionV * 11;
      context.moveTo(pLigne, moins);
      context.lineTo(pLigne, plus);
      block = 12;
    } else {

      for (var i = 1; i < 12; i++) {
        if (mousePos.x >= (i * sectionV - sectionV / 2) && mousePos.x <= (i * sectionV + sectionV / 2)) {
          pLigne = sectionV * i;
          context.moveTo(pLigne, moins);
          context.lineTo(pLigne, plus);
          block = i;
        }
      }
    }
    context.stroke();
  }

  //si on utilise l'outil de ligne Horizontale (btn2)
  if (typeFonction == 1) {
    moins = 0;
    plus = canvas.width;

    if (enregistrement.length >= 1) {
      for (i = 0; i < enregistrement.length; i++) {
        if (enregistrement[i][1] == 0) {
          if (enregistrement[i][3] > mousePos.y && enregistrement[i][4] < mousePos.y) {
            if (enregistrement[i][2] > moins && enregistrement[i][2] < mousePos.x) {

              moins = enregistrement[i][2];
            } else if (enregistrement[i][2] < plus && enregistrement[i][2] > mousePos.x) {

              plus = enregistrement[i][2];
            }

          }
        }
      }
    }
    if (mousePos.y < sectionH) {
      pLigne = sectionH;
      context.moveTo(moins, pLigne);
      context.lineTo(plus, pLigne);
      block = 0;
    } else if (mousePos.y > (sectionH * 12) + (sectionH / 2)) {
      pLigne = sectionH * 13;
      context.moveTo(moins, pLigne);
      context.lineTo(plus, pLigne);
      block = 14;
    } else {

      for (var i = 1; i < 14; i++) {
        if (mousePos.y >= (i * sectionH - sectionH / 2) && mousePos.y <= (i * sectionH + sectionH / 2)) {
          pLigne = sectionH * i;
          context.moveTo(moins, pLigne);
          context.lineTo(plus, pLigne);
          block = i;
        }
      }
    }
    context.stroke();
  }

  //dessin de la grille presque invisible
  context.lineWidth = 3;
  context.setLineDash([8, 3]);
  context.globalAlpha = .1;

  ligneTotalV = 12
  for (var i = 0; i < canvas.width; i++) {
    if (i != 0) {
      if (i % sectionV == 0) {
        ligneTotalV--;
        if (ligneTotalV > 0) {
          context.moveTo(i, 0);
          context.lineTo(i, canvas.height);
        }
      }
    }
  }
  ligneTotalH = 15;
  for (var i = 0; i < canvas.height; i++) {
    if (i != 0) {

      if (i % sectionH == 0) {
        ligneTotalH--;
        if (ligneTotalH > 0) {
          context.moveTo(0, i);
          context.lineTo(canvas.width, i);
        }
      }
    }
  }
  context.stroke();


}, false);

canvas.addEventListener('mouseleave', function (evt) { // fonction en cas de sortie de la souris du canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 1;
  context.setLineDash([1, 0]);
  context.globalAlpha = 1;
  context.beginPath();

  affichageLignes();
});

canvas.addEventListener('click', dessine); //detecte le clic sur le canvas

function dessine(evt) { //ajoute une ligne à la liste des ellement à afficher et l'enregistre dans l'array 2d

  for (i = 0; i < enregistrement.length; i++) {
    if (typeFonction == enregistrement[i][1] && pLigne == enregistrement[i][2] && plus == enregistrement[i][3] && moins == enregistrement[i][4]) {
      return;
    }
  }
  if (typeFonction == 0) {
    enregistrement.push([0, typeFonction, pLigne, plus, moins, block]);
  } else if (typeFonction == 1) {
    enregistrement.push([0, typeFonction, pLigne, plus, moins, block]);
  }

  ecritureHTML();
}

function compareNombres(a, b) {
  return a - b;
}

function ecritureHTML() {

  var temporaire = [];
  zones = [];
  var horientation;
  var positionZone = 2;
  parrentDiv = "texthtml";
  compteur = 0;

  if (enregistrement.length >= 1) {
    total = enregistrement.length;

    var myNode = document.getElementById("texthtml"); // effacement de tout ce qui est écrit dans le text HTML pour réeccrire au propre
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }

    // temporaire.push(enregistrement[0][1] , 0)

    for (i = 0; i < enregistrement.length; i++) {
      if (enregistrement[i][3] == canvas.width && enregistrement[i][4] == 0 || enregistrement[i][3] == canvas.height && enregistrement[i][4] == 0) {
        total--;

        temporaire.push(enregistrement[i][2]);



        var div = document.createElement("div");
        div.setAttribute('id', compteur);
        div.innerHTML = "" + compteur;
        var div2 = document.createElement("div");
        div2.innerHTML = "/" + compteur;
        document.getElementById(parrentDiv).appendChild(div);
        document.getElementById(parrentDiv).appendChild(div2);
        dirrection = enregistrement[0][1];
      }
    }

    horientation = enregistrement[0][1];

    if (horientation == 0) {
      temporaire.push(canvas.width);
    } else {
      temporaire.push(canvas.height);
    }

    temporaire = temporaire.sort(compareNombres);
    temporaire.unshift(enregistrement[0][1], 0);
    zones.push(temporaire);

    temporaire = [];

    var passage = 0;

    start: while (true) {
      var debut = true;
      var y = 0;
      for (i = 0; i < enregistrement.length; i++) {
        var test = zones[0].length - 2;

        if (horientation == 0) {
          horientation = 1;
        } else {
          horientation = 0;
        }

        for (var y = 0; y < test; y++) {

          if (enregistrement[i][3] == zones[passage][y + 2] && enregistrement[i][4] == zones[passage][y + 1]) {
            if (debut) {
              compteur++;

              debut = false;
              parrentDiv = y;
              var div = document.createElement("div");
              div.setAttribute('id', compteur);
              div.innerHTML = "" + compteur;
              var div2 = document.createElement("div");
              div2.innerHTML = "/" + compteur;
              document.getElementById(parrentDiv).appendChild(div);
              document.getElementById(parrentDiv).appendChild(div2);
              temporaire.push(enregistrement[i][4]);

            }

            compteur++

            parrentDiv = y;
            var div = document.createElement("div");
            div.setAttribute('id', compteur);
            div.innerHTML = "" + compteur;
            var div2 = document.createElement("div");
            div2.innerHTML = "/" + compteur;
            document.getElementById(parrentDiv).appendChild(div);
            document.getElementById(parrentDiv).appendChild(div2);
            total--
            temporaire.push(enregistrement[i][3]);

          }
        }
      }
      temporaire = temporaire.sort(compareNombres);
      temporaire.unshift(horientation);
      zones.push(temporaire);
      temporaire = [];
      console.log(zones);
      passage++;
      if (total > 0) continue start;
      break;
    }

    /*
        ------------ code précédent --------------------
    
        if(total == 0){
          appartement.push([enregistrement[0][1], enregistrement[0][5], 0, total]);
          var div = document.createElement("div");
            div.setAttribute('id', 0);
            div.innerHTML = "" + 0;
            var div2 = document.createElement("div");
            div2.innerHTML = "/" + 0;
            document.getElementById(parrentDiv).appendChild(div);
            document.getElementById(parrentDiv).appendChild(div2);
            dirrection = enregistrement[0][1];
        }
    
        for (i = 0; i < enregistrement.length; i++) {
          if (enregistrement[i][3] == canvas.width && enregistrement[i][4] == 0 || enregistrement[i][3] == canvas.height && enregistrement[i][4] == 0) {
            total++;
            appartement.push([enregistrement[i][1], enregistrement[0][5], i, total]);
            var div = document.createElement("div");
            div.setAttribute('id', i + 1);
            div.innerHTML = "" + (i + 1);
            var div2 = document.createElement("div");
            div2.innerHTML = "/" + (i + 1);
            document.getElementById(parrentDiv).appendChild(div);
            document.getElementById(parrentDiv).appendChild(div2);
          }
        }
    
        ------------ code précédent --------------------
     
        for (j=0;j<total;j++){
          for (i = 0; i < enregistrement.length; i++) {
            if(dirrection != enregistrement[i][1]){
    
            }
          }
        }
    
       
        dirrection = enregistrement[0][1];
        total = 0;
        for (i = 0; i < enregistrement.length; i++) { //on commence par dettecter les lignes de taille maximum
          if (enregistrement[i][3] == canvas.height || enregistrement[i][3] == canvas.width) {
            total++;
          }
        }
        for (i = 0; i <= total; i++) {
          appartement.push([dirrection, i, i + 1]);
          var div = document.createElement("div");
          div.setAttribute('id', i + 1);
          div.innerHTML = "" + (i + 1);
          var div2 = document.createElement("div");
          div2.innerHTML = "/" + (i + 1);
          document.getElementById(parrentDiv).appendChild(div);
          document.getElementById(parrentDiv).appendChild(div2);
        }
        var totalLignes = enregistrement.length; // creation d'une variable pour arréter le script si il n'y a plus de lignes
        totalLignes -= total;
        */
  }

}


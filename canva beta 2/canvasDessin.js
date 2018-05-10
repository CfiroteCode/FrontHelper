var canvas = document.getElementById("canvasZone");
var context = canvas.getContext("2d");
var btn1 = document.getElementById("1");
var btn2 = document.getElementById("2");
var btn3 = document.getElementById("3");
var btn4 = document.getElementById("4");
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

var div = document.getElementById("texthtml");
var text = "Hello World";


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
    //affiche les lignes enregistré si il y en a
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
    //affiche les lignes enregistré si il y en a
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
}, false);

canvas.addEventListener('mousemove', function (evt) {//fonction principale qui fonctionne tout le temp dés que la souris est sur le canvas
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' , ' + enregistrement[1];
  writeMessage(canvas, message);
  context.lineWidth = 1;
  context.setLineDash([1, 0]);
  context.globalAlpha = 1;
  context.beginPath();

  //affiche les lignes enregistré si il y en a
  for (i = 0; i < enregistrement.length; i++) {

    if (enregistrement[i][1] == 0) {
      context.moveTo(enregistrement[i][2], enregistrement[i][4]);
      context.lineTo(enregistrement[i][2], enregistrement[i][3]);
    } else {
      context.moveTo(enregistrement[i][4], enregistrement[i][2]);
      context.lineTo(enregistrement[i][3], enregistrement[i][2]);
    }
  }

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
    } else if (mousePos.x > (sectionV * 10) + (sectionV / 2)) {
      pLigne = sectionV * 11;
      context.moveTo(pLigne, moins);
      context.lineTo(pLigne, plus);
    } else {

      for (var i = 1; i < 12; i++) {
        if (mousePos.x >= (i * sectionV - sectionV / 2) && mousePos.x <= (i * sectionV + sectionV / 2)) {
          pLigne = sectionV * i;
          context.moveTo(pLigne, moins);
          context.lineTo(pLigne, plus);
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
    } else if (mousePos.y > (sectionH * 12) + (sectionH / 2)) {
      pLigne = sectionH * 13;
      context.moveTo(moins, pLigne);
      context.lineTo(plus, pLigne);
    } else {

      for (var i = 1; i < 14; i++) {
        if (mousePos.y >= (i * sectionH - sectionH / 2) && mousePos.y <= (i * sectionH + sectionH / 2)) {
          pLigne = sectionH * i;
          context.moveTo(moins, pLigne);
          context.lineTo(plus, pLigne);
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
  //affiche les lignes enregistré si il y en a
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
});

canvas.addEventListener('click', dessine); //detecte le clic sur le canvas

function dessine(evt) { //ajoute une ligne à la liste des ellement à afficher et l'enregistre dans l'array 2d

  var mousePos = getMousePos(canvas, evt);
  if (typeFonction == 0) {
    enregistrement.push([0, typeFonction, pLigne, plus, moins]);
  } else if (typeFonction == 1) {
    enregistrement.push([0, typeFonction, pLigne, plus, moins]);
  }
  div.textContent = text;
}

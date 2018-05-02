var canvas = document.getElementById("canvasZone");
var context = canvas.getContext("2d");
var typeFonction = 0;
var enregistrement = [];
var redo =[];
var btn1 = document.getElementById('1');
var btn2 = document.getElementById('2');
var btn3 = document.getElementById('3');
var btn4 = document.getElementById('4');
var moins = 0;
var plus = 0;


canvas.width = document.getElementById("canvasZone").clientWidth;
canvas.height = document.getElementById("canvasZone").clientHeight;

plus = canvas.width;

function writeMessage(canvas, message) { //debug de la position de la souris, et des var plus et moins
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) { // recupere la position de la souris sur le canvas
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function dessine(evt) { //ajoute une ligne à la liste des ellement à afficher et l'enregistre dans l'array 2d
  var mousePos = getMousePos(canvas, evt);
  if (typeFonction == 0) {
    enregistrement.push([0, typeFonction, mousePos.y, plus, moins]);
  } else if (typeFonction == 1) {
    enregistrement.push([0, typeFonction, mousePos.x, plus, moins]);
  }

}
canvas.addEventListener('click', dessine); //detecte le clic sur le canvas

btn1.addEventListener('click', function () {//detecte le clic sur le boutton 1
  typeFonction = 0;
}, false)
btn2.addEventListener('click', function () {//detecte le clic sur le boutton 2
  typeFonction = 1;
}, false)
btn3.addEventListener('click', function (){  //crée la fonction de UNDO
  redo.push (enregistrement[enregistrement.length-1]);
  enregistrement.splice(enregistrement.length-1,1)
  moins = 0;
  plus = canvas.width;
}, false)
btn4.addEventListener('click', function (){  //crée la fonction de UNDO
  enregistrement.push (redo[redo.length-1]);
  redo.splice(redo.length-1,1)
  moins = 0;
  plus = canvas.width;
}, false)

canvas.addEventListener('mousemove', function (evt) {//fonction principale qui fonctionne tout le temp dés que la souris est sur le canvas
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' , ' + moins + ' , ' + plus + ' , ' + redo.length;
  writeMessage(canvas, message);
  context.beginPath();
  for (i = 0; i < enregistrement.length; i++) { //affiche les lignes enregistré si il y en a

    if (enregistrement[i][1] == 0) {
      context.moveTo(enregistrement[i][4], enregistrement[i][2]);
      context.lineTo(enregistrement[i][3], enregistrement[i][2]);
    } else {
      context.moveTo(enregistrement[i][2], enregistrement[i][4]);
      context.lineTo(enregistrement[i][2], enregistrement[i][3]);
    }
  }
  if (typeFonction == 0) { // vérifie si on est en mode ajoute de ligne Horizontal
    if (enregistrement.length >= 1) {
      moins = 0;
      plus = canvas.width;
      for (i = 0; i < enregistrement.length; i++) {
        if (enregistrement[i][1] == 1) {
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
    context.strokeStyle = 'black';
    context.moveTo(moins, mousePos.y);
    context.lineTo(plus, mousePos.y);
  } else if (typeFonction == 1) { // vérifie si on est en mode ajoute de ligne vertical
    if (enregistrement.length >= 1) {
      moins = 0;
      plus = canvas.width;
      for (i = 0; i < enregistrement.length; i++) {
        if (enregistrement[i][1] == 0) {
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
    context.strokeStyle = 'black';
    context.moveTo(mousePos.x, moins);
    context.lineTo(mousePos.x, plus);
  }
  context.stroke();
}, false);

canvas.addEventListener('mouseleave', function(evt){
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < enregistrement.length; i++) { //affiche les lignes enregistré si il y en a

    if (enregistrement[i][1] == 0) {
      context.moveTo(enregistrement[i][4], enregistrement[i][2]);
      context.lineTo(enregistrement[i][3], enregistrement[i][2]);
    } else {
      context.moveTo(enregistrement[i][2], enregistrement[i][4]);
      context.lineTo(enregistrement[i][2], enregistrement[i][3]);
    }
  }
  context.stroke();
});
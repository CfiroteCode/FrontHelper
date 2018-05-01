var canvas = document.getElementById("canvasZone");
var context = canvas.getContext("2d");
var typeFonction = 0;
var enregistrement = [];
var btn1 = document.getElementById('1');
var btn2 = document.getElementById('2');
var moins = 0;
var plus = 0;


canvas.width = document.getElementById("canvasZone").clientWidth;
canvas.height = document.getElementById("canvasZone").clientHeight;

plus = canvas.width;

function writeMessage(canvas, message) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function dessine(evt) {
  var mousePos = getMousePos(canvas, evt);
  if (typeFonction == 0) {
    enregistrement.push([0, typeFonction, mousePos.y, plus, moins]);
  } else if (typeFonction == 1) {
    enregistrement.push([0, typeFonction, mousePos.x, plus, moins]);
  }
  compteur++;

}
canvas.addEventListener('click', dessine);

btn1.addEventListener('click', function () {
  typeFonction = 0
}, false)
btn2.addEventListener('click', function () {
  typeFonction = 1
}, false)

canvas.addEventListener('mousemove', function (evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' , ' + moins + ' , ' + plus;
  writeMessage(canvas, message);
  context.beginPath();
  for (i = 0; i < enregistrement.length; i++) {

    if (enregistrement[i][1] == 0) {
      context.moveTo(enregistrement[i][4], enregistrement[i][2]);
      context.lineTo(enregistrement[i][3], enregistrement[i][2]);
    } else {
      context.moveTo(enregistrement[i][2], enregistrement[i][4]);
      context.lineTo(enregistrement[i][2], enregistrement[i][3]);
    }
  }
  if (typeFonction == 0) {
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
    context.moveTo(moins, mousePos.y);
    context.lineTo(plus, mousePos.y);
  } else if (typeFonction == 1) {
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
    context.moveTo(mousePos.x, moins);
    context.lineTo(mousePos.x, plus);
  }
  context.stroke();
}, false);
var canvas = document.getElementById("canvasZone");
var context = canvas.getContext("2d");
var typeFonction = 0;
var enregistrement = [];
var btn1 = document.getElementById('1');
var btn2 = document.getElementById('2');


canvas.width = document.getElementById("canvasZone").clientWidth;
canvas.height = document.getElementById("canvasZone").clientHeight;

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
function dessine(evt){
  var mousePos = getMousePos(canvas, evt);
  if(typeFonction==0){
  enregistrement.push([0,typeFonction,mousePos.y]);
  }else if (typeFonction==1){
  enregistrement.push([0,typeFonction,mousePos.x]);
  }
  compteur++;
  
}
canvas.addEventListener('click', dessine);

btn1.addEventListener('click', function(){
  typeFonction = 0
},false)
btn2.addEventListener('click', function(){
  typeFonction = 1
},false)

canvas.addEventListener('mousemove', function (evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' , '+ enregistrement.length;
  writeMessage(canvas, message);
  context.beginPath();
    for (i=0; i<enregistrement.length;i++){

      if(enregistrement[i][1]==0){
      context.moveTo(0,enregistrement[i][2]);
      context.lineTo(canvas.width, enregistrement[i][2]);
      }else{
      context.moveTo(enregistrement[i][2],0);
      context.lineTo(enregistrement[i][2],canvas.height);
      }
    }
    if(typeFonction == 0){
  context.moveTo(0, mousePos.y);
  context.lineTo(canvas.width, mousePos.y);
    }else if (typeFonction == 1){
  context.moveTo(mousePos.x,0);
  context.lineTo(mousePos.x, canvas.height);
    }
  context.stroke();
}, false);
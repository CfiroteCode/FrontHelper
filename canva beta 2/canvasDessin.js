var canvas = document.getElementById("canvasZone");
var context = canvas.getContext("2d");



canvas.width = document.getElementById("canvasZone").clientWidth;
canvas.height = document.getElementById("canvasZone").clientHeight;
var sectionV = Math.round(canvas.width / 12);
var sectionH = Math.round(canvas.height / 15);
var ligneTotalV = 12;
var ligneTotalH = 15;

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

canvas.addEventListener('mousemove', function (evt) {//fonction principale qui fonctionne tout le temp dés que la souris est sur le canvas
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' , ' + sectionH;
  writeMessage(canvas, message);
  context.lineWidth = 1;
  context.setLineDash([1, 0]);
  context.globalAlpha = 1;
  context.beginPath();
  context.moveTo(mousePos.x, 0);
  context.lineTo(mousePos.x, canvas.width);
  context.stroke();

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
});
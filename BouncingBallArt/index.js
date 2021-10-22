//variaveis do jogo
var run = true;

//variaveis da bola
var x = 10;
var y = 10;
var speedX = 6;
var speedY = 4;
var ballDiameter = 15;

//variáveis dos quadrados
var squareList = [];
var squareDimension = 8;
var squareGap = 4;
var firstLoop = true;


var inputRadio = document.getElementById("ball-radio")
inputRadio.setAttribute("value", ballDiameter);

var inputPosX = document.getElementById("ballPosX");
inputPosX.setAttribute("value", x);

var inputPosY = document.getElementById("ballPosY");
inputPosY.setAttribute("value", y);

var inputGap = document.getElementById("squareGap")
inputGap.setAttribute("value", squareGap);

var button = document.getElementById("submit-form");

function switchRun(){
  if(run){
    noLoop();
  }
  else{
    loop();
  }
  run = !run;
}

function setVariables(){
  x = inputPosX.value;
  y = inputPosY.value;
  print(x);
  speedX = 6;
  speedY = 4;
  ballDiameter = inputRadio.value;

  //variáveis dos quadrados
  squareDimension = 8;
  squareGap = inputGap.value;
  setFormValues();
}

function restoreVariables(){
  //variáveis da bola
  x = 10;
  y = 10;
  speedX = 6;
  speedY = 4;
  ballDiameter = 15;

  //variáveis dos quadrados
  squareList = [];
  squareDimension = 8;
  squareGap = 4;
  firstLoop = true;

  setFormValues();
}

function setFormValues(){
  inputRadio.setAttribute("value", ballDiameter);
  inputPosX.setAttribute("value", x);
  inputPosY.setAttribute("value", y);
  inputGap.setAttribute("value", squareGap);
}

//------------------------------------
function setup() {
  createCanvas(600, 500);  
}

function drawSquares(){ //desenha os quadrados
  if (firstLoop){ //se for o primeiro loop, irá desenhar os quadrado e adicionar as coordenadas na lista
    fill(200);
    for(let i = 0; i < width; i+=squareDimension+squareGap){
      for(let z = 0; z< height; z+=squareDimension+squareGap){
        square(i,z, squareDimension);
        squareList.push([i,z]);
      }
  }
    firstLoop = false;
  }
  else{ //caso contrário, irá desenhar os quadrados apenas com as coordenadas da lista
    fill(200);
    squareList.forEach(sq=>{
      square(sq[0],sq[1],squareDimension);
    });
  }
  
}
function bouncingBall(){ //desenha a bola
  let squares
  
  fill(200,0,0);
  if (x + ballDiameter / 2 > width || x < 0){ //caso atinja a direita ou a esquerda, inverte a direção
    speedX = -speedX;
  }
  if (y + ballDiameter / 2 > height || y < 0){ //o mesmo para cima e embaixo
    speedY = -speedY;
  }
  
  circle(x, y, ballDiameter);
  
  collisions();
  
  //move a bola
  x+=speedX;
  y+=speedY;
    
}

function collisions(){
  //se a bola colide com algum quadrado, irá remover as coordenadas da lista e não irá ser desenhado em seguida.
  
  for(let i = 0; i < squareList.length; i++){
    let sq = squareList[i];
    if (x-ballDiameter/2 < squareDimension + sq[0] && x+ballDiameter/2 > sq[0] && y - ballDiameter/2 < sq[1] + squareDimension && y+ballDiameter/2 > sq[1]){
      sq.pop();
      break
    }
  }
}
function draw() {
  background(255);
  drawSquares();
  bouncingBall();
}
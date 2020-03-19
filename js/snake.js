let go;

let box = 10;
let sx = 50,sy = 50;
let sizey = sy*box, sizex = sx*box;
let fruty;

let snakeMoveX = 10, snakeMoveY = 40;
let snake = [{x:snakeMoveX*box,y:snakeMoveY*box},{},{},{}];
let fruit;

let direction = "right";
let lastMove;
let apple = false;
let i;
let dead;

let cvs= document.getElementById("myCanvas");
let ctx= cvs.getContext("2d");
  ctx.canvas.width  = 700;
  ctx.canvas.height = 1000;

window.addEventListener("keydown", function (e) {
  if(e.key === "ArrowRight" && direction !== "left"){
    direction = "right";
  }
  else if(e.key === "ArrowLeft" && direction !== "right"){
    direction = "left";
  }
  else if(e.key === "ArrowUp" && direction !== "down"){
    direction = "up";
  }
  else if(e.key === "ArrowDown" && direction !== "up"){
    direction = "down";
  }
});


start();


function start() {
  go = setInterval(draw, 50);
  spawnFruit();
}
function draw() {
  move();
  gameCheck();
  drawSnake();
  drawFruit();
  drawMap();
}
function move() {
  if (direction === "right" && lastMove !== "left") {
    lastMove = direction;
      snakeMoveX++;
      snake.unshift({x: snakeMoveX * box, y: snakeMoveY * box});
      if (apple !== true) {
        snake.pop();
      }
    } else if (direction === "left" && lastMove !== "right") {
      lastMove = direction;
      snakeMoveX--;
      snake.unshift({x: snakeMoveX * box, y: snakeMoveY * box});
      if (apple !== true) {
        snake.pop();
      }
    } else if (direction === "up" && lastMove !== "down") {
      lastMove = direction;
      snakeMoveY--;
      snake.unshift({x: snakeMoveX * box, y: snakeMoveY * box});
      if (apple !== true) {
        snake.pop();
      }
    } else if (direction === "down" && lastMove !== "up") {
      lastMove = direction;
      snakeMoveY++;
      snake.unshift({x: snakeMoveX * box, y: snakeMoveY * box});
      if (apple !== true) {
        snake.pop();
      }
    } else {
      direction = lastMove;
      move()
    }
  apple = false;
  }
function gameCheck(){
  if(snake[0].x > sizex || snake[0].x < box || snake[0].y > sizey || snake[0].y < box ){
    clearInterval(go);
    dead = true;
    window.addEventListener("keydown",  deadSnake);
  }
  for(i=1; i<snake.length;i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      clearInterval(go);
      dead = true;
      window.addEventListener("keydown",  deadSnake);
    }
  }
  if(fruit.x === snake[0].x && fruit.y === snake[0].y){
    apple = true;
    spawnFruit()
  }
  drawMap()
}
function drawMap() {
  for(let y=0;y<sizex+box;y++){
    ctx.fillStyle = "green";
    ctx.fillRect(0, y,box,box);
    ctx.fillRect(sizex+box, y,box,box);
  }
  for(let x=0;x<sizey+box;x++){
    ctx.fillStyle = "green";
    ctx.fillRect(x, 0,box,box);
    ctx.fillRect(x, sizey+box,box,box);
  }
}
function drawSnake() {
  if(!dead){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (i = 0; i < snake.length; i++) {
      ctx.fillStyle = "black";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
      ctx.strokeStyle = "darkolivegreen";
      ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }
  }
}
function drawFruit(){
  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x, fruit.y,box,box);
}
function spawnFruit() {
  fruit = {x: Math.ceil(Math.random() * sx) * box, y: Math.ceil(Math.random() * sy) * box};
  for (let i = 0; i < snake.length; i++) {
    if (fruit.x === snake[i].x && fruit.y === snake[i].y){
      fruty = false;
    }
  }
  if (fruty === true){
    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x, fruit.y, box, box);
  }
  else{
    fruty = true;
    spawnFruit();
  }
}
function deadSnake() {
  reset()
}
function reset() {
  snakeMoveX = 10;
  snakeMoveY = 40;
  snake = [{x:snakeMoveX*box,y:snakeMoveY*box},{},{},{}];
  direction = "right";
  lastMove = "";
  apple = false;
  dead = false;
  window.removeEventListener("keydown", deadSnake);
  start()
}

//Tar för lång tid att måla bakgrund
// drawGameBackground();
// function drawGameBackground(){
//   for(var y=0*box;y<sizey;y++){
//     for(var x=0*box;x<sizex;x++){
//       console.log("hej")
//       ctx.fillStyle = (i===true)?"green":"lime";
//       console.log(x);
//       console.log(y);
//       ctx.fillRect(x*box, y*box,box,box);
//       i=!i;
//     }
//   }
// }

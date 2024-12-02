// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let started = false;
let bounce = 0;
let vel = 0;
let pos = 0;

function preload(){
  
}

function setup() {
  createCanvas(300, 200);
  textSize(30);
  textAlign(CENTER);
  pos = createVector(width/2, height/2);
  vel = createVector(5, 3)

  if (localStorage.getItem("bounce") === null) {
    localStorage.setItem("bounce", 0)
  } else {
    bounce = int(localStorage.getItem("bounce"))
  }
}

function draw() {
  background(220);

  if (started === false){
    text("click to begin", width/2, height/2)

    if (mouseIsPressed){
      started = true;
    }
  } else {
    text(bounce, width/2, height/2)
    move();
  }
}

function move(){
  pos.add(vel);

  if (pos.x < 0 || pos.x > width) {
    bounce += 1
    vel.x *= -1;
  }

  if (pos.y < 0 || pos.y > height) {
    bounce += 1;
    vel.y *= -1
  }
  
  localStorage.setItem("bounce", bounce)
  circle(pos.x, pos.y, 20)
}
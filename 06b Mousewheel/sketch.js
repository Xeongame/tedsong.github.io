// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let w = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  noFill()
  x = width/2
  y = height/2
}

function draw() {
  x = lerp(x, mouseX, 0.12)
  y = lerp(y, mouseY, 0.12)

  let r = map(x, 0, width, 0, 255)
  let g = map(y, 0, height, 0, 255)
  let b = map(x, 0, width, 255, 0)
  stroke(r, g, b)
  circle(x, y, w)

}

function mouseWheel(event){
  if (event.delta > 0) w = 10; if(w<10) w=10; else w+= 10
}
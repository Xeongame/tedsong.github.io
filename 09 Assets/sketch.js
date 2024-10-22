// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lionL, lionR

function preload(){
  lionL = loadImage("assets/lion-left.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)
}

function draw() {
  background(220);

  image(lionL, mouseX, mouseY, lionL.width/5, lionL.height/5)
}

// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);
  text("g", mouseX, mouseY)
  textSize(20)
  if (mouseIsPressed){
    textSize(50)
  }
}

function mousePressed(){
  print("")
}
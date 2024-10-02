// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let recWidth = 10
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15)
}

function draw() {
  background(220);
  staircase()
}

function staircase() {
  for (let x = 0; x <= width; x += recWidth){
    noFill()

    rect(x, height, recWidth, -random(0, 100))
  }
}

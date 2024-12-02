// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let column = 38;
let row = 28;
let spacing = 6;
let border = 2;
let length = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawMap() {
  stroke(0, 0, 255)
  fill(0)
  strokeWeight(border);

  for (let x = 0; x <= column; x++) {
    for (let y = 0; y <= row; y++) {
      rect(x * length, y * length, length, length)
    }
  }
}

function draw() {
  background(0);
  
  drawMap()
}

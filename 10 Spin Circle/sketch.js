// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angle = 0;
let radius = 250

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  

  
  translate(width/2, height/2);
  
  rotate(frameCount);
  circle(0, 0, radius * 2)
  
  rotate(-frameCount)
  for (let i = 0; i < 60; i += 1){
    let x = cos(i * 6)
    let y = sin(i * 6)
    line(x * radius, y * radius, x * radius * 0.9, y * radius * 0.9)
  }

  
}

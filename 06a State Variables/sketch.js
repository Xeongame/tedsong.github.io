// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentColor = 0
let circleSize = 50
let myColor;
let growing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myColor = color(214, 42, 112)
}

function draw() {
  background(220);

  switch(currentColor) {
    case 0:
      fill(255, 0, 0);
      break;
    case 1:
      fill(myColor);
      break;
    case 2:
      fill(0, 150, 200);
      break;
  }

  if (growing) circleSize += 2;
  else circleSize -= 2;

  circle(mouseX, mouseY, circleSize)

  if (frameCount % 5 === 0){
    currentColor += 1

    if (currentColor > 2){
      currentColor = 0
    }
  }
}

function keyPressed() {
  if (key == "a") {
    growing = !growing;
  }
}

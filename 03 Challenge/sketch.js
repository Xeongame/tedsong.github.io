// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let scale = 1
let sx = 80 * scale; let sy = 50 * scale;
let centerX, centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width/2; 
  centerY = height/2;
}

function draw() {
  background(220);

  if (keyIsPressed){
    if (key === "a"){
      centerX -= 5
    }

    if (key === "s"){
      centerY += 5
    }

    if (key === "d"){
      centerX += 5
    }

    if (key === "w"){
      centerY -= 5
    }
  }

  fill(152, 255, 152);
  stroke(152, 255, 152)
  print(centerX, centerY)
  strokeWeight(sy/8)
  circle(centerX + sx/2, centerY, sx)
  rect(centerX, centerY, sx, sy);
  line(centerX, centerY, centerX, centerY + sy * 1.5);
  line(centerX + sx, centerY, centerX + sx, centerY + sy * 1.5);
  

  stroke(0, 0, 0)
  strokeWeight(sy/25)
  line(centerX + sy/10, centerY + sy/2, centerX + sx - sy/5, centerY + sy/2);

  fill(0, 0, 0)
  noStroke()
  circle(centerX + sx/5, centerY, sy/5)
  circle(centerX + 4*sx/5, centerY, sy/5)

  
  
}


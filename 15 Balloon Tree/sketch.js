// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let scale = 15;
let leafSize = 5;
let step = 0;
let leafDepth = 0;
let stepMultiplier;
let angleSpread = 15;

function setup() {
  createCanvas(500, 500);
  background(255);
  
  stepMultiplier = random(50, 200);
}

function draw() {
  background(255);
  step = 0;
  drawTree(width/2, height*.9, 90, 6);
}

function drawLine( x1,  y1,  x2,  y2,  depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  fill(0)
  strokeWeight(sqrt(depth) * depth/2)
  line(x1, y1, x2, y2);
  drawLeaf(x2, y2, depth);
  
}

function drawLeaf(x, y, depth) {
  if (depth < leafDepth) {
    strokeWeight(1)
    randomSeed(step * stepMultiplier)
    fill(random(0, 255), random(0, 255), random(0, 255));
    circle(x, y, leafSize + scale * sqrt(depth + 0.25) * random(0.5, 1.2));

    step += 1;
  }
}

function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle))*depth*scale);     //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle))*depth*scale);     //using trig ratios. Get shorter based on depth

    drawLine(x1, y1, x2, y2, depth);
    let spread = angleSpread + mouseX/width * angleSpread * 0.7;
    //for a 3-branch tree:
    drawTree(x2, y2, angle-spread, depth-1);
    drawTree(x2, y2, angle+spread, depth-1);
    drawTree(x2, y2, angle, depth-1);
  }
}

function keyPressed() {
  if (key === "z") {

  } else if (key === "x") {
    
  }
}
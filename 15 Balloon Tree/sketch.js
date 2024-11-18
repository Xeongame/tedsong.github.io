// Balloon Tree
// Ted Song
// 11/18/2024
//
// Extra for Experts:
// - all mentionned on the assignment page


let scale = 15; //scale of branches 
let leafSize = 5;
let step = 0; //count for each iteration of leaf generation
let leafDepth = 1; //modifier for showing leaves
let stepMultiplier; //used for random color
let angleSpread = 15; 

function setup() {
  createCanvas(500, 500);
  background(255);
  
  stepMultiplier = random(50, 200); //sets a random multiplier at the start
}

function draw() {
  background(255);
  step = 0; //aka depth, counts up 1 every iteration but resets at the start every frame
  drawTree(width/2, height*.9, 90, 6);
}

function drawLine( x1,  y1,  x2,  y2,  depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  fill(0);
  strokeWeight(sqrt(depth) * depth/2)
  line(x1, y1, x2, y2);
  drawLeaf(x2, y2, depth);
  
}

function drawLeaf(x, y, depth) {
  if (depth < leafDepth) { //draw leaf only if the depth less than the max depth set by the user
    strokeWeight(1);
    randomSeed(step * stepMultiplier); //random but CONSISTENT generation based on count variable
    fill(random(0, 255), random(0, 255), random(0, 255), 127);
    circle(x, y, leafSize + scale * sqrt(depth + 0.25) * random(0.5, 1.2));

    step += 1; //count step up
  }
}

function drawTree(x1, y1, angle, depth) { //preset 
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle))*depth*scale);     //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle))*depth*scale);     //using trig ratios. Get shorter based on depth

    drawLine(x1, y1, x2, y2, depth);
    let spread = angleSpread + mouseX/width * angleSpread * 0.7; //determines spread based on how far the mouse is from the right side of the screen

    //for a 3-branch tree:
    drawTree(x2, y2, angle-spread, depth-1);
    drawTree(x2, y2, angle+spread, depth-1);
    drawTree(x2, y2, angle, depth-1);
  }
}

function keyPressed() {
  if (key === "z") { //z decreases max depth
    leafDepth -= 1;
  } else if (key === "x") { //x increases max depth
    leafDepth += 1;
  }

  if (leafDepth > 7) { //caps at max 7 depth and min 1 depth
    leafDepth = 7;
  } else if (leafDepth < 1) {
    leafDepth = 1;
  }
}
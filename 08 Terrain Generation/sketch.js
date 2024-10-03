// Terrain Generation 
// Ted Song
// 10/2/2024
//
// Extra for Experts:
// - detects key holds for smoother change in rect width

let rectWidth = 20; //width of each rectangle in pixels that make up the terrain
let framesElapsed = 0; //total time the program has ran in frames
let noiseMultiplier = 1.5; //controls the intensity of noise: higher = rougher terrain, lower = smoother terrain
let timeRatio = -0.01; //affects the speed and direction of terrain panning

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  drawTerrain();
}

function drawTerrain() {
  let maxRect = width/rectWidth; //find the number of segments based on screen width and rect width
  let maxHeight = 500; //max height in pixels allowed for each rect
  let totalHeight = 0; //combined total of all rect height added together in pixels
  let peakX = 0; let peakY = height; //init values of the tallest possbile rect and its x pos

  if (keyIsDown(LEFT_ARROW)) {
    rectWidth -= 1
  }

  if (keyIsDown(RIGHT_ARROW)) {
    rectWidth += 1;
  }

  if (rectWidth <= 1) { //locks the minimum rect width at 1 pixel
    rectWidth = 1;
  } else if (rectWidth >= width/10) { //locks the max width so the minimum number of rect is 10
    rectWidth = width/10;
  }

  for (let x = 0; x < maxRect; x += 1) { //loop through the found number of segments
    let ratio = x/maxRect;
    let rectX = ratio * width; //x pos
    let rectY = noise(ratio * noiseMultiplier + framesElapsed * timeRatio) * maxHeight; //y pos

    fill(255, 255, 255);
    stroke(0, 0, 0);
    strokeWeight(1);
    rect(rectX, height, rectWidth, -rectY); //draw each rect

    if (height - rectY < peakY) { //compare the height of the last rect to find the tallest one
      peakY = height - rectY; //replace the last tallest with the current tallest
      peakX = rectX + rectWidth/2; //find the midpoint of the tallest rect as the base of the flag
    }

    totalHeight += rectY; //adds each rect height to total
  }

  let averageHeight = totalHeight/maxRect; //find the average height
  stroke(255, 0, 0);
  strokeWeight(5);
  line(0, height-averageHeight, width, height-averageHeight); //draw a line to show the average height

  print(totalHeight, maxRect, peakY)
  framesElapsed += 1; //counts every frame
  drawFlag(peakX, peakY);
}

function drawFlag(x, y) {
  strokeWeight(1);
  stroke(0, 0, 0);
  
  fill(0, 0, 0);
  line(x, y, x, y - 40); //flag pole
  
  fill(255, 0, 0);
  triangle(x, y - 40, x, y - 20, x + 20, y - 30); //triangle flag 
}

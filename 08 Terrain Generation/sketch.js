// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 20; //width of each rectangle in pixels that make up the terrain
let framesElapsed = 0; //total time the program has ran in frames
let noiseMultiplier = 1.5 //controls the intensity of noise: higher = rougher terrain, lower = smoother terrain
let timeRatio = -0.01; //affects the speed and direction of terrain panning

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  drawTerrain()
}

function drawTerrain() {
  let maxRect = width/rectWidth; //find the number of segments based on screen width and rect width
  let maxHeight = 500 //max height in pixels allowed for each rect
  let totalHeight = 0; //combined total of all rect height added together in pixels
  let peakX = 0; let peakY = height; //init values of the tallest rect and its x pos

  for (let x = 0; x < maxRect; x += 1) { //loop through the found number of segments
    let ratio = x/maxRect
    let rectX = ratio * width //x pos
    let rectY = noise(ratio * noiseMultiplier + framesElapsed * timeRatio) * maxHeight //y pos

    fill(255, 255, 255)
    stroke(0, 0, 0)
    strokeWeight(1)
    rect(rectX, height, rectWidth, -rectY) //draw each rect

    if (height - rectY < peakY) { //compare the height of the last rect to find the tallest one
      peakY = height - rectY //replace the last tallest with the current tallest
      peakX = rectX + rectWidth/2 //find the midpoint of the tallest rect as the base of the flag
    }

    totalHeight += rectY
  }

  let averageHeight = totalHeight/maxRect
  stroke(255, 0, 0)
  strokeWeight(5)
  line(0, height-averageHeight, width, height-averageHeight)

  framesElapsed += 1;
  drawFlag(peakX, peakY)
}

function drawFlag(x, y) {
  strokeWeight(1)
  stroke(0, 0, 0)
  
  fill(0, 0, 0)
  line(x, y, x, y - 40) //flag pole
  
  fill(255, 0, 0)
  triangle(x, y - 40, x, y - 20, x + 20, y - 30) //triangle flag 
}

function keyPressed() {
  print(key)
  if (key === "ArrowRight") { //right arrow increases the width by 1
    rectWidth += 1
  } else if (key === "ArrowLeft") { // left arrow decreases the width by 1
    rectWidth -= 1
  }

  if (rectWidth <= 1) { //locks the minimum width at 1 pixel
    rectWidth = 1
  }
}
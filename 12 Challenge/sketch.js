// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 0; let y = 0
let state = "right"
let speed = 5
let length = 20
let strokeSize = 1
let lastLength = length

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  strokeWeight(strokeSize)
  let offset = length + strokeSize
  if (state === "right") {
    x += speed

    if (x >= width - offset) {
      state = "down"
    }
  } else if (state === "left") {
    x -= speed

    if (x <= strokeSize) {
      state = "up"
    }
  } else if (state === "down") {
    y += speed

    if (y >= height - offset) {
      state = "left"
    }
  } else if (state === "up") {
    y -= speed

    if (y <= strokeSize) {
      state = "right"
    }
  }

  map(x, strokeSize, width - offset, strokeSize, width - offset)
  map(y, strokeSize, height + offset, strokeSize, height + offset)

  if (lastLength !== length) {
    if (state === "down") {
      x -= length - lastLength
    } else if (state === "left") {
      y -= length - lastLength
    }
  }
  print(x, length, offset, width - offset)
  square(x, y, length)
  lastLength = length
}

function keyPressed(){
  print(key)
  if (key === "a") {
    length -= 5
  } else if (key === "d") {
    length += 5
  } else if (key === "w") {
    speed += 1
  } else if (key === "s") {
    speed -= 1
  }

  if (length <= 5) {
    length = 5
  } else if (length >= 50) {
    length = 50
  }

  if (speed <= 1) {
    speed = 1
  } else if (speed >= 30) {
    speed = 30
  }
}
// Cars Cars Cars
// Ted Song
// 10/22/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let roadHeight = 800
let edge = 40
let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  
  
  for (let i = 0; i < 20; i ++) { //westbound
    westbound[i] = new Vehicle(-1, Math.floor(random(1) + 0.5))
  }

  for (let i = 0; i < 20; i ++) { //eastbound
    eastbound[i] = new Vehicle(1, Math.floor(random(1) + 0.5))
  }
}

function draw() {
  background(220);

  fill(0)
  rect(width/2, height/2, width, roadHeight)

  fill(255)
  let count = 20
  for (let i = 0; i < count; i ++){
    rect(width/(count*2) + i * width/count, height/2, width/(count*2), 6)
  }

  for (let i = 0; i < eastbound.length; i ++) {
    eastbound[i].action()
  }

  for (let i = 0; i < westbound.length; i ++) {
    westbound[i].action()
  }
}

class Vehicle{
  constructor(dir, type){
    this.class = type;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.speed = random(5, 15);
    this.dir = dir

    if (dir === -1){ //west
      this.x = width
      this.y = random(height/2 - roadHeight/2 + edge, height/2 - edge)
    } else { //east
      this.x = 0
      this.y = random(height/2 + edge, height/2 + roadHeight/2 - edge)
    }
  }

  display(){
    fill(this.color)

    if (this.class === 0) { //car
      rect(this.x, this.y, 80, 30)

      fill(255) //wheels
      rect(this.x + 25, this.y + 20, 20, 4)
      rect(this.x + 25, this.y - 20, 20, 4)
      rect(this.x - 25, this.y + 20, 20, 4)
      rect(this.x - 25, this.y - 20, 20, 4)
    } else { //truck
      rect(this.x, this.y, 100, 50)

      fill(0)
      rect(this.x + 30 * this.dir, this.y, 2, 50)
    }
  }

  move(){
    if (this.speed < 0) { //min speed is 0
      this.speed = 0
    } else if (this.speed > 15) { //max speed is 15
      this.speed = 15
    }

    this.x += this.speed * this.dir

    if (this.dir === -1 && this.x < -50){ //resets car x when it goes out of bound
      this.x = width + 50
    } else if (this.dir === 1 && this.x > width + 50){
      this.x = -50
    }
  }

  action(){
    this.move()
    this.display()
  }
}
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let c1, c2, c3
let points = [];
let grid = [
  [0, 255, 200, 150, 100, 50],
  [255, 200, 150, 100, 50, 0],
  [0, 50, 100, 150, 100, 50, 0],
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let t = new test(100, 100)
  c1 = new roundracer(height/2, color(0, 0, 0))
  c2 = new roundracer(height/3, color(55, 0, 255))
  c3 = new roundracer(height/4, color(200, 50, 200))
  print(t.X)
  t.func()
}

function draw() {
  background(220);
  c1.move()
  c1.display()
  c2.move()
  c2.display()
  c3.move()
  c3.display()

  
  //c.display()
  for (let i = 0; i < points.length; i ++){
    points[i].move()
    points[i].display()
  }
}

class test{
  constructor(x, y){
    this.X = x
    this.Y = y
  }

  func(){

  }
}

function mouseClicked(){
  print(mouseX, mouseY)
}

class point{
  constructor(x, y){
    this.X = x
    this.Y = y
    this.speed = random(5, 10)
    this.nx = random(0, 10)
    this.ny = random(0, 10)
  }

  display(){
    circle(this.X, this.Y, 20)
  }

  move(){
    this.X += map(noise(this.nx), 0, 1, -this.speed, this.speed) 
    this.Y += map(noise(this.ny), 0, 1, -this.speed, this.speed)
    print(noise(this.nx))
    if (this.X > width) {
      //this.X -= this.speed
      this.X -= width
      console.log("")
    }

    if (this.X < 0) {
      //.X += this.speed 
      this.X += width
      print("")
    }

    if (this.Y > height) {
      this.Y -= height
      //this.ny += 0.01
    }

    if (this.Y < 0) {
      this.Y += height
      //this.ny += 0.01
    }

    this.nx += 0.01
    this.ny += 0.01
  }
}

class roundracer{
  constructor(y, color){
    this.x = 0
    this.y = y
    this.speed = random(3, 15)
    this.color = color
  }

  move(){
    this.x += this.speed;
    //print(this.speed)
    if (this.x > width) {
      this.x = 0
    }
  }

  display(){
    fill(this.color)
    circle(this.x, this.y, 20)
  }
}

function mouseClicked(){
  let c = new point(random(0, width), random(0, height))
  points.push(c)
}
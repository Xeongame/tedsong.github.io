// Cars Cars Cars
// Ted Song
// 10/22/2024
//
// Extra for Experts:
// - added stop light

let roadHeight = 800;
let light;
let edge = 40;
let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  
  for (let i = 0; i < 20; i ++) { //create westbound car objects
    westbound[i] = new Vehicle(-1, Math.round(random(1)));
  }

  for (let i = 0; i < 20; i ++) { //create eastbound car objects
    eastbound[i] = new Vehicle(1, Math.round(random(1)));
  }

  light = new TrafficLight(); //create traffic light object
}

function draw() {
  background(220);

  fill(0);
  rect(width/2, height/2, width, roadHeight);

  fill(255);
  let count = 20; //draw the road
  for (let i = 0; i < count; i ++){
    rect(width/(count*2) + i * width/count, height/2, width/(count*2), 6);
  }

  for (let i = 0; i < eastbound.length; i ++) { //move the east caras
    eastbound[i].action();
  }

  for (let i = 0; i < westbound.length; i ++) { //move the west cars
    westbound[i].action();
  }

  light.display();

  if (light.mode === "red"){ //count down each frame if light is red
    light.timer -= 1;

    if (light.timer <= 0){ //changes light back to green once countdown is over
      light.mode = "green";
    }
  }
}

class Vehicle{
  constructor(dir, type){
    this.class = type;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.speed = random(5, 15);
    this.dir = dir;

    if (dir === -1){ //west cars
      this.x = width;
      this.y = random(height/2 - roadHeight/2 + edge, height/2 - edge);
    } 
    else { //east cars
      this.x = 0;
      this.y = random(height/2 + edge, height/2 + roadHeight/2 - edge);
    }
  }

  display(){
    fill(this.color);

    if (this.class === 0) { //car
      rect(this.x, this.y, 80, 30);

      fill(255); //wheels
      rect(this.x + 25, this.y + 20, 20, 4);
      rect(this.x + 25, this.y - 20, 20, 4);
      rect(this.x - 25, this.y + 20, 20, 4);
      rect(this.x - 25, this.y - 20, 20, 4);
    } 
    else { //truck
      rect(this.x, this.y, 100, 50);

      fill(0);
      rect(this.x + 30 * this.dir, this.y, 2, 50);
    }
  }

  move(){
    if (light.mode !== "green"){ //if light is not green then stop
      return;
    }

    if (this.speed < 0) { //min speed is 0
      this.speed = 0;
    } 
    else if (this.speed > 15) { //max speed is 15
      this.speed = 15;
    }

    this.x += this.speed * this.dir;

    if (this.dir === -1 && this.x < -50){ //resets car x when it goes out of bound
      this.x = width + 50;
    }
    else if (this.dir === 1 && this.x > width + 50){
      this.x = -50;
    }
  }

  speedUp(){
    this.speed += random(1, 3);
  }

  speedDown(){
    this.speed -= random(1, 3);
  }

  changeColor(){
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  action(){
    if (random(100) <= 1) {
      this.speedUp();
    }

    if (random(100) <= 1) {
      this.speedDown();
    }

    if (random(100) <= 1) {
      this.changeColor();
    }

    this.move();
    this.display();
  }
}

class TrafficLight{
  constructor(){
    this.mode = "green";
    this.timer = 120;
  }

  display(){
    let green = this.mode === "green" && color(0, 255, 0) || color(140, 255, 140); //if green then use a brighter green color, otherwise use a dimmer green color
    let red = this.mode !== "green" && color(255, 0, 0) || color(255, 140, 140); //if not green then use a brighter red color, otherwise use a dimmer red color

    rect(width/2, 30, 20, 20); //base

    fill(green); //green light
    rect(width/2 - 35, 30, 50, 20);
    
    fill(red); //red light
    rect(width/2 + 35, 30, 50, 20);
  }
}

function mouseClicked(){ //add new cars when mouse is clicked
  if (keyIsDown(SHIFT)){
    westbound.push(new Vehicle(-1, Math.round(random(1))));
  } 
  else {
    eastbound.push(new Vehicle(1, Math.round(random(1))));
  }
}

function keyPressed(){
  if (key === " "){ //if space is pressed
    if (light.mode === "green"){ //if light is already green 
      light.mode = "red"; //set to red
      light.timer = 120;
    }
  }
}
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let columnNum = 20;
let rowNum = 16;
let spacing = 6;
let border = 2;
let length = 32;

let pacX = 0;
let pacY = 0;
let pacSpeed = 3;
let grids = [];
let paths = [];
let player 

class pac {
  constructor(row, column) {
    this.row = row || 0;
    this.column = column || 0;
    this.moveX = 0;
    this.moveY = 0;
    let grid = grids[this.row][this.column]
  
    this.x = grid[0] + length/2
    this.y = grid[1] + length/2
    this.dir = "right";
    this.lastDir = "right";
  }

  show() {
    fill(255, 255, 0);
    circle(this.x, this.y, length * 0.8);
  }

  move() {
    this.moveX = 0
    this.moveY = 0

    let path = paths[this.row][this.column]
    let dirInt = 1;

    //print(this.column)
    if (this.dir === "right") { 
      this.waypoints = path[0]
      this.moveX = pacSpeed

    } else if (this.dir === "left") { 
      this.waypoints = path[0]
      this.moveX = -pacSpeed
      dirInt = -1

    } else if (this.dir === "up") { 
      this.waypoints = path[1]
      this.moveY = -pacSpeed
      dirInt = -1

    } else { 
      this.waypoints = path[1]
      this.moveY = pacSpeed

    }

    for (let i = 0; i < this.waypoints.length; i++) {
      let x = this.waypoints[i][0]
      let y = this.waypoints[i][1]

      if (this.x === x && this.y === y) {
        this.currentPointIndex = i
      }
    }

    //find the next grid's path, if it exists
    if (this.moveX !== 0) { //moving on the x axis
      if (paths[this.row][this.column + dirInt]) {
        this.nextWaypoints = paths[this.row][this.column + dirInt][0]
      }
    } else { //moving on the y axis
      if (paths[this.row + dirInt]) {
        this.nextWaypoints = paths[this.row + dirInt][this.column][1]
      }
    }

    let dif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1
    let moveout = false;
    let perpendicular = ((this.dir === "up" || this.dir === "down") && (this.lastDir === "right" || this.lastDir === "left")) || (this.dir === "left" || this.dir === "right") && (this.lastDir === "up" || this.lastDir === "down")
    
    if (this.lastDir !== this.dir && perpendicular) {
      print("Change direction")
      let nextCenterIndex = this.nextWaypoints.length - 1;

      if (this.nextWaypoints.length % (length/2) === 0) {
        nextCenterIndex = this.nextWaypoints.length - length/2
      }
      let nextCenter = this.nextWaypoints[Number(nextCenterIndex)]

      let thisCenterIndex = this.waypoints.length - 1;

      if (this.waypoints.length % (length/2) === 0) {
        thisCenterIndex = this.waypoints.length - length/2
      }
      let thisCenter = this.waypoints[Number(thisCenterIndex)]
      
      if ((this.currentPointIndex - thisCenterIndex) * dirInt < 0) {
        nextCenter = thisCenter
      }

    }

   
    
    if (dif <= pacSpeed) { //moving out of current grid
      if (this.moveX !== 0) { //moving on the x axis
        if (paths[this.row][this.column + dirInt]) {
          this.column += dirInt
          this.waypoints = this.nextWaypoints
          this.moveX -= dif * dirInt
          moveout = true
        }
        
      } else { //moving on the y axis
        if (paths[this.row + dirInt]) {
          this.row += dirInt
          this.waypoints = this.nextWaypoints
          this.moveY -= dif * dirInt
          moveout = true

        }
      }

      if (moveout === true) { //if there is a new grid to move into
        if (dirInt > 0) { //assign new position based on moving direction
          this.currentPointIndex = 0;
        } else {
          this.currentPointIndex = this.waypoints.length - 1;
        }
      }
    }

    this.nextPointIndex = Math.max(0, Math.min(this.currentPointIndex + this.moveX + this.moveY, this.waypoints.length - 1))
    this.lastDir = this.dir

    let nextPoint = this.waypoints[this.nextPointIndex]
    this.x = nextPoint[0]
    this.y = nextPoint[1]
  }
}

class ghost {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let x = 0; x < columnNum; x++) {
    for (let y = 0; y < rowNum; y++) {
      let row = grids[y] || [];
      let column = [x * length, y * length]

      row[x] = column
      grids[y] = row
    }
  }

  for (let x = 0; x < columnNum; x++) {
    for (let y = 0; y < rowNum; y++) {
      let row = paths[y] || [];
      let xPoints = []
      let yPoints = []
      let centerX = x * length + length/2
      let centerY = y * length + length/2

      if (x === 0) {
        for (let i = centerX; i < centerX + length/2; i++) {
          xPoints.push([i, centerY])
        }
      } else if (x === columnNum - 1) {
        for (let i = centerX; i >= centerX - length/2; i--) {
          xPoints.unshift([i, centerY])
        }
      } else {
        for (let i = centerX - length/2; i < centerX + length/2; i++) {
          xPoints.push([i, centerY])
        }
      }

      if (y === 0) {
        for (let i = centerY; i < centerY + length/2; i++) {
          yPoints.push([centerX, i])
        }
      } else if (y === rowNum - 1) {
        for (let i = centerY; i >= centerY - length/2; i--) {
          yPoints.unshift([centerX, i])
        }
      } else {
        for (let i = centerY - length/2; i < centerY + length/2; i++) {
          yPoints.push([centerX, i])
        }
      }

      row[x] = [xPoints, yPoints]
      paths[y] = row
    }
  }

  print(grids, paths)
  player = new pac();
}

function drawMap() {
  stroke(0, 0, 255)
  fill(0)
  strokeWeight(border);

  for (let row = 0; row < grids.length; row++) {
    for (let column = 0; column < grids[row].length; column ++) {
      let x = grids[row][column][0]
      let y = grids[row][column][1]
  
      //print(grids[row][column])
      rect(x, y, length, length)
    }
  }
}

function draw() {
  background(0);
  
  drawMap()
  player.show()
  player.move()
}

function keyPressed() {
  if (key === "w") {
    player.dir = "up"
  } else if (key === "s") {
    player.dir = "down"
  } else if (key === "a") {
    player.dir = "left"
  } else if (key === "d") {
    player.dir = "right"
  }
}
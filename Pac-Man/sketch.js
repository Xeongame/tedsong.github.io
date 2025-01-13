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
let length = 50;

let pacX = 0;
let pacY = 0;
let pacSpeed = 5;
let grids = [];
let paths = [];
let player 

let debugColumn = 0;
let debugRow = 0;

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
    this.queueDir = "right";

    this.queueMove = false;
    this.surroundingGridPaths = []
  }

  show() {
    fill(255, 255, 0);
    circle(this.x, this.y, length * 0.8);
  }

  locate() {
    this.moveX = 0
    this.moveY = 0

    let path = paths[this.row][this.column]
    let lastDir = this.dir
    let dirInt = 1;

    //print(this.column)
    if (this.dir === "right") { 
      this.moveX = pacSpeed
      this.axisIndex = 0

    } else if (this.dir === "left") { 
      this.moveX = -pacSpeed
      this.axisIndex = 0
      dirInt = -1

    } else if (this.dir === "up") { 
      this.moveY = -pacSpeed
      this.axisIndex = 1
      dirInt = -1

    } else { 
      this.moveY = pacSpeed
      this.axisIndex = 1
    }

    this.waypoints = path[this.axisIndex] // axisIndex determines the waypoints chosen based on direction: 0 = moving on the x axis, 1 = moving on the y axis

    for (let i = 0; i < this.waypoints.length; i++) {
      let x = this.waypoints[i][0]
      let y = this.waypoints[i][1]

      if (this.x === x && this.y === y) {
        this.currentPointIndex = i
      }
    }

    // locate surrounding grids
    if (paths[this.row][this.column + 1]) {
      this.surroundingGridPaths.right = paths[this.row][this.column + 1]
    }

    if (paths[this.row][this.column - 1]) {
      this.surroundingGridPaths.left = paths[this.row][this.column - 1]
    }

    if (paths[this.row + 1]) {
      this.surroundingGridPaths.down = paths[this.row + 1][this.column]     
    }

    if (paths[this.row - 1]) {
      this.surroundingGridPaths.up = paths[this.row - 1][this.column]
       
    }

    this.nextGridPath = this.surroundingGridPaths[this.dir]
    this.queuedGridPath = this.surroundingGridPaths[this.queueDir]

    if (this.nextGridPath) {
      if (this.moveX !== 0) { //moving on the x axis
        this.nextWaypoints = this.nextGridPath[0]   
      } else { //moving on the y axis
        this.nextWaypoints = this.nextGridPath[1]   
      }
  
    }
   
    if (!this.nextWaypoints) {
      this.dir = lastDir
      this.locate()
    }
  }

  move() {
    this.locate()

    let dirInt = (this.moveX + this.moveY)/Math.abs(this.moveX + this.moveY) // positive = moving left to right or top to bottom, negative = moving right to left or bottom to top
    let indexDif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1 //calculates difference of steps from the next grid 

    // checks if direction changed in a perpendicular direction, ex: previously moving up and now changing directions to move left
    let isPerpendicular = ((this.dir === "up" || this.dir === "down") && (this.lastDir === "right" || this.lastDir === "left")) || (this.dir === "left" || this.dir === "right") && (this.lastDir === "up" || this.lastDir === "down")
    let queueMove = this.dir !== this.queueDir

    let isBlocked = this.nextGridPath[2];
    let perpendicularBlocked = isPerpendicular && this.queuedGridPath[2]
    let isLeaving = false;
    let forcedMove = false; // forces moving in the old direction when trying to change directions at the wrong time

    let nextCenterIndex = getGridCenter(this.nextWaypoints)
    let thisCenterIndex = getGridCenter(this.waypoints)
    let perpendicularMoveCenterIndex = getGridCenter(this.surroundingGridPaths[this.dir][this.axisIndex])
  
    let nextCenter = this.nextWaypoints[nextCenterIndex]
    let thisCenter = this.waypoints[thisCenterIndex]

    if (this.lastDir !== this.dir && isPerpendicular) {
      if ((this.currentPointIndex - thisCenterIndex) * dirInt <= 0) {
        nextCenter = thisCenter

        thisCenterIndex = perpendicularMoveCenterIndex
        print("MOVe on", thisCenterIndex, this.surroundingGridPaths[this.dir], perpendicularMoveCenterIndex)
      }

      print("move perp", this.x, nextCenter[0], this.x !== nextCenter[0] || this.y !== nextCenter[1], isBlocked, perpendicularBlocked, this.nextGridPath, this.queuedGridPath)
      if (this.x !== nextCenter[0] || this.y !== nextCenter[1] || (perpendicularBlocked)) {
        //print(dif, dirInt)
        //print("not there")
       // print(this.x, this.y, nextCenter, this.currentPointIndex, thisCenterIndex)

        this.queueDir = this.dir
        this.dir = this.lastDir
        this.locate()

        let doubleCheck = perpendicularBlocked;
        this.queueMove = true;
        perpendicularBlocked = this.nextGridPath[2];
        forcedMove = !perpendicularBlocked;
        asdasd

        dirInt = (this.moveX + this.moveY)/Math.abs(this.moveX + this.moveY)
        indexDif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1
        print("perp", forcedMove, isBlocked, perpendicularBlocked, this.dir, this.lastDir, this.queueDir, this.surroundingGridPaths[this.queueDir])
        //return
      } else {
        this.queueMove = false;
        print("MOVE PERP")
      }
    }

    if ((this.currentPointIndex === thisCenterIndex && isBlocked) || (perpendicularBlocked && this.x !== 200)) {
      if (!forcedMove) {
        indexDif = 0
        print("STOP", this.dir, this.queueDir, this.lastDir, this.x, this.y, this.currentPointIndex, thisCenterIndex, perpendicularBlocked, isPerpendicular)
        this.moveX = 0;
        this.moveY = 0;
      }
      
      if (isPerpendicular) { // if trying to turn onto a blocked tile, keep moving in the previous directiona
        this.dir = this.lastDir
        //forcedMove = false;
        print(this.lastDir, this.queueDir, this.dir, this.nextGridPath, this.moveX, this.moveY)
      
      }
    
    } 
    
    if (indexDif <= pacSpeed && (!isBlocked || (isBlocked && isPerpendicular && !perpendicularBlocked))) { //moving out of current grid
      
      if (this.moveX !== 0) { //moving on the x axis
        if (paths[this.row][this.column + dirInt]) {
          this.column += dirInt
          this.waypoints = this.nextWaypoints
          this.moveX -= indexDif * dirInt
          isLeaving = true
        }
        
      } else { //moving on the y axis
        if (paths[this.row + dirInt]) {
          this.row += dirInt
          this.waypoints = this.nextWaypoints
          this.moveY -= indexDif * dirInt
          isLeaving = true

        }
      }

      if (isLeaving) { //if there is a new grid to move into
        if (dirInt > 0) { //assign new position based on moving direction
          this.currentPointIndex = 0;
        } else {
          this.currentPointIndex = this.waypoints.length - 1;
        }
      }
    }

    this.nextPointIndex = Math.max(0, Math.min(this.currentPointIndex + this.moveX + this.moveY, this.waypoints.length - 1))
    this.lastDir = this.dir

    if (forcedMove) {
      this.dir = this.queueDir
    }

    let nextPoint = this.waypoints[this.nextPointIndex]
    this.x = nextPoint[0]
    this.y = nextPoint[1]
  }
}

class ghost {

}

function getGridCenter(array) {
  let index = array.length - 1;

  if (array.length % (length/2) === 0) {
    index = array.length - length/2
  }

  return index
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120)
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

      row[x] = [xPoints, yPoints, false]
      paths[y] = row
    }
  }

  print(grids, paths)
  player = new pac();
}

function drawMap() {
  stroke(0, 0, 255)
  
  strokeWeight(border);

  for (let row = 0; row < grids.length; row++) {
    for (let column = 0; column < grids[row].length; column ++) {
      let x = grids[row][column][0]
      let y = grids[row][column][1]
      let pathBlocked = paths[row][column][2]
      //print(paths[row][column])
      
      fill(0)
      if (pathBlocked) {
        fill(255, 0, 0);
      }
  
      //print(grids[row][column])
      rect(x, y, length, length)
    }
  }
}

function debug() {
  //print(mouseX, mouseY)

  debugColumn = Math.floor(mouseX / length)
  debugRow = Math.floor(mouseY / length)

}

function draw() {
  background(0);
  
  drawMap()
  debug()
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

function mouseClicked() {
  print(debugColumn, debugRow)
  paths[debugRow][debugColumn][2] = true; // adds a 'blocked' property to the grid for debugging
  print(paths[debugRow][debugColumn])
}
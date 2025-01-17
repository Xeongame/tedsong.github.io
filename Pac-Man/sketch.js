// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let columnNum = 28;
let rowNum = 31;
let spacing = 6;
let border = 2;
let length = 24;

let pacX = 0;
let pacY = 0;
let pacSpeed = 4;
let pacStartColumn = 21;
let pacStartRow = 14;

let grids = [];
let paths = [];
let walls = ["1111111111111111111111111111", // 1
             "1000000000000110000000000001", // 2
             "1011110111110110111110111101", // 3
             "1011110111110110111110111101", // 4
             "1011110111110110111110111101", // 5
             "1000000000000000000000000001", // 6
             "1011110110111111110110111101", // 7
             "1011110110111111110110111101", // 8
             "1000000110000110000110000001", // 9
             "1111110111110110111110111111", // 10
             "0000010111110110111110100000", // 11
             "0000010110000000000110100000", // 12
             "0000010110111001110110100000", // 13
             "1111110110100000010110111111", // 14
             "0000000000100000010000000000", // 15
             "1111110110100000010110111111", // 16
             "0000010110111111110110100000", // 17
             "0000010110000000000110100000", // 18
             "0000010110111111110110100000", // 19
             "1111110110111111110110111111", // 20
             "1000000000000110000000000001", // 21
             "1011110111110110111110111101", // 22
             "1011110111110110111110111101", // 23
             "1000110000000000000000110001", // 24
             "1110110110111111110110110111", // 25
             "1110110110111111110110110111", // 26
             "1000000110000110000110000001", // 27
             "1011111111110110111111111101", // 28
             "1011111111110110111111111101", // 29
             "1000000000000000000000000001", // 30
             "1111111111111111111111111111", // 31
             "1000000000000000000000000001", // 32
             "1000000000000000000000000001", // 33
             "1000000000000000000000000001", // 34
             "1000000000000000000000000001", // 35
             "1111111111111111111111111111", // 36
            ];

let player 
let gameStart = false;

let debugColumn = 0;
let debugRow = 0;

class pac {
  constructor(row, column) {
    this.row = row || 0;
    this.column = column || 0;
    this.moveX = 0;
    this.moveY = 0;
    let grid = grids[this.row][this.column]
  
    this.x = grid[0]
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

    //print(this.column)
    if (this.dir === "right") { 
      this.moveX = pacSpeed
      this.axisIndex = 0

    } else if (this.dir === "left") { 
      this.moveX = -pacSpeed
      this.axisIndex = 0

    } else if (this.dir === "up") { 
      this.moveY = -pacSpeed
      this.axisIndex = 1

    } else { 
      this.moveY = pacSpeed
      this.axisIndex = 1
    }

    // axisIndex determines the chosen waypoints: 0 = moving on the x axis, 1 = moving on the y axis
    this.waypoints = path[this.axisIndex] 

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
    } else {
      this.surroundingGridPaths.right = paths[this.row][0]
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
  }

  move() {
    this.locate()

    // positive = moving left to right or top to bottom, negative = moving right to left or bottom to top
    let dirInt = (this.moveX + this.moveY)/Math.abs(this.moveX + this.moveY) 

    //calculates difference of steps from the next grid 
    let indexDif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1 

    // checks if direction changed in a perpendicular direction, ex: previously moving up and now changing directions to move left
    let isPerpendicular = ((this.dir === "up" || this.dir === "down") && (this.lastDir === "right" || this.lastDir === "left")) || (this.dir === "left" || this.dir === "right") && (this.lastDir === "up" || this.lastDir === "down")

    let isBlocked = this.nextGridPath[2];
    let perpendicularBlocked = isPerpendicular && this.queuedGridPath[2]
    let isLeaving = false;
    let forcedMove = false; // QUEUED MOVEMENT: forces movement in the old direction when failing to change directions
    let blockedForcedMove = false;

    // position variables
    let nextCenterIndex = getGridCenter(this.nextWaypoints)
    let thisCenterIndex = getGridCenter(this.waypoints)
    let nextCenter = this.nextWaypoints[nextCenterIndex]
    let thisCenter = this.waypoints[thisCenterIndex]

    // handles QUEUED MOVEMENT and changing direction for perpendicular movement: can only change directions if at the middle of the grid
    if (this.lastDir !== this.dir && isPerpendicular) {
      if ((this.currentPointIndex - thisCenterIndex) * dirInt <= 0) {
        nextCenter = thisCenter
      }

      // debounce statement: forces movement in the old direction if not at middle or the next grid is blocked
      if (this.x !== nextCenter[0] || this.y !== nextCenter[1] || (isBlocked)) {
       // relocate using the old direction
        this.queueDir = this.dir
        this.dir = this.lastDir
        this.locate()

        let doubleCheck = perpendicularBlocked;
        this.queueMove = true;
        perpendicularBlocked = this.nextGridPath[2]; //checks the next grid 
        forcedMove = !perpendicularBlocked; // cancels QUEUED MOVEMENT if no unblocked path is available 

        if (doubleCheck || !forcedMove) {
           blockedForcedMove = true;
        }

        // redirects the movement variables 
        dirInt = (this.moveX + this.moveY)/Math.abs(this.moveX + this.moveY)
        indexDif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1
        print("perp", forcedMove, blockedForcedMove, isBlocked, perpendicularBlocked, this.dir, this.lastDir, this.queueDir, this.surroundingGridPaths[this.queueDir])

      // if all conditions are satisfied, cancel QUEUED MOVEMENT and start to move
      } else { 
        this.queueMove = false; 
        //print("MOVE PERP")
      }
    }

    // handles colllision and corner turning
    if (isBlocked && ((this.currentPointIndex === thisCenterIndex) || (perpendicularBlocked && !blockedForcedMove))) {
      if (!forcedMove) {
        indexDif = 0
        print("STOP", this.dir, this.queueDir, this.lastDir, this.x, this.y, this.currentPointIndex, thisCenterIndex, perpendicularBlocked, isPerpendicular)
        this.moveX = 0;
        this.moveY = 0;
      }
      
      if (isPerpendicular) { // if trying to turn onto a blocked tile, keep moving in the previous direction
        this.dir = this.lastDir
      }
    } 
    
    // handles moving out of current grid
    if (indexDif <= pacSpeed && (!isBlocked || (isBlocked && isPerpendicular && !perpendicularBlocked))) { 
      if (this.moveX !== 0) { //moving on the x axis
        this.column += dirInt
          this.waypoints = this.nextWaypoints
          this.moveX -= indexDif * dirInt
          isLeaving = true
        
      } else { //moving on the y axis
        if (paths[this.row + dirInt]) {
          this.row += dirInt
          this.waypoints = this.nextWaypoints
          this.moveY -= indexDif * dirInt
          isLeaving = true

        }
      }

      if (this.column >= columnNum - 1) {
       this.column = 0
      } else if (this.column < 0) {
        this.column = columnNum - 1
      }

      if (isLeaving) { // if there is a new grid to move into
        if (dirInt > 0) { // assigns a new position based on moving direction
          this.currentPointIndex = 0;
        } else {
          this.currentPointIndex = this.waypoints.length - 1;
        }
      }
    }

    this.nextPointIndex = Math.max(0, Math.min(this.currentPointIndex + this.moveX + this.moveY, this.waypoints.length - 1))
    this.lastDir = this.dir

    // changes the next direction to be the same as QUEUED MOVEMENT
    if (forcedMove || blockedForcedMove) {
      this.dir = this.queueDir
    }

    // move
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
  createCanvas(950, 948);
  frameRate(120)

  // grids set up
  for (let x = 0; x < columnNum; x++) {
    for (let y = 0; y < rowNum; y++) {
      let row = grids[y] || [];
      let column = [x * length, y * length]

      row[x] = column
      grids[y] = row
    }
  }

  // path set up
  for (let x = 0; x < columnNum; x++) {
    for (let y = 0; y < rowNum; y++) {
      let row = paths[y] || [];
      let xPoints = []
      let yPoints = []
      let centerX = x * length + length / 2
      let centerY = y * length + length / 2

      for (let i = x * length; i < centerX + length / 2; i++) {
        xPoints.push([i, centerY])
      }

      for (let i = y * length; i < centerY + length / 2; i++) {
        yPoints.push([centerX, i])
      }

      // wall generation
      let wallRow = walls[y]
      let wallColumn = wallRow[x]
      let blocked = wallColumn === "1"

      row[x] = [xPoints, yPoints, blocked]
      paths[y] = row
    }
  }

  print(grids, paths)
  player = new pac(pacStartRow, pacStartColumn);
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

  if (gameStart) {
    player.move()
  }
  
}

function keyPressed() {
  if (key === "w" || keyCode === UP_ARROW) {
    player.dir = "up"
  } else if (key === "s" || keyCode === DOWN_ARROW) {
    player.dir = "down"
  } else if (key === "a" || keyCode === LEFT_ARROW) {
    player.dir = "left"
  } else if (key === "d" || keyCode === RIGHT_ARROW) {
    player.dir = "right"
  } else if (key === "t") {
    gameStart = true;
  }
}

function mouseClicked() {
  paths[debugRow][debugColumn][2] = true; // adds a 'blocked' property to the grid for debugging
}
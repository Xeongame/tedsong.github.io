// First Day Demo
// Ted Song
// 9/10/2024
//
// Extra for Experts:
// draw happens at 60fps in loop


let columnNum = 15;
let rowNum = 17;

let gridLength = 50
let updateRate = 15;

let gameEnd = false;
let directionDB = false;

let snakeSegments = [];
let queuedDirections = [];
let startingSegments = 10;
let grids = []
let layout = [
  "111111111111111", // 1
  "100000000000001", // 2
  "100000000000001", // 3
  "100000000000001", // 4
  "100000000000001", // 5
  "100000000000001", // 6
  "100000000000001", // 7
  "100000000000001", // 8
  "100000000000001", // 9
  "100000000000001", // 10
  "100000000000001", // 11
  "100000000000001", // 12
  "100000000000001", // 13
  "100000000000001", // 14
  "100000000000001", // 15
  "100000000000001", // 16
  "111111111111111", // 17
]

let oppositeDirections = {
  right:"left",
  left:"right",
  up:"down",
  down:"up",
};

class Snake {
  constructor(row, column) {
    this.row = row || 0;
    this.column = column || 0;
    this.index = snakeSegments.length 
    this.lastMoved = false;
    
    let grid = grids[this.row][this.column];
    this.x = grid[0]  + gridLength/2;
    this.y = grid[1] + gridLength/2;

    this.dir = "right";
    this.lastDir = "right"
  }

  show() {
    fill(255, 255, 0);
    circle(this.x, this.y, gridLength * 0.8);
  }

  getNextGrid() {
    this.moveX = 0
    this.moveY = 0

    if (this.dir === "right") {
      this.moveX = 1
    }  else if (this.dir === "left") {
      this.moveX = -1
    } else if (this.dir === "up") {
      this.moveY = -1
    } else {
      this.moveY = 1
    }

    let row = this.row + this.moveY
    let column = this.column + this.moveX

    let newRow = grids[row]

    if (newRow) {
      return newRow[column]
    }
  }

  move() {
    if (this.index !== 0) {
      let previousSegment = snakeSegments[this.index - 1]
      if (!previousSegment.lastMoved) {
        return
      } else {
        this.dir = previousSegment.lastDir
      }
    }

    this.lastDir = this.dir
    grids[this.row][this.column][2] = 0;
    
    let newGrid = this.getNextGrid()
    
    if (newGrid) {
      this.x = newGrid[0] + gridLength / 2
      this.y = newGrid[1] + gridLength / 2

      newGrid[2] = 1;

      this.row += this.moveY
      this.column += this.moveX
      this.lastMoved = true;

      if (this.index === 0) {
        directionDB = false;
      }
     
    }
  }
}

function init() { 
  // grids set up
  for (let x = 0; x < columnNum; x++) {
    for (let y = 0; y < rowNum; y++) {
      let type = layout[y][x];
      let row = grids[y] || [];
      let column = [x * gridLength, y * gridLength, type];

      row[x] = column;
      grids[y] = row;
    }
  }

  for (let i = 0; i < startingSegments; i ++) {
    let segment = new Snake(1, 1)
    snakeSegments.push(segment)
  }
}

function drawMap() {
  for (let row = 0; row < grids.length; row++) {
    for (let column = 0; column < grids[row].length; column ++) {
      stroke(0, 0, 255);
      strokeWeight(2);

      let x = grids[row][column][0];
      let y = grids[row][column][1];
      let type = grids[row][column][2];

      fill(0);
      if (type === "1") {
        fill(255, 0, 0);
      }

      rect(x, y, gridLength, gridLength)
    }
  }
}

function setup() {
  createCanvas(950, windowHeight);
  init()
  print(grids)
}

function draw() {
  background(0);
  drawMap()

  if (gameEnd) {
    return
  }

  let nextGrid = snakeSegments[0].getNextGrid()
  let blocked = nextGrid && nextGrid[2] === "1" || 0

  for (let i = snakeSegments.length - 1; i >= 0; i--) {
    let segment = snakeSegments[i]

    segment.show()

    if (frameCount % updateRate === 0) {
      if (blocked) {
        gameEnd = true
        print("SD")
        return
      } else {
        segment.move()
      }
    }
  }
}


function keyPressed() {
  let lastDir = snakeSegments[0].lastDir
  let dir = ""
  
  if (queuedDirections) {
    return
  }

  if (key === "w" || keyCode === UP_ARROW) {
    snakeSegments[0].dir = "up";
    directionDB = true;
  } else if (key === "s" || keyCode === DOWN_ARROW) {
    snakeSegments[0].dir = "down";
    directionDB = true;
  } else if (key === "a" || keyCode === LEFT_ARROW) {
    snakeSegments[0].dir = "left";
    directionDB = true;
  } else if (key === "d" || keyCode === RIGHT_ARROW) {
    snakeSegments[0].dir = "right";
    directionDB = true;
  } else if (key === " ") {
//    gamePreparing = true; 
  }

  if (oppositeDirections[lastDir] === snakeSegments[0].dir) {
    snakeSegments[0].dir = lastDir
  }
}
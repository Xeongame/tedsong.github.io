// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let columnNum = 38;
let rowNum = 28;
let spacing = 6;
let border = 2;
let length = 30;

let pacX = 0;
let pacY = 0;
let pacSpeed = 7.4;
let grids = [];
let paths = [];
let player 

class pac {
  constructor(row, column) {
    this.row = row || 0;
    this.column = column || 0;
    this.moveX = 0;
    this.moveY = 0;

    let coordinates = getGridCenter(this.row, this.column);
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.dir = "right";
  }

  show() {
    fill(255, 255, 0);
    circle(this.x, this.y, length * 0.8);
  }

  move() {
    let grid = grids[this.row][this.column]
    let path = paths[this.row][this.column]
    let choosenPath
    let index

    function find(n) {
      return n === 
    }

    if (this.dir === "right") { 
      choosenPath = path[0]
      index = choosenPath.findIndex(find);

    } else if (this.dir === "left") { 
      nextGrid = grids[this.row][this.column - 1];
      this.moveX = -pacSpeed;

    } else if (this.dir === "up") { 
      if (grids[this.row - 1]) {
        nextGrid = grids[this.row - 1][this.column];
        this.moveY = -pacSpeed;
        print(nextGrid, this.row)
      }
    } else { 
      if (grids[this.row + 1]) {
        nextGrid = grids[this.row + 1][this.column]; 
        this.moveY = pacSpeed
      }
    }

    //print(nextGrid)
    if (nextGrid) {
      let dirX = this.moveX/Math.abs(this.moveX)
      let dirY = this.moveY/Math.abs(this.moveY)

      if (this.x * dirX > nextGrid[0] * dirX) {
        this.column += dirX;
      }
      print(this.row, dirY, this.moveY, nextGrid[1])
      if (this.y * dirY > nextGrid[1] * dirY) {
        this.row += dirY;
        
      }

      this.x += this.moveX;
      this.y += this.moveY;
    } else {
      this.x = grids[this.row][this.column][0] + length/2
      this.y = grids[this.row][this.column][1] + length/2;
    }
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
          xPoints.push([i, centerY])
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
          yPoints.push([centerX, i])
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

function getGridCenter(row, column) {
  let g = grids[row][column]
  let x = g[0] + length/2
  let y = g[1] + length/2

  return [x, y];
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
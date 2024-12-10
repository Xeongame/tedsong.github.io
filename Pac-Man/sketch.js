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
let length = 30;

let pacX = 0;
let pacY = 0;
let pacSpeed = 5;
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
    this.dirX = 1;
    this.dirY = 1;
  }

  show() {
    fill(255, 255, 0);
    circle(this.x, this.y, length * 0.8);
  }

  pathfind() {
    let path = paths[this.row][this.column]
    let waypoints
    let index

    //print(this.column)
    if (this.dir === "right") { 
      waypoints = path[0]
      this.moveX = pacSpeed

    } else if (this.dir === "left") { 
      waypoints = path[0]
      this.moveX = -pacSpeed
      this.dirX = -1

    } else if (this.dir === "up") { 
      waypoints = path[1]
      this.moveY = -pacSpeed
      this.dirY = -1

    } else { 
      waypoints = path[1]
      this.moveY = pacSpeed

    }

    for (let i = 0; i < waypoints.length; i++) {
      let x = waypoints[i][0]
      let y = waypoints[i][1]

      if (this.x === x && this.y === y) {
        index = i
      }
    }

    this.waypoints = waypoints
    return index
  }

  move() {
    this.moveX = 0
    this.moveY = 0
    this.dirX = 1;
    this.dirY = 1;

    let index = this.pathfind()
    let dif = this.waypoints.length - index
    let dir = (this.dirX/Math.abs(this.dirX)) * (this.dirY/Math.abs(this.dirY))

    print(dif, dir, this.column, this.row, this.waypoints.length)
    if (dif * dir <= pacSpeed * dir) {
      if (this.moveX !== 0) {
        if (this.column < columnNum - 1) {
          this.column += dir
          this.waypoints = paths[this.row][this.column]
          this.x += this.moveX
        }
        
      } else {
        if (this.row < rowNum - 1) {
          this.row += 1
          this.waypoints = paths[this.row][this.column]
          this.y += this.moveY
        }
      }

      index = this.pathfind()
    } else {
      print("s")
      index = Math.min(index + this.moveX + this.moveY, this.waypoints.length - 1)
    }

    let nextPoint = this.waypoints[index]
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
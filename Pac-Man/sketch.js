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
let pacSpeed = 5;
let grids = [];
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
    let nextGrid 

    if (this.dir === "right") { 
      nextGrid = grids[this.row][this.column + 1];
      this.moveX = pacSpeed;

    } else if (this.dir === "left") { 
      nextGrid = grids[this.row][this.column - 1];
      this.moveX = -pacSpeed;

    } else if (this.dir === "up") { 
      grids[this.row - 1];
      this.moveY = -pacSpeed;

    } else { 
      nextGrid = grids[this.row + 1]; 
      this.moveY = pacSpeed
    }

    print(nextGrid)
    if (nextGrid) {
      this.x += this.moveX;
      this.y += this.moveY;

      let dirX = this.moveX/Math.abs(this.moveX)
      let dirY = this.moveY/Math.abs(this.moveY)
      let centerX = nextGrid[0] + length/2
      let centerY = nextGrid[1] + length/2

      if (this.x * dirX > centerX * dirX) {
        this.column += dirX;
      }

      if (this.y * dirY > centerY * dirY) {
        this.row += dirY;
      }
    } else {
      this.x = grids[this.row][this.column][0] + length/2
      this.y = grids[this.row][this.column][1] + length/2;
    }
    
    print(nextGrid)

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

  print(grids)
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

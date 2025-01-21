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
let pacStartColumn = 14;
let pacStartRow = 23;

let pacSpeed = 3;
let ghostSpeed = 3;
let ghostFrightenedSpeed = 2;
let ghostWarpZoneSpeed = 2;
let ghostDeadSpeed = 6;

let chaseDuration = 20;
let energizedDuration = 5;
let scatterDuration = 7;
let maxScatterNumber = 4;

let canvasX = 950
let canvasY

let eatDotSound;
let eatFruitSound;
let deathSound;
let eatGhostSound;
let intermissionMusic
let ghostSiren;
let introMusic;

let grids = [];
let paths = [];
let popUps = [];
let layout = [
              "1111111111111111111111111111", // 1
              "1000000000000110000000000001", // 2
              "1011110111110110111110111101", // 3
              "1O111101111101101111101111O1", // 4
              "1011110111110110111110111101", // 5
              "1000000000000000000000000001", // 6
              "1011110110111111110110111101", // 7
              "1011110110111111110110111101", // 8
              "1000000110000110000110000001", // 9
              "111111011111o11o111110111111", // 10
              "ooooo1011111o11o1111101ooooo", // 11
              "ooooo1011oooooooooo1101ooooo", // 12
              "ooooo1011o11111111o1101ooooo", // 13
              "111111011o1oooooo1o110111111", // 14
              "------0ooo1oooooo1ooo0------", // 15
              "111111011o1oooooo1o110111111", // 16
              "ooooo1011o11111111o1101ooooo", // 17
              "ooooo1011oooooooooo1101ooooo", // 18
              "ooooo1011o11111111o1101ooooo", // 19
              "111111011o11111111o110111111", // 20
              "1000000000000110000000000001", // 21
              "1011110111110110111110111101", // 22
              "1011110111110110111110111101", // 23
              "1O001100000000000000001100O1", // 24
              "1110110110111111110110110111", // 25
              "1110110110111111110110110111", // 26
              "1000000110000110000110000001", // 27
              "1011111111110110111111111101", // 28
              "1011111111110110111111111101", // 29
              "1000000000000000000000000001", // 30
              "1111111111111111111111111111", // 31
            ];

let totalDots = 0;
let dotsEaten = 0;

let score = 0;
let highscore = 0;
let ghostScore = 200;
let ghostBonusScore = 200; // extra score gained from eating multiple ghosts in a row
let energizerScore = 100;
let dotScore = 10;
let fruitScore = 100;

let player 
let redGhost
let yellowGhost
let pinkGhost
let blueGhost

let gamePreparing = false; 
let gameWon = false;
let gameStart = false; // player begins moving
let gamePaused = false; 
let gameEnd = false; // eaten by a ghost or winning
let gamePauseTime = 0;

let debugWalls = true;
let debugColumn = 0;
let debugRow = 0;
let fps = 60;
let winScreenIndex = 0;

let font;
let introStart

let intro = false;
let introTime;

let mapSprite
let whiteMapSprite 
let dotSprite
let energizerSprite

let pacSprites = []
let ghostSprites = []
let deathSprites = []

// helper dictionaries
let directions = ["right", "left", "down", "up"]
let colors = ["red", "pink", "blue", "yellow"]
let statuses = ["normal", "scared", "dead"]
let oppositeDirections = {
  right:"left",
  left:"right",
  up:"down",
  down:"up"
}

function getGridCenterIndex(array) {
  let index = array.length - 1;

  if (array.length % (length/2) === 0) { // grids with even numbered length, ex: 24 pixels long
    index = array.length - length/2
  }

  return index
}

function preload() {
  mapSprite = loadImage('assets/map.png')
  whiteMapSprite = loadImage('assets/whitemap.png')
  energizerSprite = loadImage('assets/energizer.png')
  dotSprite = loadImage('assets/dot.png')
  font = loadFont('assets/ARCADE_N.TTF');

  eatDotSound = loadSound('assets/waka.wav')
  introMusic = loadSound('assets/gamestart.mp3')
  intermissionMusic = loadSound('assets/intermission.mp3')
  ghostSiren = loadSound('assets/ghostsirenloop.mp3')
  eatGhostSound = loadSound('assets/eatghost.wav')
  deathSound = loadSound('assets/death.wav')

  // pacman sprites
  for (let d = 0; d < 4; d++) {
    let dir = directions[d]
    pacSprites[dir] = []

    for (let i = 0; i < 3; i++) {
      let sprite = loadImage('assets/' + dir + 'pacman' + i + '.png')
      pacSprites[dir][i] = sprite
    }
  }

   // pacman death sprites
   for (let i = 0; i < 11; i++) {
    let sprite = loadImage('assets/death' + i + '.png')
    deathSprites[i] = sprite
  }

  // ghost sprites
  for (let s = 0; s < 3; s++) {
    let status = statuses[s]
    ghostSprites[status] = [1]

    if (status === "normal") {  
      for (let d = 0; d < 4; d++) {
        let dir = directions[d]
        ghostSprites[status][dir] = []
    
        for (let c = 0; c < 4; c++) {
          let color = colors[c]
          ghostSprites[status][dir][color] = []
      
          for (let i = 0; i < 2; i++) {
            let sprite = loadImage('assets/' + dir + color + 'ghost' + i + '.png')
            ghostSprites[status][dir][color][i] = sprite
          }
        }
      }
    } else if (status === "scared") {
      let w0 = loadImage('assets/whitefearghost0.png')
      let w1 = loadImage('assets/whitefearghost1.png')
      let b0 = loadImage('assets/bluefearghost0.png')
      let b1 = loadImage('assets/bluefearghost1.png')


      ghostSprites[status]["blue"] = [b0, b1]  
      ghostSprites[status]["white"] = [w0, w1]     
    } else if (status === "dead") {
      for (let d = 0; d < 4; d++) {
        let dir = directions[d]
        let sprite = loadImage('assets/dead' + dir + '.png')
          
        ghostSprites[status][dir] = sprite
      }
    }
  }
}

function setup() {
  createCanvas(950, windowHeight);
  canvasY = height
  imageMode(CENTER);
  frameRate(fps);
  angleMode(DEGREES);

  textAlign(CENTER)
  textFont(font);

  init()
}

function drawMap() {
  if (Math.floor(winScreenIndex) % 2 === 0) { // default map
    image(mapSprite, length * columnNum / 2, length * rowNum / 2, length * columnNum, length * rowNum)
  } else { // flashes white as win screen
    image(whiteMapSprite, length * columnNum / 2, length * rowNum / 2, length * columnNum, length * rowNum)
  }

  if (!gamePaused) {
    for (let row = 0; row < grids.length; row++) {
      for (let column = 0; column < grids[row].length; column ++) {
        stroke(0, 0, 255)
        strokeWeight(border);
  
        let x = grids[row][column][0]
        let y = grids[row][column][1]
        let type = paths[row][column][2]
        let info = paths[row][column][3] // stores additional context for each grid type
        let anim = paths[row][column][4] // controls static animation
  
        fill(0)
        if (type === "1" && debugWalls) {
          fill(255, 0, 0);
        }
  
        noFill()
        //rect(x, y, length, length)
  
        if (type === "0" && !info) { // dots
          image(dotSprite, x + length / 2, y + length / 2, length * 2, length * 2)
        } else if (type === "O" && !info) { // energizers
          if (anim > 1) {
            image(energizerSprite, x + length / 2, y + length / 2, length * 2, length * 2)
          }
  
          paths[row][column][4] += 1/8
  
          if (paths[row][column][4] > 1.5) {
            paths[row][column][4] = 0
          }
        } else if (type === "1" || type === "!") {
          paths[row][column][3] = "blocked" 
        }
      }
    }
  } 
}

function debug() {
  debugColumn = Math.floor(mouseX / length)
  debugRow = Math.floor(mouseY / length)
}

class Pac {
  constructor(row, column) {
    this.row = row || 0;
    this.column = column || 0;
    this.moveX = 0;
    this.moveY = 0;
    this.spriteId = 0;

    let grid = grids[this.row][this.column]
    this.x = grid[0]
    this.y = grid[1] + length/2

    this.dir = "right";
    this.lastDir = "right";
    this.queueDir = "right";

    this.queueMove = false;
    this.playDeathAnim = false;
    this.surroundingGridPaths = []
  }

  show() {
    fill(255, 255, 0);
    //circle(this.x, this.y, length * 0.8);
    if (this.playDeathAnim) {
      if (this.spriteId < 11) {
        image(deathSprites[Math.floor(this.spriteId)], this.x, this.y, length * 2, length * 2)

        this.spriteId += 0.25
      }
    } else {
      if (gameEnd || gameWon) {
        this.spriteId = 0
      }

      image(pacSprites[this.lastDir][Math.floor(this.spriteId)], this.x, this.y, length * 2, length * 2)

      if (this.moveX + this.moveY !== 0) { // cycles through sprite every 4 frames when moving
        this.spriteId += 0.25
      }
  
      if (this.spriteId >= 3) {
        this.spriteId = 0;
      }
    }
    
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
    this.moveXSign = Math.sign(this.moveX)
    this.moveYSign = Math.sign(this.moveY)

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
    } else {
      this.surroundingGridPaths.left = paths[this.row][columnNum - 1]
    }

    if (paths[this.row + 1]) {
      this.surroundingGridPaths.down = paths[this.row + 1][this.column]     
    }

    if (paths[this.row - 1]) {
      this.surroundingGridPaths.up = paths[this.row - 1][this.column]
       
    }

    this.currentGridPath = paths[this.row][this.column]
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

    let isBlocked = this.nextGridPath[3] === "blocked";
    let perpendicularBlocked = isPerpendicular && this.queuedGridPath[3] === "blocked"
    let forcedMove = false; // QUEUED MOVEMENT: forces movement in the old direction when failing to change directions
    let blockedForcedMove = false;

    // position variables
    let nextCenterIndex = getGridCenterIndex(this.nextWaypoints)
    let thisCenterIndex = getGridCenterIndex(this.waypoints)
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
        perpendicularBlocked = this.nextGridPath[3] === "blocked"; //checks the next grid 
        forcedMove = !perpendicularBlocked; // cancels QUEUED MOVEMENT if no unblocked path is available 

        if (doubleCheck || !forcedMove) {
           blockedForcedMove = true;
        }

        // redirects the movement variables 
        dirInt = (this.moveX + this.moveY)/Math.abs(this.moveX + this.moveY)
        indexDif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1
        //print("perp", forcedMove, blockedForcedMove, isBlocked, perpendicularBlocked, this.dir, this.lastDir, this.queueDir, this.surroundingGridPaths[this.queueDir])

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
        //print("STOP", this.dir, this.queueDir, this.lastDir, this.x, this.y, this.currentPointIndex, thisCenterIndex, perpendicularBlocked, isPerpendicular)
        this.moveX = 0;
        this.moveY = 0;
      }
      
      if (isPerpendicular) { // if trying to turn onto a blocked tile, keep moving in the previous direction
        this.dir = this.lastDir
      }
    } 

    // touching dots
    if (this.currentPointIndex === thisCenterIndex  && !this.currentGridPath[3]) {
      if (this.currentGridPath[2] === "0") { // regular dot
        dotsEaten += 1
        score += 10;
        this.lastEatenDot = frameCount
      } else if (this.currentGridPath[2] === "O") {// energizer
        dotsEaten += 1
        score += 100;
        this.energized = true;
        this.scareGhost = true; // sets true for one frame to scare all active ghosts
        this.energizedTime = energizedDuration * fps
      }

      this.currentGridPath[3] = true;
    }
    
    // moving out of current grid
    if (indexDif <= pacSpeed && (!isBlocked || (isBlocked && isPerpendicular && !perpendicularBlocked))) { 
      this.waypoints = this.nextWaypoints

      if (this.moveX !== 0) { //moving on the x axis
        this.column += dirInt
        this.moveX -= indexDif * dirInt
      } else { //moving on the y axis
        this.row += dirInt
        this.moveY -= indexDif * dirInt
      }

      // move to the other side of the map if in the warp zone (the open middle passage)
      if (this.column > columnNum - 1) { 
        this.column = 0
      } else if (this.column < 0) {
        this.column = columnNum - 1
      }

      if (dirInt > 0) { // assigns a new position in the new grid based on moving direction
        this.currentPointIndex = 0;
      } else {
        this.currentPointIndex = this.waypoints.length - 1;
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

    // power up count down
    if (this.energized) {
      this.scareGhost = this.energizedTime === energizedDuration * fps;
      this.energizedTime -= 1
    
      if (this.energizedTime === 0) {
        this.energized = false;
        ghostBonusScore = ghostScore
      }
    }
  }
}

class Ghost {
  constructor(id) {
    this.moveX = 0;
    this.moveY = 0;
    this.spriteId = 0;
    this.spriteId2 = 0;
    this.state = "idle"
    this.dir = "up";
    this.lastDir = "right";
    this.queueDir = "right";
    this.id = id

    if (id === 0) { // red ghost
      this.row = 11;
      this.column = 14;

      this.state = "chase"
      this.dir = "right"
      this.code = "red"

      this.targetCornerWaitTime = 3;
      this.targetIdleTime = 0
      this.scatterColumn = 27;
      this.scatterRow = 0;
      this.color = color(255, 0, 0)
    } else if (id === 1) { // pink ghost
      this.row = 14;
      this.column = 14;
       this.code = "pink"

      this.targetCornerWaitTime = 2;
      this.targetIdleTime = fps
      this.scatterColumn = 0
      this.scatterRow = 0;
      this.color = color(255, 200, 200)
    } else if (id === 2) { // blue ghost
      this.row = 14;
      this.column = 12;
       this.code = "blue"

      this.targetCornerWaitTime = 2;
      this.targetIdleTime = fps * 6
      this.scatterColumn = 0
      this.scatterRow = 30; 
      this.color = color(0, 0, 255)
    } else { // yellow ghost
      this.row = 14;
      this.column = 16;
       this.code = "yellow"

      this.targetCornerWaitTime = 2;
      this.targetIdleTime = fps * 8
      this.scatterColumn = 27
      this.scatterRow = 30;
      this.color = color(255, 255, 0)
    }

    let grid = grids[this.row][this.column]
    this.x = grid[0]
    this.y = grid[1] + length/2

    this.queueMove = false;
    this.surroundingGridPaths = []

    this.idleTime = this.targetIdleTime // in frames
    this.cornerWaitTime = this.targetCornerWaitTime; // in frames
    this.lastChaseTime = frameCount;
    this.lastScatterTime = frameCount;
    this.scatterNumber = 0;
  }

  show() {
    fill(this.color);
    //circle(this.x, this.y, length * 0.8);
    //rect(this.targetX, this.targetY, length * 0.5, length * 0.5)
    
    if (this.state === "frightened") {
      let color = player.energizedTime / fps < 2 && this.spriteId2 - Math.floor(this.spriteId2) > 0.5 && "white" || "blue"; 

      // uses blue sprites until energized time is less than 2, then begin flashing white as warning 
      image(ghostSprites["scared"][color][Math.floor(this.spriteId)], this.x, this.y, length * 2, length * 2)
    } else if (this.state === "dead" || this.state === "enterIdle") {
      image(ghostSprites["dead"][this.lastDir], this.x, this.y, length * 2, length * 2)
    } else {
      image(ghostSprites["normal"][this.lastDir][this.code][Math.floor(this.spriteId)], this.x, this.y, length * 2, length * 2) // regular sprites
    }

    if (gameStart) {
      this.spriteId += 0.125
      this.spriteId2 += 0.05
    }

    if (this.spriteId >= 2) {
      this.spriteId = 0;
      this.spriteId2 = 0
    }
  }

  locate() {
    this.moveX = 0
    this.moveY = 0

     // locate surrounding grids
     if (paths[this.row][this.column + 1]) {
      this.surroundingGridPaths.right = paths[this.row][this.column + 1]
    } else { 
      this.surroundingGridPaths.right = paths[this.row][0]
    }

    if (paths[this.row][this.column - 1]) {
      this.surroundingGridPaths.left = paths[this.row][this.column - 1]
    } else {
      this.surroundingGridPaths.left = paths[this.row][columnNum - 1]
    }

    if (paths[this.row + 1]) {
      this.surroundingGridPaths.down = paths[this.row + 1][this.column]     
    }

    if (paths[this.row - 1]) {
      this.surroundingGridPaths.up = paths[this.row - 1][this.column]
    }

    let targetRow = 0
    let targetColumn = 0

    if (this.state === "scatter") { // targets one of the four map corners 
      targetRow = this.scatterRow
      targetColumn = this.scatterColumn

      let targetGrid = paths[targetRow][targetColumn]
  
      this.targetX = targetGrid[0][0][0]
      this.targetY = targetGrid[1][1][1]
    } else if (this.state === "chase") { // targets player's grid
      if (this.id === 0) { // red ghost targets player's current position
        this.targetX = player.x
        this.targetY = player.y
      } else if (this.id === 1) { // pink ghost targets 4 grids in front of player
        this.targetX = player.x + player.moveXSign * 2 * length
        this.targetY = player.y + player.moveYSign * 24 * length

      } else if (this.id === 2) { // blue ghost targets 4 grids in front of the player, then projected in the direction of the red ghost 
        let x = player.x + player.moveXSign * 2 * length
        let y = player.y + player.moveYSign * 2 * length

        this.targetX = x - redGhost.x + x
        this.targetY = y - redGhost.y + y
      } else { // yellow ghost acts like red ghost if player is 8 grids or more away, otherwise it uses scatter mode pattern
        let dist = Math.sqrt(Math.abs(player.x - yellowGhost.x) ** 2 + Math.abs(player.y - yellowGhost.y) ** 2)

        if (dist < 8 * length) {
          targetRow = this.scatterRow
          targetColumn = this.scatterColumn

          let targetGrid = paths[targetRow][targetColumn]
  
          this.targetX = targetGrid[0][0][0]
          this.targetY = targetGrid[1][1][1]
        } else {
          this.targetX = player.x
          this.targetY = player.y
        }
      }
    } else if (this.state === "frightened") { // move to random grids
      let n1 = Math.floor(random(0, rowNum - 1) + 0.5)
      let n2 = Math.floor(random(0, columnNum - 1) + 0.5)

      let targetGrid = paths[n1][n2]
  
      this.targetX = targetGrid[0][0][0]
      this.targetY = targetGrid[1][1][1]
    } else if (this.state === "dead") { // return to ghost house to revive
      let targetGrid = paths[11][14]
  
      this.targetX = targetGrid[0][0][0]
      this.targetY = targetGrid[1][1][1]

      // at the entrance of the ghost house
      if (this.row === 11 && this.column === 14 && this.nextPointIndex === 0) { 
        this.changeState("enterIdle")
      }
    }

    let path = paths[this.row][this.column]
    let lastDist = 999999

    // path find: chooses the direction closest to the target grid
    for (let i = 0; i < 4; i++) { 
      let dir = directions[i]
      let nextGrid = this.surroundingGridPaths[dir]

      if (nextGrid[2] === "1" || dir === oppositeDirections[this.dir]) { // ghosts cannot move in the opposite direction or into a wall
        continue
      }
      let centerX = nextGrid[0][0][0] + length / 2
      let centerY = nextGrid[1][0][1] + length / 2

      let xDif = Math.abs(this.targetX - centerX)
      let yDif = Math.abs(this.targetY - centerY)
      let dist = Math.sqrt(xDif ** 2 + yDif ** 2)

      if (dist <= lastDist) {
        lastDist = dist
        this.queueDir = dir
      }
    }

    this.speed = ghostSpeed

    if (path[2] === "-") { // slows down if in warp zone
      this.speed = ghostWarpZoneSpeed;
    }

    if (this.state === "frightened") {
      this.speed = ghostFrightenedSpeed;
    } else if (this.state === "idle") {
      this.speed = ghostWarpZoneSpeed
    } else if (this.state === "dead") {
      this.speed = ghostDeadSpeed
    }

    //print(this.column)
    if (this.dir === "right") { 
      this.moveX = this.speed 
      this.axisIndex = 0
    } else if (this.dir === "left") { 
      this.moveX = -this.speed 
      this.axisIndex = 0
    } else if (this.dir === "up") { 
      this.moveY = -this.speed
      this.axisIndex = 1
    } else { 
      this.moveY = this.speed
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

    this.currentGridPath = paths[this.row][this.column]
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
    this.lastDir = this.dir

    // print(this.state)
    // positive = moving left to right or top to bottom, negative = moving right to left or bottom to top
    let dirInt = (this.moveX + this.moveY)/Math.abs(this.moveX + this.moveY) 

    //calculates difference of steps from the next grid 
    let indexDif = (dirInt > 0) && this.waypoints.length - this.currentPointIndex || this.currentPointIndex + 1 
    
    if (this.state === "idle") { // ghost house state (stuck in the box at the center)
      let midY = this.waypoints[length / 2][1]
      let topY = midY - length / 2
      let bottomY = midY + length / 2
      
      this.y += this.moveY
      this.idleTime -= 1

      if (this.y <= topY) {
        this.dir = "down"
      } else if (this.y >= bottomY) {
        this.dir = "up"
      }

      if (this.idleTime <= 0 && this.y === midY) { // leaves idle state when idleTime reaches 0 and y position is centered
        this.changeState("leaveIdle")
      }
    } else if (this.state === "leaveIdle") { // moving out of ghost house
      let exit = paths[11][14][0][0] // the grid right outside the ghost house
      let exitX = exit[0]
      let exitY = exit[1]

      if (this.x !== exitX) {
        this.x += this.moveX
        
        if (this.x < exitX) { // moving until x coordinates match
          this.dir = "right"
        } else {
          this.dir = "left"
        }
      } else if (this.y !== exitY) { // then moving until y coordinates match
        this.dir = "up"
        this.y += this.moveY
      } else { // set up for scatter phase
        this.row = 11
        this.column = 14
        this.changeState("scatter")
        this.lastScatterTime -= 4 * fps // briefly enter scatter mode

        this.locate()
        this.dir = this.queueDir
      }
    } else if (this.state === "enterIdle") {
      let entrance = paths[14][14][0][0] // the grid right outside the ghost house
      let y = entrance[1]
      this.idleTime = 0

      if (this.y !== y) { // moving until y coordinates match
        this.dir = "down"
        this.y += this.moveY
      } else { // restart in idle mode
        this.changeState("idle")
      }
    } else { // moves towards target grid
      // moving out of current grid
      if (indexDif <= this.speed) { 
        this.waypoints = this.nextWaypoints

        if (this.moveX !== 0) { //moving on the x axis
          this.column += dirInt
          //this.moveX -= indexDif * dirInt
        } else { //moving on the y axis
          this.row += dirInt
         // this.moveY -= indexDif * dirInt
        }

        // move to the other side of the map if in the warp zone (the open middle passage)
        if (this.column > columnNum - 1) { 
          this.column = 0
        } else if (this.column < 0) {
          this.column = columnNum - 1
        }

        if (dirInt > 0) { // assigns a new position in the new grid based on moving direction
          this.currentPointIndex = 0;
          this.moveX = 0;
          this.moveY = 0;
        } else {
          this.currentPointIndex = this.waypoints.length;
        }
      }

      this.nextPointIndex = Math.max(0, Math.min(this.currentPointIndex + this.moveX + this.moveY, this.waypoints.length))
      let constant = this.nextPointIndex === length && -1 || 0;

     // print(this.queueDir, this.dir, this.waiting, this.nextPointIndex, this.currentPointIndex, this.moveX, this.surroundingGridPaths, this.waypoints, this.nextGridPath)
      // move
      let nextPoint = this.waypoints[this.nextPointIndex + constant]
      let thisCenterIndex = getGridCenterIndex(this.waypoints)

      if (!this.waiting) {
        this.x = nextPoint[0]
        this.y = nextPoint[1]
      }

      // collision
      let distX = Math.abs(player.x - this.x)
      let distY = Math.abs(player.y - this.y)
      let dist = distX + distY

      if (dist <= length) { // touching player
        if (this.state === "frightened") {
         this.eaten()
        } else if (this.state !== "dead") { // gameover
          print("TOUCH")
          gameEnd = true;
        }
      }

       // change direction when at the middle of current grid
      if (this.nextPointIndex === thisCenterIndex) {
        if (this.dir !== this.queueDir) { // forces ghost to turn slower than the player by temporarily stopping movement
          this.waiting = true; 
        }

        this.dir = this.queueDir
      }

      // counting stopped time
      if (this.waiting) {
        this.cornerWaitTime -= 1

        if (this.cornerWaitTime <= 0) { 
          this.cornerWaitTime = this.targetCornerWaitTime
          this.waiting = false;
        }
      }
    }

    // state handler
    let chaseDif = (frameCount - this.lastChaseTime) / fps
    let scatterDif = (frameCount - this.lastScatterTime) / fps

    
    if (this.state !== "idle" && this.state !== "leaveIdle" && this.state !== "dead") {
      if (player.energized) { // enter frightened mode when player eats energizer
        if (this.state !== "frightened" && player.scareGhost) {
          this.lastState = this.state
          this.changeState("frightened")
        } 
      } else if (!player.energized && this.state === "frightened") { // leave frightened mode and re-enter whatever state it was before
        this.changeState(this.lastState)
      } else {
        if ((scatterDif > scatterDuration || this.scatterNumber >= maxScatterNumber) && this.state === "scatter") { // enter chase mode if scatter duration is over or if limit exceeds
          this.changeState("chase")
        } else if (chaseDif > chaseDuration && this.state === "chase" && this.scatterNumber < maxScatterNumber) { // enter scatter mode if chase duration is over (imited amount of times)
          print(this.code, chaseDif, this.lastChaseTime)
          this.changeState("scatter")
        }
      } 
    }
  }

  changeState(state) {
    let turnAround = false; 
    let oppositeDir =  oppositeDirections[this.dir]

    if (state === "scatter") {
      if (this.lastState === "chase") {
        turnAround = true;
      }

      this.lastScatterTime = frameCount 
      this.scatterNumber += 1
    } else if (state === "chase") {
      if (this.lastState === "scatter") {
        turnAround = true;
      }

      this.lastChaseTime = frameCount;
    } else if (state === "frightened") {
      turnAround = true;
    }

    if (turnAround && this.surroundingGridPaths[oppositeDir][2] !== "1") {
      this.dir = oppositeDir
    }

    this.state = state
  }

  eaten() {
    gamePaused = true
    gamePauseTime = 0.8  * fps;

    this.changeState("dead")
    eatGhostSound.play()
   
    textAlign(CENTER)
    popUps.push([ghostBonusScore, this.x, this.y + length / 2])

    score += ghostBonusScore
    ghostBonusScore += ghostScore
  }
}

function init() { 
  highscore = getItem("highscore") || 0
  score = 0;
  dotsEaten = 0;
  winScreenIndex = 0;

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

    // grid type
    let type = layout[y][x]

    row[x] = [xPoints, yPoints, type, false, 0] // meta data for each grid
    paths[y] = row

    if (type === "0" || type === "O") {
      totalDots += 1;
    }
  }
}

 // print(grids, paths)
  player = new Pac(pacStartRow, pacStartColumn);
  redGhost = new Ghost(0)
  pinkGhost = new Ghost(1)
  blueGhost = new Ghost(2)
  yellowGhost = new Ghost(3)
}

function gameState() {
  textSize(length / 2 - 1);
  textAlign(CENTER)
  strokeWeight(0);

  if (gameWon) {
    if (gamePauseTime === 1) { // restart game a frame before the count down is over
      gameEnd = false;
      gameStart = false;
      gamePreparing = false;
      intro = false;
      init()
      return
    }

    if (gamePauseTime < 2 * fps && gamePauseTime > 0) { // win screen
      winScreenIndex += 0.125
      fill(0)
      rect(13 * length, 12 * length, 2 * length, length)
    }

    player.show()

    if (!gamePaused) {
      gamePauseTime = 3 * fps
      gamePaused = true

      if (score > highscore) { // store data
        storeItem("highscore", score)
      }
    }
  } else if (gameEnd) {
    if (gamePauseTime === 2 * fps) {
      if (!deathSound.isPlaying()) {
        deathSound.play()
      }

      player.playDeathAnim = true;
    } else if (gamePauseTime === 1) { // restart game a frame before the count down is over
      gameEnd = false;
      gameStart = false;
      intro = false;
      init()
      return
    }

    player.show()

    if (!gamePaused) {
      gamePauseTime = 3 * fps
      gamePaused = true

      if (score > highscore) {
        storeItem("highscore", score)
      }
    }
  } else if (gamePreparing) { // waiting for music to stop
    if(!intro){
      introMusic.play();
      intro = true;
    } else {
      if (!introMusic.isPlaying()) {
        gameStart = true
      } else {
      textSize(length * 0.75);
      text("READY!", length * columnNum / 2, length * rowNum /2 + 2.25 * length);
      }
    }
  } else if (!gameStart) { // if neither game start or game end
    text("PRESS SPACE TO START!", length * columnNum / 2, length * rowNum /2 + 2.25 * length);
  }
}

function soundHandler() {
  if (gamePaused || !gameStart) {
    eatDotSound.stop()
    ghostSiren.pause()
    ghostSiren.stop()
    intermissionMusic.pause()
  } else {
    ghostSiren.setVolume(0.05)

    if (!ghostSiren.isPlaying()) {
      ghostSiren.play()
    }
   
    if (frameCount - player.lastEatenDot < 10) {
      if (!eatDotSound.isPlaying()) {
        eatDotSound.play()
        //eatDotSound.loop()
      }
    } else {
      eatDotSound.stop()
    }

    if (player.energized) {
      if (!intermissionMusic.isPlaying()) {
        intermissionMusic.play()
      }
      
    } else {
      intermissionMusic.stop()
    }
  }
}

function draw() {
  translate(canvasX / 2 - (length * columnNum / 2), canvasY / 2 - (length * rowNum / 2))
  background(0);
  
  drawMap()
  debug()

  gameWon = dotsEaten === totalDots

  if (gamePaused) {
    gamePauseTime -= 1;

    // show score pop ups when game is "paused"
    for (i = 0; i < popUps.length; i++) {
      let popUp = popUps[i]
      
      fill(0, 255, 255)
      textSize(length * 0.5)
      text(popUp[0], popUp[1], popUp[2])
    }

    // clear all pop ups once game is unpaused
    if (gamePauseTime <= 0) {
      gamePaused = 0;

      popUps = []
    }
  } else {
    player.show()
    blueGhost.show()
    redGhost.show()
    pinkGhost.show()
    yellowGhost.show()
  
    if (gameStart) {
      player.move()
      blueGhost.move()
      redGhost.move()
      pinkGhost.move()
      yellowGhost.move()
    }
  }

  soundHandler()
  gameState()

  fill(255)
  textSize(length);
  strokeWeight(0);

  textAlign(CENTER)
  text("HIGH SCORE", length * columnNum / 2, length * -2);
  text(highscore, length * columnNum / 2, length * -0.5);

  textAlign(LEFT)
  text("1UP", 0, length * -2);
  text(score, 0, length * -0.5);
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
  } else if (key === " ") {
    gamePreparing = true;
  } else if (key === "y") { // debug key
    //player.move()
   // redGhost.move()
   // redGhost.show()
  }
}

function mouseClicked() {
  //paths[debugRow][debugColumn][2] = true; // adds a 'blocked' property to the grid for debugging
}

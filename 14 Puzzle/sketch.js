// Terrain Generation 
// Ted Song
// 10/30/2024
// CS 30

let NUM_ROWS = 3;
let NUM_COLS = 3;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gameWon = false; //global variable for ending the game
let fillMode = "cross"; //fills either in a square shape or cross shape
let gridData = [[0,0,0,0,0],
                [0,0,0,0,0],
                [0,255,0,0,0],
                [255,255,255,0,0]];

let overlayData = [[1,0,0,0,0], //separate data array for overlay squares
                   [0,0,0,0,0],
                   [0,0,0,0,0],
                   [0,0,0,0,0]];

function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  randomize(); //randomize the square colors at the very start
}

function draw() {
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid();                //render the current game board to the screen (and the overlay)
  winCondition(); //check for win condition and render the win screen
  drawOverlay(); //draw the overlay
}

function randomize(){
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      gridData[y][x] = (Math.round(random(1)) === 0 && 255) || 0; //50/50 for either white or black
    }
  }
}

function mousePressed(){
  // cross-shaped pattern flips on a mouseclick. Boundary conditions are checked within the flip function to ensure in-bounds access for array
  if (gameWon === true) return; //disables user input if game has been won

  flip(currentCol, currentRow);

  if (keyIsDown(SHIFT)) return; //shift click flips only the clicked square

  if (fillMode === "cross") { //cross shaped
    flip(currentCol + 1, currentRow);
    flip(currentCol - 1, currentRow);
    flip(currentCol, currentRow + 1);
    flip(currentCol, currentRow - 1);
  } else { //square shaped
    flip(currentCol + 1, currentRow);
    flip(currentCol, currentRow + 1);
    flip(currentCol + 1, currentRow + 1);
  }
}

function keyPressed(){
  if (key === " "){ //changes mode when space is pressed
    if (fillMode === "cross"){
      fillMode = "square";
    } else {
      fillMode = "cross";
    }
  }
}

function changeOverlay(col, row){ 
  if (col >= 0 && col < NUM_COLS ){ //sets the square data at given row and column to 1 to be rendered later
    if (row >= 0 && row < NUM_ROWS){
      overlayData[row][col] = 1;
    }
  }
}

function drawOverlay(){  
  for (let x = 0; x < NUM_COLS ; x++){ //resets all overlay data 
    for (let y = 0; y < NUM_ROWS; y++){
      overlayData[y][x] = 0;
    }
  }

  changeOverlay(currentCol, currentRow); //determines the active overlay squares based on fill mode and mouse location
  if (fillMode === "cross") { //cross 
    changeOverlay(currentCol + 1, currentRow);
    changeOverlay(currentCol - 1, currentRow);
    changeOverlay(currentCol, currentRow + 1);
    changeOverlay(currentCol, currentRow - 1);
  } else { //square
    changeOverlay(currentCol + 1, currentRow);
    changeOverlay(currentCol, currentRow + 1);
    changeOverlay(currentCol + 1, currentRow + 1);
  }
  

  for (let x = 0; x < NUM_COLS ; x++){ //renders all active overlay squares with a data of 1
    for (let y = 0; y < NUM_ROWS; y++){
      if (overlayData[y][x] === 1) {
        fill(0, 255, 0, 50);
        rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
      }
    }
  }
}

function winCondition(){
  let startingColor = gridData[0][0]; //starting variable used to check for win condition each frame
  let winCondition = true; //bool to check if game was won

  for (let x = 0; x < NUM_COLS ; x++){ //loop to compare square color
    for (let y = 0; y < NUM_ROWS; y++){
      let color = gridData[y][x];

      if (startingColor !== color) winCondition = false; //if just one square color doesn't match then game hasn't been won
    }
  }

  gameWon = winCondition; //set the global variable to win condition

  if (gameWon === true) { //if game has been won then render the win screen
    fill(0, 255, 0);
    textSize(100);
    textAlign(CENTER);
    text("YOU WIN!", width/2, height/2);
  }
}

function flip(col, row){
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if (col >= 0 && col < NUM_COLS ){
    if (row >= 0 && row < NUM_ROWS){
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}

function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}



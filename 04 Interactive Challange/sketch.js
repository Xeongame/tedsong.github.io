// Interactive Scene
// Ted Song
// 9/16/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentBack = 0;
let sizeX = 800, sizeY = 500;
let sunSize = sizeX/8;
let sunSizeMultiplier = 1;
let horizon = 480;
let sceneConfig = [ // assign different scene settings through dictionary
  {
    id:0,
    backColor:[129, 169, 218],
    terrainColor1:[225],
    terrainColor2:[235],
    terrainColor3:[248],
    hillColor1:[200], 
    hillColor2:[250], 
  },
  {
    id:1,
    backColor:[119, 142, 154],
    terrainColor1:[225],
    terrainColor2:[235],
    terrainColor3:[248],
    hillColor1:[200], 
    hillColor2:[250], 
  },
  {
    id:2,
    backColor:[100, 170, 255],
    terrainColor1:[20, 185, 80],
    terrainColor2:[50, 200, 100],
    terrainColor3:[70, 228, 120],
    hillColor1:[0, 190, 120], 
    hillColor2:[100, 210, 100],
    
  },
  {
    id:3,
    backColor:[220, 40, 40],
    terrainColor1:[70],
    terrainColor2:[100, 105, 105],
    terrainColor3:[135],
    hillColor1:[20], 
    hillColor2:[250],  
  },
];


function setup() {
  createCanvas(sizeX, sizeY);
};

function draw() {
  let config = sceneConfig[currentBack]; //gets settings
  background(220);
  
  fill(config.backColor); //background
  rect(0, 0, sizeX, sizeY); 

  fill(250, 247, 140); //moon
  stroke(255, 255, 200);
  strokeWeight(2)
  circle(mouseX, sizeY - mouseY + horizon/2, sunSize * sunSizeMultiplier); //mirrors y pos from the horizon and scaling with size variable
  fill(config.backColor);
  noStroke();
  circle(mouseX - (sunSize/5 * sunSizeMultiplier), sizeY - mouseY - (sunSize/5 * sunSizeMultiplier) + horizon/2, sunSize * sunSizeMultiplier); //creates a new circle to blend with background to give the moon the crescent shape

  strokeWeight(2); //sun at the mouse pos
  fill(255, 239, 0);
  stroke(255, 220, 0);
  circle(mouseX, mouseY, sunSize * sunSizeMultiplier); //scales with size variable

  fill(config.hillColor1); //hills
  noStroke();
  triangle(410, 310, 531, 118, 658, 311);
  triangle(690, 320, 740, 235, 785, 321);
  fill(config.hillColor2);
  triangle(690, 320, 740, 235, 755, 320);
  triangle(400, 310, 531, 118, 608, 311);

  fill(config.terrainColor1); //terrain
  noStroke();
  ellipse(sizeX - 250, sizeY + 100, 1500, 600);
  fill(config.terrainColor2);
  ellipse(sizeX - 550, sizeY + 80, 1100, 600);
  fill(config.terrainColor3);
  ellipse(sizeX - 200, sizeY + 180, 700, 600);

  fill(0) //artist mark
  text("Ted Song", sizeX -  60, sizeY - 10) 
};

function keyPressed(){
  if (keyCode == RIGHT_ARROW){ //changes sun/moon size with arrow keys
    sunSizeMultiplier += 0.1;
  } else if (keyCode == LEFT_ARROW){
    sunSizeMultiplier -= 0.1;
  };

  if (sunSizeMultiplier > 1.5){ //resets size if size is too big or too small
    sunSizeMultiplier = 0.5;
  } else if (sunSizeMultiplier < 0.5){
    sunSizeMultiplier = 1.5;
  };

};

function mouseClicked(){
  if (mouseButton === CENTER || mouseButton === LEFT){
    currentBack += 1 //changes background when mouse is clicked

    if (currentBack === 4) {
      currentBack = 0 //resets background
    }
  };
};
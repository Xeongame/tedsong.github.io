// Interactive Scene
// Ted Song
// 9/16/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentBack = 0;
let sizeX = 800, sizeY = 500;
let horizon = 400;
let sceneConfig = [ // assign different scene settings through dictionary
  {
    id:0,
    backColor:[150, 170, 255],
    terrainColor1:[225],
    terrainColor2:[235],
    terrainColor3:[248],
  },
  {
    id:1,
    color:"Red",
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

  

  fill(230, 227, 200) //moon
  stroke(222, 215, 196)
  circle(mouseX, sizeY - mouseY + horizon/2, sizeX/8) //mirror y pos from the horizon
  fill(config.backColor);
  noStroke()
  circle(mouseX - sizeX/26, sizeY - mouseY - sizeX/26 + horizon/2, sizeX/8)

  strokeWeight(2); //sun at the mouse pos
  fill(255, 239, 0)
  stroke(255, 220, 0);
  circle(mouseX, mouseY, sizeX/8)

  fill(config.terrainColor1) //terrain
  noStroke();
  ellipse(sizeX - 250, sizeY + 100, 1500, 600)
  fill(config.terrainColor2)
  ellipse(sizeX - 500, sizeY + 80, 1000, 600)
  fill(config.terrainColor3)
  ellipse(sizeX - 200, sizeY + 180, 700, 600)

  print(mouseY)
};

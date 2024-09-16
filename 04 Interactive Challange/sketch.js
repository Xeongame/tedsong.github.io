// Interactive Scene
// Ted Song
// 9/16/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentBack = 0;
let sizeX = 800, sizeY = 500;
let sceneConfig = [ // assign different scene settings through dictionary
  {
    id:0,
    backColor:[152, 224, 250],
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
  noStroke();
  
  fill(config.backColor); //background
  rect(0, 0, sizeX, sizeY); 

  
  fill(config.terrainColor1) //terrain
  ellipse(sizeX - 250, sizeY + 100, 1500, 600)
  fill(config.terrainColor2)
  ellipse(sizeX - 500, sizeY + 90, 1000, 600)
  fill(config.terrainColor3)
  ellipse(sizeX - 200, sizeY + 180, 700, 600)
};

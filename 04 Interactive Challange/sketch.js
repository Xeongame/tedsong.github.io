// Interactive Scene
// Ted Song
// 9/16/2024
//
// Extra for Experts:
// - used arrays for background customization
// - movable prop with advanced movement calculation (mirrored sun/moon)
// - prop position affects background color (simulates sunset/sunrise)


let currentBack = 0;
let backSizeX = 800, backSizeY = 500;
let sunSize = backSizeX/8;
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

let sunGlassesDistX = 22;
let sunGlassesDistY = 4;
let sunGlassesSizeX = 30;
let sunGlassesSizeY = 20;

function setup() {
  createCanvas(backSizeX, backSizeY);
};

function draw() {
  let config = sceneConfig[currentBack]; //gets settings
  let backColor = config.backColor;
  let distFromHorizon = Math.min(Math.max(mouseY - horizon/2, 0), 100); //finds distance from horizon and clamps it between 0 to 100
  let newBackColor = [backColor[0] - distFromHorizon, backColor[1] - distFromHorizon, backColor[2] - distFromHorizon]; //changes background shade to simulate nightfall
  background(220);
  
  fill(newBackColor); //background
  rect(0, 0, backSizeX, backSizeY); 

  fill(250, 247, 140); //moon
  stroke(255, 255, 200);
  strokeWeight(2);
  circle(mouseX, backSizeY - mouseY + horizon/2, sunSize * sunSizeMultiplier); //mirrors y pos from the horizon and scaling with size variable
  fill(newBackColor);
  noStroke();
  circle(mouseX - (sunSize/5 * sunSizeMultiplier), backSizeY - mouseY - (sunSize/5 * sunSizeMultiplier) + horizon/2, sunSize * sunSizeMultiplier); //creates a new circle to blend with background to give the moon the crescent shape

  strokeWeight(2); //sun at the mouse pos
  fill(255, 239, 0);
  stroke(255, 220, 0);
  circle(mouseX, mouseY, sunSize * sunSizeMultiplier); //scales with size variable
  fill(0)
  noStroke()

  ellipse(mouseX - sunGlassesDistX * sunSizeMultiplier, mouseY - sunGlassesDistY * sunSizeMultiplier, sunGlassesSizeX * sunSizeMultiplier, sunGlassesSizeY * sunSizeMultiplier);// creates sun glasses and scales based on sunSizeMultiplier
  ellipse(mouseX + sunGlassesDistX  * sunSizeMultiplier, mouseY - sunGlassesDistY * sunSizeMultiplier, sunGlassesSizeX * sunSizeMultiplier, sunGlassesSizeY * sunSizeMultiplier);
  rect(mouseX - sunGlassesDistX  * sunSizeMultiplier, mouseY - sunGlassesDistY * 2 * sunSizeMultiplier, sunGlassesSizeX * 1.5 * sunSizeMultiplier, sunGlassesSizeY/10 * sunSizeMultiplier)

  fill(config.hillColor1); //hills
  noStroke();
  triangle(410, 310, 531, 118, 658, 311);
  triangle(690, 320, 740, 235, 785, 321);
  fill(config.hillColor2);
  triangle(690, 320, 740, 235, 755, 320);
  triangle(400, 310, 531, 118, 608, 311);

  fill(config.terrainColor1); //terrain
  noStroke();
  ellipse(backSizeX - 250, backSizeY + 100, 1500, 600);
  fill(config.terrainColor2);
  ellipse(backSizeX - 550, backSizeY + 80, 1100, 600);
  fill(config.terrainColor3);
  ellipse(backSizeX - 200, backSizeY + 180, 700, 600);

  fill(0); //artist mark
  text("Ted Song", backSizeX -  60, backSizeY - 10);
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
    currentBack += 1; //changes background when mouse is clicked

    if (currentBack === 4) {
      currentBack = 0; //resets background
    }
  };
};
// GLOBAL VARS & TYPES
let rows = 50;
let cols = 50;

var cellWidth: number;
var cellHeight: number;

let grid: Grid;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  // FULLSCREEN CANVAS
  createCanvas(windowWidth, windowHeight);

  // SETUP SOME OPTIONS
  rectMode(CENTER).noFill().frameRate(30);

  cellWidth = 500 / cols;
  cellHeight = 500 / rows;

  grid = new Grid(cols, rows, cellWidth, cellHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // CLEAR BACKGROUND
  background(255);
  // TRANSLATE TO CENTER OF SCREEN
  translate(width / 2 - 250, height / 2 - 250);
  stroke(0);

  grid.draw();
  grid.calculate();

  fill(0);
  text("50x50 grid " + frameCount + " generations with frameRate " + int(frameRate()), 0, -30);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

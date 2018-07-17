var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var gemTriangle = new Image();
var gemHexagon = new Image();
var gemOctagon = new Image();
var gemRectangle = new Image();
var gemStar = new Image();
var GameGrid;

bg.src = "img/bg.jpg";
gemTriangle.src = "img/gem1.png";
gemHexagon.src = "img/gem2.png";
gemOctagon.src = "img/gem3.png";
gemRectangle.src = "img/gem4.png";
gemStar.src = "img/gem5.png";

const figureId = [gemTriangle, gemHexagon, gemOctagon, gemRectangle, gemStar];
const gameGridSize = 8;
const gemMinNum = 0, gemMaxNum = 5;
const titleSize = 64;
const CONERMARGIN = 24;

class Gem {

	constructor (x, y){
		this.X = CONERMARGIN + x * titleSize;
		this.Y = CONERMARGIN + y * titleSize;
		this.NeedX = this.X;
		this.NeedY = CONERMARGIN + y * titleSize;
		this.Kind = getRandomGem(gemMinNum, gemMaxNum);
		this.Img = figureId[this.Kind];
		this.Col = x;
		this.Row = y;
		this.Count = false;
		this.Swaped = false;
		this.Selected = false;
	}

}


function GameGridCreate(){
  GameGrid = new Array(gameGridSize);
  for (let i = 0; i < GameGrid.length; i++) {
  	GameGrid[i] = new Array(gameGridSize)
  } 

  for(let i = 0; i< gameGridSize; i++)
  	for(let j = 0; j< gameGridSize; j++){  		
  		GameGrid[i][j] = new Gem(j, i);
  	} 
}

function InitializationGame(){
	GameGridCreate();
	draw();
}


function getRandomGem(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}



function draw() {
	ctx.drawImage(bg, CONERMARGIN, CONERMARGIN);

	for (let i = 0; i < gameGridSize; i++) 
		for (let j = 0; j < gameGridSize; j++) {
			ctx.drawImage(GameGrid[i][j].Img, GameGrid[i][j].X, GameGrid[i][j].Y);
		}
}


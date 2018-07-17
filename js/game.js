var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var gemTriangle = new Image();
var gemHexagon = new Image();
var gemOctagon = new Image();
var gemRectangle = new Image();
var gemStar = new Image();

bg.src = "img/bg.jpg";
gemTriangle.src = "img/gem1.png";
gemHexagon.src = "img/gem2.png";
gemOctagon.src = "img/gem3.png";
gemRectangle.src = "img/gem4.png";
gemStar.src = "img/gem5.png";

const figureId = [gemTriangle, gemHexagon, gemOctagon, gemRectangle, gemStar];
const gameGrid = 8;
const gemMinNum = 0, gemMaxNum = 5;
const gameGridSize = 65;

function getRandomGem(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
	ctx.drawImage(bg, 0, 0);

	for (let i = 0; i < gameGrid; i++) 
		for (let j = 0; j < gameGrid - 1; j++) {
			ctx.drawImage(figureId[getRandomGem(gemMinNum, gemMaxNum)], i * gameGridSize, j * gameGridSize);
		}
}
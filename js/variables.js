class Gem {
	constructor (x, y){
		this.X = CONER_MARGIN + x * TILE_SIZE;
		this.Y = -64;
		this.Count = 0;
		this.Kind = getRandomGem(GEM_MINNUM, GEM_MAXNUM);
		this.NeedX = this.X;
		this.NeedY = CONER_MARGIN + y * TILE_SIZE;
		this.Img = FIGURE_ID[this.Kind];
		this.Col = x;
		this.Row = y;
		this.Swaped = false;
		this.Selected = false;
	}
}




var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var ScoreBoard = document.getElementById("sb");
var	TimerLabel = document.getElementById("timer");
var	GoalLabel = document.getElementById("goal");
var LvlLabel = document.getElementById("lvl");

var bg = new Image();
var gemTriangle = new Image();
var gemHexagon = new Image();
var gemOctagon = new Image();
var gemRectangle = new Image();
var gemStar = new Image();
var gemBlock = new Image();
var GameGrid;
var Score = 0;
var Timer = false;
var IsMoving = false;
var LVL = 1;
var GOAL = 50;
var Time = 60;
var BonusUsing = false;
var BonusNum = 1;


var LVL_ID = [4]
bg.src = "img/bg.jpg";
gemTriangle.src = "img/gem1.png";
gemHexagon.src = "img/gem2.png";
gemOctagon.src = "img/gem3.png";
gemRectangle.src = "img/gem4.png";
gemStar.src = "img/gem5.png";
gemBlock.src = "img3/gem3.png";





const FIGURE_ID = [gemTriangle, gemHexagon, gemOctagon, gemRectangle, gemStar, gemBlock];
const GAME_GRIDSIZE = 8;
const GEM_MINNUM = 0, GEM_MAXNUM = 5;
const TILE_SIZE = 64;
const CONER_MARGIN = 0;
const TILE_SPEED = 8;
const UNDEF_KIND = -1;
const BLOCK_KIND = FIGURE_ID.length - 1;



function LVLFormer(){
	LVL_ID[0] = new Array(GAME_GRIDSIZE);
  	for (let i = 0; i < LVL_ID[0].length; i++) {
  		LVL_ID[0][i] = new Array(GAME_GRIDSIZE)
  	} 

  	for(let i = 0; i< GAME_GRIDSIZE; i++){
  		for(let j = 0; j< GAME_GRIDSIZE; j++){  		
  			LVL_ID[0][i][j] = new Gem(j, i);
  		} 
  	}	

  	//__________________________________________

  	LVL_ID[1] = new Array(GAME_GRIDSIZE);
  	for (let i = 0; i < LVL_ID[1].length; i++) {
  		LVL_ID[1][i] = new Array(GAME_GRIDSIZE)
  	} 

  	for(let i = 0; i< GAME_GRIDSIZE; i++){
  		for(let j = 0; j< GAME_GRIDSIZE; j++){  		
  			LVL_ID[1][i][j] = new Gem(j, i);
  		}
  	} 

  	for (let i = 0; i < LVL_ID[1].length; i++) {
  		LVL_ID[1][7][i].Kind = BLOCK_KIND;
  		LVL_ID[1][6][i].Kind = BLOCK_KIND;
  	} 

  	//_________________________________________

  	LVL_ID[2] = new Array(GAME_GRIDSIZE);
  	for (let i = 0; i < LVL_ID[2].length; i++) {
  		LVL_ID[2][i] = new Array(GAME_GRIDSIZE)
  	} 

  	for(let i = 0; i< GAME_GRIDSIZE; i++){
  		for(let j = 0; j< GAME_GRIDSIZE; j++){  		
  			LVL_ID[2][i][j] = new Gem(j, i);
  		}
  	} 

  	for (let i = 0; i < LVL_ID[2].length; i++) {
  		LVL_ID[2][7][i].Kind = BLOCK_KIND;
  		LVL_ID[2][6][i].Kind = BLOCK_KIND;
  	} 
  	LVL_ID[2][5][0].Kind = BLOCK_KIND;
  	LVL_ID[2][5][1].Kind = BLOCK_KIND;
  	LVL_ID[2][5][6].Kind = BLOCK_KIND;
  	LVL_ID[2][5][7].Kind = BLOCK_KIND;
  	LVL_ID[2][4][0].Kind = BLOCK_KIND;
  	LVL_ID[2][4][7].Kind = BLOCK_KIND;

  	//_________________________________________


  	LVL_ID[3] = new Array(GAME_GRIDSIZE);
  	for (let i = 0; i < LVL_ID[3].length; i++) {
  		LVL_ID[3][i] = new Array(GAME_GRIDSIZE)
  	} 

  	for(let i = 0; i< GAME_GRIDSIZE; i++){
  		for(let j = 0; j< GAME_GRIDSIZE; j++){  		
  			LVL_ID[3][i][j] = new Gem(j, i);
  		}
  	} 


  	for (let i = 0; i < LVL_ID[1].length; i++) {
  		LVL_ID[3][i][7].Kind = BLOCK_KIND;
  		LVL_ID[3][i][0].Kind = BLOCK_KIND;
  		LVL_ID[3][7][i].Kind = BLOCK_KIND;
  	} 


}	
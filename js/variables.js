
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var ScoreBoard = document.getElementById("sb");


var bg = new Image();
var gemTriangle = new Image();
var gemHexagon = new Image();
var gemOctagon = new Image();
var gemRectangle = new Image();
var gemStar = new Image();
var GameGrid;
var FirstSelectedTile = undefined;
var Score = 0;




bg.src = "img/bg.jpg";
gemTriangle.src = "img/gem1.png";
gemHexagon.src = "img/gem2.png";
gemOctagon.src = "img/gem3.png";
gemRectangle.src = "img/gem4.png";
gemStar.src = "img/gem5.png";

const FIGURE_ID = [gemTriangle, gemHexagon, gemOctagon, gemRectangle, gemStar];
const GAME_GRIDSIZE = 8;
const GEM_MINNUM = 0, GEM_MAXNUM = 5;
const TILE_SIZE = 64;
const CONER_MARGIN = 0;
const TILE_SPEED = 4;
const UNDEF_KIND = -1;
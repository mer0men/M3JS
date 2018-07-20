
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

var bg1 = new Image();
var gemTriangle1 = new Image();
var gemHexagon1 = new Image();
var gemOctagon1 = new Image();
var gemRectangle1 = new Image();
var gemStar1 = new Image();

var bg2 = new Image();
var gemTriangle2 = new Image();
var gemHexagon2 = new Image();
var gemOctagon2 = new Image();
var gemRectangle2 = new Image();
var gemStar2 = new Image();

var bg3 = new Image();
var gemTriangle3 = new Image();
var gemHexagon3 = new Image();
var gemOctagon3 = new Image();
var gemRectangle3 = new Image();
var gemStar3 = new Image();

var GameGrid;
var Score = 0;
var Timer = false;
var IsMoving = false;
var LVL = 1;
var GOAL = 50;
var Time = 60;
var BonusUsing = false;
var BonusNum = 1;
var StylePack = 0;

bg.src = "img/bg.jpg";
gemTriangle.src = "img/gem1.png";
gemHexagon.src = "img/gem2.png";
gemOctagon.src = "img/gem3.png";
gemRectangle.src = "img/gem4.png";
gemStar.src = "img/gem5.png";

bg1.src = "img1/bg.png";
gemTriangle1.src = "img1/gem1.png";
gemHexagon1.src = "img1/gem2.png";
gemOctagon1.src = "img1/gem3.png";
gemRectangle1.src = "img1/gem4.png";
gemStar1.src = "img1/gem5.png";

bg2.src = "img2/bg3.jpg";
gemTriangle2.src = "img2/gem1.png";
gemHexagon2.src = "img2/gem2.png";
gemOctagon2.src = "img2/gem3.png";
gemRectangle2.src = "img2/gem4.png";
gemStar2.src = "img2/gem5.png";

bg3.src = "img3/bg.jpg";
gemTriangle3.src = "img3/gem1.png";
gemHexagon3.src = "img3/gem2.png";
gemOctagon3.src = "img3/gem3.png";
gemRectangle3.src = "img3/gem4.png";
gemStar3.src = "img3/gem5.png"; 

const FIGURE_ID = [[gemTriangle, gemHexagon, gemOctagon, gemRectangle, gemStar],
				   [gemTriangle1, gemHexagon1, gemOctagon1, gemRectangle1, gemStar1],
				   [gemTriangle2, gemHexagon2, gemOctagon2, gemRectangle2, gemStar2],
				   [gemTriangle3, gemHexagon3, gemOctagon3, gemRectangle3, gemStar3]];

const BACKGROUND_ID = [bg, bg1, bg2, bg3];

const GAME_GRIDSIZE = 8;
const GEM_MINNUM = 0, GEM_MAXNUM = 5;
const TILE_SIZE = 64;
const CONER_MARGIN = 0;
const TILE_SPEED = 8;
const UNDEF_KIND = -1;
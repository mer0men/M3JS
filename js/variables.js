class Gem {
	constructor (x, y){
		this.X = CONER_MARGIN + x * TILE_SIZE;
		this.Y = -64;
		this.Count = 0;
		this.Kind = getRandomGem(GEM_MINNUM, GEM_MAXNUM);
		this.NeedX = this.X;
		this.NeedY = CONER_MARGIN + y * TILE_SIZE;
		this.Img = FIGURE_ID[StylePack][this.Kind];
		this.Col = x;
		this.Row = y;
		this.Swaped = false;
		this.Selected = false;
	}
}

class Level{
	constructor(lvl){
		this.Level = lvl;
        this.lvlGOAL = this.Level * 60;
        this.Reward = this.Level * 15;
        this.Time = 60;
		this.GG = [];
        this.GG = new Array(GAME_GRIDSIZE);
        for (let i = 0; i < this.GG.length; i++) {
            this.GG[i] = new Array(GAME_GRIDSIZE);
        }

        for(let i = 0; i< GAME_GRIDSIZE; i++){
            for(let j = 0; j< GAME_GRIDSIZE; j++){
                this.GG[i][j] = new Gem(j, i);
            }
        }
	}
}

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var ScoreBoard = document.getElementById("sb");
var	TimerLabel = document.getElementById("timer");
var	GoalLabel = document.getElementById("goal");
var LvlLabel = document.getElementById("lvl");
var MoneyLabel = document.getElementById("money");
var Bonus1label = document.getElementById("bonus1");
var Bonus2label = document.getElementById("bonus2");
var Bonus3label = document.getElementById("bonus3");

var Money = 0; 
var SecondGoodBought = false;
var ThirdGoodBought = false;
var FourthGoodBought = false;
var GBut1 = document.getElementById("good1");
var GBut2 = document.getElementById("good2");
var GBut3 = document.getElementById("good3");


var IsMenu = false;
var IsCredits = false;
var IsCompany = false;
var IsEndless = false;



var gemBlock = new Image();
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
var GlobalScore = 0;
var Timer = false;
var IsMoving = false;
var LVL = 0;
var GOAL = 0;
var Time = 0;
var BonusUsing = false;
var BonusNum = 1;
var StylePack = 0;

var LVL_LIST = [];
//Bonuses
var FirstBonusCounts = 0;
var SecondBonusCounts = 0;
var ThirdBonusCounts = 0;

gemBlock.src = "img/gemBlock.png"
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

const FIGURE_ID = [[gemTriangle, gemHexagon, gemOctagon, gemRectangle, gemStar, gemBlock],
                  [gemTriangle1, gemHexagon1, gemOctagon1, gemRectangle1, gemStar1, gemBlock],
                  [gemTriangle2, gemHexagon2, gemOctagon2, gemRectangle2, gemStar2, gemBlock],
                   [gemTriangle3, gemHexagon3, gemOctagon3, gemRectangle3, gemStar3, gemBlock]];

const BACKGROUND_ID = [bg, bg1, bg2, bg3];
const GAME_GRIDSIZE = 8;
const GEM_MINNUM = 0, GEM_MAXNUM = 5;
const TILE_SIZE = 64;
const CONER_MARGIN = 0;
const TILE_SPEED = 1;
const UNDEF_KIND = -1;
const BLOCK_KIND = FIGURE_ID[StylePack].length - 1;



function LVLFormer(){
    LVL_LIST.push(new Level(LVL_LIST.length + 1));

  	//__________________________________________

    LVL_LIST.push(new Level(LVL_LIST.length + 1));

    for (let i = 0; i < LVL_LIST[LVL_LIST.length - 1].GG.length; i++) {
  		LVL_LIST[LVL_LIST.length - 1].GG[7][i].Kind = BLOCK_KIND;
        LVL_LIST[LVL_LIST.length - 1].GG[6][i].Kind = BLOCK_KIND;
  	} 

  	//_________________________________________

    LVL_LIST.push(new Level(LVL_LIST.length + 1));

  	for (let i = 0; i < LVL_LIST[LVL_LIST.length - 1].GG.length; i++) {
        LVL_LIST[LVL_LIST.length - 1].GG[7][i].Kind = BLOCK_KIND;
        LVL_LIST[LVL_LIST.length - 1].GG[6][i].Kind = BLOCK_KIND;
  	}

    LVL_LIST[LVL_LIST.length - 1].GG[5][0].Kind = BLOCK_KIND;
    LVL_LIST[LVL_LIST.length - 1].GG[5][1].Kind = BLOCK_KIND;
    LVL_LIST[LVL_LIST.length - 1].GG[5][6].Kind = BLOCK_KIND;
    LVL_LIST[LVL_LIST.length - 1].GG[5][7].Kind = BLOCK_KIND;
    LVL_LIST[LVL_LIST.length - 1].GG[4][0].Kind = BLOCK_KIND;
    LVL_LIST[LVL_LIST.length - 1].GG[4][7].Kind = BLOCK_KIND;

  	//_________________________________________


    LVL_LIST.push(new Level(LVL_LIST.length + 1));

  	for (let i = 0; i < LVL_LIST[LVL_LIST.length - 1].GG.length; i++) {
        LVL_LIST[LVL_LIST.length - 1].GG[i][7].Kind = BLOCK_KIND;
        LVL_LIST[LVL_LIST.length - 1].GG[i][0].Kind = BLOCK_KIND;
        LVL_LIST[LVL_LIST.length - 1].GG[7][i].Kind = BLOCK_KIND;
  	}

  	//___________________________________________

    LVL_LIST.push(new Level(LVL_LIST.length + 1));

    for (let i = 0; i < LVL_LIST[LVL_LIST.length - 1].GG.length; i++) {
        LVL_LIST[LVL_LIST.length - 1].GG[0][i].Kind = BLOCK_KIND;
    }

    for (let i = 4; i <= 7; i++) {
        for (let j = 3; j <= 4; j++) {
            LVL_LIST[LVL_LIST.length - 1].GG[i][j].Kind = BLOCK_KIND;
        }
    }
}	
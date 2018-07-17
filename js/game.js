class Gem {

	constructor (x, y){
		this.X = CONER_MARGIN + x * TITLE_SIZE;
		this.Y = CONER_MARGIN + y * TITLE_SIZE;
		this.Count = 0;
		this.Kind = getRandomGem(GEM_MINNUM, GEM_MAXNUM);
		this.NeedX = this.X;
		this.NeedY = CONER_MARGIN + y * TITLE_SIZE;
		this.Img = FIGURE_ID[this.Kind];
		this.Col = x;
		this.Row = y;
		this.Swaped = false;
		this.Selected = false;
	}

}

function GameGridCreate(){
  GameGrid = new Array(GAME_GRIDSIZE);
  for (let i = 0; i < GameGrid.length; i++) {
  	GameGrid[i] = new Array(GAME_GRIDSIZE)
  } 

  for(let i = 0; i< GAME_GRIDSIZE; i++)
  	for(let j = 0; j< GAME_GRIDSIZE; j++){  		
  		GameGrid[i][j] = new Gem(j, i);
  	} 
}

function InitializationGame(){
	GameGridCreate();
	draw();
	FindMatches();
}


function getRandomGem(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
	ctx.drawImage(bg, CONER_MARGIN, CONER_MARGIN);

	for (let i = 0; i < GAME_GRIDSIZE; i++) 
		for (let j = 0; j < GAME_GRIDSIZE; j++) {
			ctx.drawImage(GameGrid[i][j].Img, GameGrid[i][j].X, GameGrid[i][j].Y);
		}
}

function FindMatches(){
	for(let i = 0; i <= GAME_GRIDSIZE - 1; i++){
		for (let j = 0; j <= GAME_GRIDSIZE - 1 ; j++){
			if (i !== 0 && i !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== 5 &&
				GameGrid[i][j].Kind === GameGrid[i + 1][j].Kind &&
				GameGrid[i][j].Kind === GameGrid[i - 1][j].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i + n][j].Count+= 1;
				}
			}

			if (j !== 0 && j !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== 5 &&
				GameGrid[i][j].Kind === GameGrid[i][j + 1].Kind &&
				GameGrid[i][j].Kind === GameGrid[i][j - 1].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i][j + n].Count+= 1;
				}
			}
		}
	}
}
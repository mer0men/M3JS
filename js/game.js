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
	ctx.drawImage(bg, 0, 0);

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
					GameGrid[i + n][j].Count++;
				}
			}

			if (j !== 0 && j !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== 5 &&
				GameGrid[i][j].Kind === GameGrid[i][j + 1].Kind &&
				GameGrid[i][j].Kind === GameGrid[i][j - 1].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i][j + n].Count++;
				}
			}
		}
	}
}

function MouseDown(event) {
	let rect = cvs.getBoundingClientRect();

	let posX = event.clientX - rect.left;
	let posY = event.clientY - rect.top;

	let title = GameGrid[(posY - (posY % TITLE_SIZE)) / TITLE_SIZE ][(posX - (posX % TITLE_SIZE)) / TITLE_SIZE];
	title.Selected = true;

	ctx.removeNamedItem('rect');
    ctx.rect(title.X , title.Y, TITLE_SIZE + 1, TITLE_SIZE + 1 );
	ctx.strokeStyle="white";
    ctx.stroke();
    CheckGrid(title.Row, title.Col)

}

function CheckGrid(k, l)
{
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++)
    for (let j = 0; j <= GAME_GRIDSIZE - 1; j++)
    {
        let title1 = GameGrid[i][j];
        let title2 = GameGrid[k][l];

        if (title1.Row != k || title1.Col != l)
        {
            if (title1.Selected)
            {
                if (title1.Row < GAME_GRIDSIZE - 1 && GameGrid[title1.Row + 1][title1.Col].Selected ||
                    title1.Row > 0 && GameGrid[title1.Row - 1][title1.Col].Selected ||
                    title1.Col < GAME_GRIDSIZE - 1 && GameGrid[title1.Row][title1.Col + 1].Selected ||
                    title1.Col > 0 && GameGrid[title1.Row][title1.Col - 1].Selected)
                {
                    SwapTiles(i, j, k, l, true);

                    title1.Selected = false;
                    title2.Selected = false;

                    ctx.rect(title1.X , title1.Y, TITLE_SIZE + 1, TITLE_SIZE + 1 );
                    ctx.strokeStyle="red";
                    ctx.stroke();

                    ctx.rect(title2.X , title2.Y, TITLE_SIZE + 1, TITLE_SIZE + 1 );
                    ctx.strokeStyle="red";
                    ctx.stroke();
                }
                else
                {
                    title1.Selected = false;
                    title2.Selected = false;

                    ctx.rect(title1.X , title1.Y, TITLE_SIZE + 1, TITLE_SIZE + 1 );
                    ctx.strokeStyle="red";
                    ctx.stroke();

                    ctx.rect(title2.X , title2.Y, TITLE_SIZE + 1, TITLE_SIZE + 1 );
                    ctx.strokeStyle="red";
                    ctx.stroke();
                }
            }
        }
    }
}

function SwapTiles(i, j, k, l, firstswap)
{
    let temp = GameGrid[k][l];

    GameGrid[k][l] = GameGrid[i][j];
    GameGrid[i][j] = temp;

    let temp1 = new Gem();
    temp1.Col = GameGrid[k][l].Col;
	temp1.Row = GameGrid[k][l].Row;


    GameGrid[k][l].Col = GameGrid[i][j].Col;
    GameGrid[k][l].Row = GameGrid[i][j].Row;

    GameGrid[i][j].Col = temp1.Col;
    GameGrid[i][j].Row = temp1.Row;

    GameGrid[k][l].Posneedx = GameGrid[i][j].X;
    GameGrid[k][l].Posneedy = GameGrid[i][j].Y;
    GameGrid[i][j].Posneedx = GameGrid[k][l].X;
    GameGrid[i][j].Posneedy = GameGrid[k][l].Y;

    if (firstswap)
    {
        GameGrid[k][l].Swaped = true;
        GameGrid[k][l].Swaped = true;
    }

    //GameFrames.Start();
}
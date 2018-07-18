class Gem {

	constructor (x, y){
		this.X = CONER_MARGIN + x * TILE_SIZE;
		this.Y = CONER_MARGIN + y * TILE_SIZE;
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

function InitGame(){
	GameGridCreate();
	Matches();
	   
}



function Matches(){
    FindMatches();

    let suc = FindCounts();    

    FillEmpty();

    NewTitles();

    draw();

    FindMatches();

    suc = FindCounts(); 
        
    if (suc) {
        Matches();
    }

    
}


function getRandomGem(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
    ctx.clearRect(0, 0, 512, 512);
	ctx.drawImage(bg, 0, 0);

	for (let i = 0; i < GAME_GRIDSIZE; i++) 
		for (let j = 0; j < GAME_GRIDSIZE; j++) {
			ctx.drawImage(GameGrid[i][j].Img, GameGrid[i][j].X, GameGrid[i][j].Y);
            if(GameGrid[i][j].Selected){
                ctx.beginPath();
                ctx.rect(GameGrid[i][j].X + 1 , GameGrid[i][j].Y + 1, TILE_SIZE - 1, TILE_SIZE - 1 );
                ctx.strokeStyle="white";
                ctx.stroke();
            }
		}


}

function FindMatches(){
	for(let i = 0; i <= GAME_GRIDSIZE - 1; i++){
		for (let j = 0; j <= GAME_GRIDSIZE - 1 ; j++){
			if (i !== 0 && i !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== UNDEF_KIND &&
				GameGrid[i][j].Kind === GameGrid[i + 1][j].Kind &&
				GameGrid[i][j].Kind === GameGrid[i - 1][j].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i + n][j].Count++;
				}
			}

			if (j !== 0 && j !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== UNDEF_KIND &&
				GameGrid[i][j].Kind === GameGrid[i][j + 1].Kind &&
				GameGrid[i][j].Kind === GameGrid[i][j - 1].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i][j + n].Count++;
				}
			}
		}
	}
}


function FindCounts(){
    let suc = false;
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++)
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++)
        {
            if (GameGrid[i][j].Count > 0)
            {
                suc = true;
                tile = GameGrid[i][j];
                tile.Kind = UNDEF_KIND;
                tile.Count= 0;
                ScoreUpdate();
            }
        }
    return suc;
}


function FillEmpty(){
    for(let i = 0; i <= GAME_GRIDSIZE - 1; i++)
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++)
        {
            if (GameGrid[i][j].Kind == UNDEF_KIND)
            {
                for (let k = i - 1; k >= 0; k--)
                {
                    if (GameGrid[k][j].Kind != UNDEF_KIND)
                    { 

                        
                    //GameGrid[k][j].NeedY = GameGrid[i][j].Y;                    
                    //GameGrid[i][j].Y = GameGrid[k][j].Y;
                    //GameGrid[i][j].Kind = GameGrid[k][j].Kind;
                    //GameGrid[k][j].Kind = UNDEF_KIND; 


                    temp = new Gem();    
                    temp.Kind = GameGrid[k + 1][j].Kind;
                    temp.Img = GameGrid[k + 1][j].Img;

                    GameGrid[k + 1][j].Kind = GameGrid[k][j].Kind;
                    GameGrid[k + 1][j].Img = GameGrid[k][j].Img;

                    GameGrid[k][j].Kind = temp.Kind;
                    GameGrid[k][j].Img = temp.Img;
                    //TODO
                    }
                }
            }
        }
}

function NewTitles(){
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++)
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++)
        {
            if (GameGrid[i][j].Kind == UNDEF_KIND)
            {
                GameGrid[i][j].Kind = getRandomGem(GEM_MINNUM, GEM_MAXNUM);
                GameGrid[i][j].Img =  FIGURE_ID[GameGrid[i][j].Kind];
                //GameGrid[i][j].Y = CONER_MARGIN;
                //GameGrid[i][j].Posneedy = CONER_MARGIN + i * TILE_SIZE;
                //TODO
            }
            
        }
}

function MouseDown(event) {
	let rect = cvs.getBoundingClientRect();

	let posX = event.clientX - rect.left;
	let posY = event.clientY - rect.top;

	let tile = GameGrid[(posY - (posY % TILE_SIZE)) / TILE_SIZE ][(posX - (posX % TILE_SIZE)) / TILE_SIZE];
	tile.Selected = true;
    
    
    draw();
    if (FirstSelectedTile === undefined){
        FirstSelectedTile = tile;     
    } else {
        CheckGrid(tile.Row, tile.Col)
    }    
}

function CheckGrid(k, l)
{
    let tile1 = FirstSelectedTile;
    let tile2 = GameGrid[k][l];
        
        
    if ( (Math.abs(tile1.Col - tile2.Col) == 0 && Math.abs(tile1.Row - tile2.Row) == 1 ) ||
         (Math.abs(tile1.Col - tile2.Col) == 1 && Math.abs(tile1.Row - tile2.Row) == 0 ) )
    {
        SwapTiles(tile1.Row, tile1.Col, tile2.Row, tile2.Col, true);
        tile1.Selected = false;
        tile2.Selected = false;
        FirstSelectedTile = undefined;
        draw();
    }
    else
    {
        tile1.Selected = false;
        tile2.Selected = false;
        FirstSelectedTile = undefined;
        draw();
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
    temp1.X = GameGrid[k][l].X;
    temp1.Y = GameGrid[k][l].Y;


    GameGrid[k][l].Col = GameGrid[i][j].Col;
    GameGrid[k][l].Row = GameGrid[i][j].Row;

    GameGrid[i][j].Col = temp1.Col;
    GameGrid[i][j].Row = temp1.Row;

   // GameGrid[k][l].NeedX = GameGrid[i][j].X;
   // GameGrid[k][l].NeedY = GameGrid[i][j].Y;
   // GameGrid[i][j].NeedX = GameGrid[k][l].X;
   // GameGrid[i][j].NeedY = GameGrid[k][l].Y;


    GameGrid[k][l].X = GameGrid[i][j].X;
    GameGrid[k][l].Y = GameGrid[i][j].Y;
    GameGrid[i][j].X = temp1.X;
    GameGrid[i][j].Y = temp1.Y;
    
    if (firstswap)
    {
        GameGrid[k][l].Swaped = true;
        GameGrid[k][l].Swaped = true;
    }

    FindMatches();
    let suc = FindCounts();    

    if(!FindCounts() && firstswap){    
        SwapTiles(i, j, k, l, false);    
    } else {
        Matches();
    }


    //TODO
}




function tileMoves(){
   let movefinish = false;

    for (let i = 0; i <= GRIDSIZE - 1; i++){

        for (let j = 0; j <= GRIDSIZE - 1; j++){
            if (GameGrid[i][j].Posneedx != GameGrid[i][j].X){
                if ((GameGrid[i][j].Posneedx - GameGrid[i][j].X) > 0){
                    GameGrid[i][j].X += TILE_SPEED;
                    movefinish = true;
                }
                else{
                    GameGrid[i][j].X -= TILE_SPEED;
                    movefinish = true;
                }
            }

            if (GameGrid[i][j].Posneedy != GameGrid[i][j].Y){
                if ((GameGrid[i][j].Posneedy - GameGrid[i][j].Y) > 0){
                    GameGrid[i][j].Y += TILE_SPEED;
                    movefinish = true;
                }
                else{
                    GameGrid[i][j].Y -= TILE_SPEED;
                    movefinish = true;
                }
            }
        }
    //TODO
    }
    return movefinish
}



function ScoreUpdate(){
    Score++;


    ScoreBoard.textContent = "";
    ScoreBoard.textContent = "Score: " + Score;
}
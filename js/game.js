function LVL_Load(lvl){
  GameGrid = LVL_LIST[lvl - 1].GG;
  GOAL = LVL_LIST[lvl - 1].lvlGOAL;
  LVL = LVL_LIST[lvl - 1].Level;
  Time = LVL_LIST[lvl - 1].Time;
}

function InitGame(){
    IsMenu = true;

    LVLFormer();
}

function NewGame(){
    Score = 0;
    LVL_Load(1);

    Timer = false;
    IsMoving = false;

    GoalLabel.textContent = "Goal: " + GOAL;
    LvlLabel.textContent = "Level: " + LVL;
    MoneyLabel.textContent = "Money: " + Money;

    FirstBonusCounts = 0;
    SecondBonusCounts = 0;
    ThirdBonusCounts = 0;

    Bonus1label.textContent = "Status: " + FirstBonusCounts + "/10";
    Bonus2label.textContent = "Status: " + SecondBonusCounts + "/10";
    Bonus3label.textContent = "Status: " + ThirdBonusCounts + "/10";



	Matches();

	IsCompany = true;
}

function EndlessGame(){
    Score = 0;
    LVL_Load(1);
    Timer = false;
    IsMoving = false;

    TimerLabel.textContent = "Time: UNLIMITED";
    GoalLabel.textContent = "Goal: None";
    LvlLabel.textContent = "Level: ENDLESS";
    MoneyLabel.textContent = "Money: " + Money;

    FirstBonusCounts = 0;
    SecondBonusCounts = 0;
    ThirdBonusCounts = 0;

    Bonus1label.textContent = "Status: " + FirstBonusCounts + "/10";
    Bonus2label.textContent = "Status: " + SecondBonusCounts + "/10";
    Bonus3label.textContent = "Status: " + ThirdBonusCounts + "/10";

    LVL_Load(1);

    Matches();

    IsEndless = true;
}

function NextLVL(){
    LVL++;
    Score = 0;
    LVL_Load(LVL);

    GoalLabel.textContent = "Goal: " + GOAL;
    LvlLabel.textContent = "Level: " + LVL;
    MoneyLabel.textContent = "Money: " + Money;

    FirstBonusCounts = 0;
    SecondBonusCounts = 0;
    ThirdBonusCounts = 0;

    Bonus1label.textContent = "Status: " + FirstBonusCounts + "/10";
    Bonus2label.textContent = "Status: " + SecondBonusCounts + "/10";
    Bonus3label.textContent = "Status: " + ThirdBonusCounts + "/10";

    Timer = false;
    IsMoving = false;


    Matches();
}

function Matches(){
    let suc = false;

    FindMatches();

    suc = FindCounts();    

    FillEmpty();

    NewTitles();    
 
    NewImages();
        
    if (!suc) {
        IsMoving = false;
        Timer = false;
    }

    return suc;
}

function ChangeStyle(num) {

    switch(num){
        case 0:
            StylePack = num;

            NewImages();
            draw();
            break;
        case 1:
            if(!SecondGoodBought){
                if (Money >= 50){
                    SecondGoodBought = true;
                    Money -= 50;

                    GBut1.textContent = "Naruto Pack";
                    MoneyLabel.textContent = "Money: " + Money;
                }

            } else {
                StylePack = num;

                NewImages();
                draw();
            }


            break;
        case 2:
            if(!ThirdGoodBought){
                if (Money >= 50){
                    ThirdGoodBought = true;
                    Money -= 50;

                    GBut2.textContent = "Shaman King Pack";
                    MoneyLabel.textContent = "Money: " + Money;
                }

            } else {
                StylePack = num;
                NewImages();
                draw();
            }
            break;
        case 3:
            if(!FourthGoodBought){
                if (Money >= 100){
                    FourthGoodBought = true;
                    Money -= 100;

                    GBut3.textContent = "Ultimate Pack";
                    MoneyLabel.textContent = "Money: " + Money;
                }
            } else {
                StylePack = num;
                NewImages();
                draw();
            }
            break;
    }

}

function getRandomGem(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
    ctx.clearRect(0, 0, 512, 512);
	ctx.drawImage(bg, 0, 0);

	for (let i = 0; i < GAME_GRIDSIZE; i++) {
		for (let j = 0; j < GAME_GRIDSIZE; j++) {
			ctx.drawImage(GameGrid[i][j].Img, GameGrid[i][j].X, GameGrid[i][j].Y);
            if(GameGrid[i][j].Selected){
                ctx.beginPath();
                ctx.rect(GameGrid[i][j].X + 1 , GameGrid[i][j].Y + 1, TILE_SIZE - 1, TILE_SIZE - 1 )
                ctx.lineWidth = 2;
                ctx.strokeStyle="white";
                ctx.stroke();
            }
		}
    }
}

function FindMatches(){
	for(let i = 0; i <= GAME_GRIDSIZE - 1; i++){
		for (let j = 0; j <= GAME_GRIDSIZE - 1 ; j++){
			if (i !== 0 && i !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== UNDEF_KIND &&
                GameGrid[i][j].Kind !== BLOCK_KIND &&
				GameGrid[i][j].Kind === GameGrid[i + 1][j].Kind &&
				GameGrid[i][j].Kind === GameGrid[i - 1][j].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i + n][j].Count++;
                    if(!BonusUsing){
                        if (GameGrid[i + n][j].Kind === 1) {
                            FirstBonusCounts++;
                            Bonus1label.textContent = "Status: " + FirstBonusCounts + "/10";
                            if (FirstBonusCounts > 10){
                                Bonus1label.textContent = "Ready";
                            }
                        }

                        if (GameGrid[i + n][j].Kind === 2) {
                            SecondBonusCounts++;
                            Bonus2label.textContent = "Status: " + SecondBonusCounts + "/10";
                            if (SecondBonusCounts > 10){
                                Bonus2label.textContent = "Ready";
                            }
                        }

                        if (GameGrid[i + n][j].Kind === 3) {
                            ThirdBonusCounts++;
                            Bonus3label.textContent = "Status: " + ThirdBonusCounts + "/10";
                            if (ThirdBonusCounts > 10){
                                Bonus3label.textContent = "Ready";
                            }
                        }
                    }
				}
			}

			if (j !== 0 && j !== GAME_GRIDSIZE - 1 &&
				GameGrid[i][j].Kind !== UNDEF_KIND &&
                GameGrid[i][j].Kind !== BLOCK_KIND &&
				GameGrid[i][j].Kind === GameGrid[i][j + 1].Kind &&
				GameGrid[i][j].Kind === GameGrid[i][j - 1].Kind ){
				for (let n = -1; n <= 1; n++){
					GameGrid[i][j + n].Count++;
                    if(BonusUsing){
                        if (GameGrid[i][j + n].Kind === 1) {
                            FirstBonusCounts++;
                            Bonus1label.textContent = "Status: " + FirstBonusCounts + "/10";
                            if (FirstBonusCounts > 10){
                                Bonus1label.textContent = "Ready";
                            }
                        }

                        if (GameGrid[i][j + n].Kind === 2) {
                            SecondBonusCounts++;
                            Bonus2label.textContent = "Status: " + SecondBonusCounts + "/10";
                            if (SecondBonusCounts > 10){
                                Bonus2label.textContent = "Ready";
                            }
                        }

                        if (GameGrid[i][j + n].Kind === 3) {
                            ThirdBonusCounts++;
                            Bonus3label.textContent = "Status: " + ThirdBonusCounts + "/10";
                            if (ThirdBonusCounts > 10){
                                Bonus3label.textContent = "Ready";
                            }
                        }
                    }
				}
			}
		}
	}
}

function FindCounts(){
    let suc = false;
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
            if (GameGrid[i][j].Count > 0) {
                suc = true;
                tile = GameGrid[i][j];
                tile.Kind = UNDEF_KIND;

                ScoreUpdate(tile.Count);

                if (tile.Count > 1) {
                    Time++;
                }

                tile.Count= 0;
            }
        }
    }

    return suc;
}

function FillEmpty(){
    for(let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
            if (GameGrid[i][j].Kind == UNDEF_KIND) {
                for (let k = i - 1; k >= 0; k--) {
                    if (GameGrid[k][j].Kind != UNDEF_KIND && GameGrid[k][j].Kind !== BLOCK_KIND) {

                        GameGrid[k+1][j].Y = GameGrid[k][j].Y;
                        GameGrid[k+1][j].Kind = GameGrid[k][j].Kind;
                        GameGrid[k][j].Kind = UNDEF_KIND; 

                        Timer = true;
                    }
                }
            }
        }
    }
}

function NewTitles() {
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
            if (GameGrid[i][j].Kind === UNDEF_KIND) {
                GameGrid[i][j].Kind = getRandomGem(GEM_MINNUM, GEM_MAXNUM);
                GameGrid[i][j].Img =  FIGURE_ID[StylePack][GameGrid[i][j].Kind];
                GameGrid[i][j].Y = -64;
                GameGrid[i][j].NeedY = CONER_MARGIN + i * TILE_SIZE;

                Timer = true;
            }
        }
    }
}

function Bonus1(kind) {   
    if (FirstBonusCounts > 10) { 
        for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
            for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
                if(GameGrid[i][j].Kind === kind) {
                    GameGrid[i][j].Count++;
                }            
            }
        }

        FirstBonusCounts = 0;

        Bonus1label.textContent = "Status: " + FirstBonusCounts + "/10";

        Matches();
    }    
}

function Bonus2(col, row) {
    if (SecondBonusCounts > 10) {
        for (let i = 0; i <= GAME_GRIDSIZE - 1; i++){
            if(GameGrid[i][col].Kind != BLOCK_KIND){
                GameGrid[i][col].Count++;
            }
        }

        for (let i = 0; i <= GAME_GRIDSIZE - 1; i++){
            if(GameGrid[row][i].Kind != BLOCK_KIND){
                GameGrid[row][i].Count++;
            }
        }

        SecondBonusCounts = 0;

        Bonus2label.textContent = "Status: " + SecondBonusCounts + "/10";

        Matches();
    }  
}

function Bonus3() {
    if (ThirdBonusCounts > 10) {
        for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
            for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
                if(GameGrid[i][j].Kind != BLOCK_KIND){
                    GameGrid[i][j].Count++;
                }    
            }
        }

        ThirdBonusCounts = 0;

        Bonus3label.textContent = "Status: " + ThirdBonusCounts + "/10";

        Matches();
    }    
}

function UseBonus(bonusNum){
    BonusNum = bonusNum;

    
    BonusUsing = true;
}

function MouseMove(event) {

    let rect = cvs.getBoundingClientRect();

    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;

    if (IsMenu) {
        if (IsCredits) {
            if (posX >= BackBut.x1 && posX <= BackBut.x2 && posY >= BackBut.y1 && posY <= BackBut.y2) {
                ButSelectionOff();
                BBSelected = true
            } else ButSelectionOff()
        } else {
            if (posX >= NewGameBut.x1 && posX <= NewGameBut.x2 && posY >= NewGameBut.y1 && posY <= NewGameBut.y2) {
                ButSelectionOff();
                NGBSelected = true;
            } else
            if (posX >= EndlessModBut.x1 && posX <= EndlessModBut.x2 && posY >= EndlessModBut.y1 && posY <= EndlessModBut.y2) {
                ButSelectionOff();
                EMBSelected = true;
            } else
            if (posX >= CreditsBut.x1 && posX <= CreditsBut.x2 && posY >= CreditsBut.y1 && posY <= CreditsBut.y2) {
                ButSelectionOff();
                CBSelected = true;

            } else ButSelectionOff()


        }
    }
}

function MouseDown(event) {
if (!IsMoving) {     
        let rect = cvs.getBoundingClientRect();

        let posX = event.clientX - rect.left;
        let posY = event.clientY - rect.top;


        if (IsMenu){
            if (IsCredits){
                if(posX >= BackBut.x1 && posX <= BackBut.x2 && posY >= BackBut.y1 && posY <= BackBut.y2){
                    IsCredits = false;
                }
            } else {
                if(posX >= NewGameBut.x1 && posX <= NewGameBut.x2 && posY >= NewGameBut.y1 && posY <= NewGameBut.y2){
                    NewGame(50, 1);
                    IsMenu = false;
                }

                if(posX >= EndlessModBut.x1 && posX <= EndlessModBut.x2 && posY >= EndlessModBut.y1 && posY <= EndlessModBut.y2){
                    EndlessGame();
                    IsMenu = false;
                }

                if(posX >= CreditsBut.x1 && posX <= CreditsBut.x2 && posY >= CreditsBut.y1 && posY <= CreditsBut.y2){
                    ShowCredits();
                    IsCredits = true;
                }
            }
        } else {
            let tile = GameGrid[(posY - (posY % TILE_SIZE)) / TILE_SIZE ][(posX - (posX % TILE_SIZE)) / TILE_SIZE];
            if (tile.Kind != BLOCK_KIND) {
                if (BonusUsing) {
                    switch (BonusNum) {
                        case 1:
                            Bonus1(tile.Kind);
                            break;
                        case 2:
                            Bonus2(tile.Col, tile.Row);
                            break;
                        case 3:
                            Bonus3();
                            break;
                    }

                    BonusUsing = false;

                } else {
                    tile.Selected = true;

                    CheckGrid(tile.Row, tile.Col);
                    draw();
                }
            }
        }
    }
}

function CheckGrid(k, l) {
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
            let title1 = GameGrid[i][j];
            let title2 = GameGrid[k][l];
                      
            if (title1.Row !== k || title1.Col !== l) {
                if (title1.Selected) {
                    if (title1.Row < GAME_GRIDSIZE - 1 && GameGrid[title1.Row + 1][title1.Col].Selected ||
                        title1.Row > 0 && GameGrid[title1.Row - 1][title1.Col].Selected ||
                        title1.Col < GAME_GRIDSIZE - 1 && GameGrid[title1.Row][title1.Col + 1].Selected ||
                        title1.Col > 0 && GameGrid[title1.Row][title1.Col - 1].Selected) {
                        
                        title1.Selected = false;
                        title2.Selected = false;

                        SwapTiles(i, j, k, l, true); 

                        draw();
                    } else {
                        title1.Selected = false;
                        title2.Selected = false;

                        draw();
                    }
                }
            }
        }
    }
}

function SwapTiles(i, j, k, l, firstswap) {
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

    GameGrid[k][l].NeedX = GameGrid[i][j].X;
    GameGrid[k][l].NeedY = GameGrid[i][j].Y;
    GameGrid[i][j].NeedX = GameGrid[k][l].X;
    GameGrid[i][j].NeedY = GameGrid[k][l].Y;

    
    if (firstswap) {
        GameGrid[i][j].Swaped = true;
        GameGrid[k][l].Swaped = true;
    }

    Timer = true;
}

function TileMoves(){
   let movefinish = false;

    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++){
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++){
            if (GameGrid[i][j].NeedX != GameGrid[i][j].X){
                if ((GameGrid[i][j].NeedX - GameGrid[i][j].X) > 0){
                    GameGrid[i][j].X += TILE_SPEED;

                    movefinish = true;
                }else {
                    GameGrid[i][j].X -= TILE_SPEED;

                    movefinish = true;
                }
            }

            if (GameGrid[i][j].NeedY != GameGrid[i][j].Y){
                if ((GameGrid[i][j].NeedY - GameGrid[i][j].Y) > 0){
                    GameGrid[i][j].Y += TILE_SPEED;

                    movefinish = true;
                } else {
                    GameGrid[i][j].Y -= TILE_SPEED;

                    movefinish = true;
                }
            }
        }    
    }

    draw();

    return movefinish
}

function NewImages(){
    for (let i = 0; i <= GAME_GRIDSIZE - 1; i++){
        for (let j = 0; j <= GAME_GRIDSIZE - 1; j++){
            GameGrid[i][j].Img = FIGURE_ID [StylePack][GameGrid[i][j].Kind];
        }
    }        
}

function ScoreUpdate(scr){
    Score+= scr;

    ScoreBoard.textContent = "";
    ScoreBoard.textContent = "Score: " + Score;
}



var TimerID = setInterval(function(){
    if (IsMenu){
        if (IsCredits){
            ShowCredits();
        } else {
            DrawMenu()
        }
    }

    if (Timer){
        IsMoving = true;

        TileMoves();
        if (!TileMoves()) {            
            if (!Matches()) {
                let a = -1, b = -1, k = -1, l = -1; 
                
                /* Find Swaped elements and write their pos in a, b, k, l  */
                for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
                    for (let j = 0; j <= GAME_GRIDSIZE - 1; j++){
                        if (GameGrid[i][j].Swaped) {
                            if (a === -1 && b === -1) {
                                a = i;
                                b = j;
                            } else {
                                k = i;
                                l = j;
                            }
                        }
                    }
                }

                if (a !== -1 && b !== -1 && k !== -1 && l !== -1) {                        
                    Timer = false;
                    IsMoving = false;

                    GameGrid[a][b].Swaped = false;
                    GameGrid[k][l].Swaped = false;

                    SwapTiles(a, b, k, l, false);
                }
            } else {
                for (let i = 0; i <= GAME_GRIDSIZE - 1; i++) {
                    for (let j = 0; j <= GAME_GRIDSIZE - 1; j++) {
                        if (GameGrid[i][j].Swaped) {
                            GameGrid[i][j].Swaped = false;
                        }
                    }
                }
            }                
        }
    }             

}, 1000/120);
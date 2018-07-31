var NewGameBut = new Image();
var EndlessModBut = new Image();
var CreditsBut = new Image();
var Credits = new Image();
var BackBut = new Image();

NewGameBut.src =  "menu/ngb.png";
NewGameBut.x1 = 156;
NewGameBut.x2 = 356;
NewGameBut.y1 = 100;
NewGameBut.y2 = 150;
NGBSelected = false;

EndlessModBut.src = "menu/emb.png";
EndlessModBut.x1 = 156;
EndlessModBut.x2 = 356;
EndlessModBut.y1 = 200;
EndlessModBut.y2 = 250;
EMBSelected = false;

CreditsBut.src = "menu/cb.png";
CreditsBut.x1 = 156;
CreditsBut.x2 = 356;
CreditsBut.y1 = 300;
CreditsBut.y2 = 350;
CBSelected = false;

Credits.src = "menu/Credits.png";
Credits.x1 = 0;
Credits.x2 = 512;
Credits.y1 = 0;
Credits.y2 = 512;

BackBut.src = "menu/bb.png";
BackBut.x1 = 156;
BackBut.x2 = 356;
BackBut.y1 = 400;
BackBut.y2 = 450;
BBSelected = false;

function DrawMenu() {
    ctx.clearRect(0, 0, 512, 512);
    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(NewGameBut, NewGameBut.x1, NewGameBut.y1 );
    ctx.drawImage(EndlessModBut, EndlessModBut.x1, EndlessModBut.y1 );
    ctx.drawImage(CreditsBut, CreditsBut.x1, CreditsBut.y1 )
    if (EMBSelected){
        ctx.beginPath();
        ctx.rect(EndlessModBut.x1, EndlessModBut.y1, EndlessModBut.x2 - EndlessModBut.x1, EndlessModBut.y2 - EndlessModBut.y1);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "#BB0060";
        ctx.stroke();
    }

    if (CBSelected){
        ctx.beginPath();
        ctx.rect(CreditsBut.x1, CreditsBut.y1, CreditsBut.x2 - CreditsBut.x1, CreditsBut.y2 - CreditsBut.y1);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "#BB0060";
        ctx.stroke();
    }

    if (NGBSelected){
        ctx.beginPath();
        ctx.rect(NewGameBut.x1, NewGameBut.y1, NewGameBut.x2 - NewGameBut.x1, NewGameBut.y2 - NewGameBut.y1);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "#BB0060";
        ctx.stroke();
    }
}

function ShowCredits() {
    ctx.clearRect(0, 0, 512, 512);
    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(Credits, Credits.x1, Credits.y1 );
    ctx.drawImage(BackBut, BackBut.x1, BackBut.y1 );

    if (BBSelected){
        ctx.beginPath();
        ctx.rect(BackBut.x1, BackBut.y1, BackBut.x2 - BackBut.x1, BackBut.y2 - BackBut.y1);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "#BB0060";
        ctx.stroke();
    }
}

function ButSelectionOff() {
    NGBSelected = false;
    EMBSelected = false;
    BBSelected = false;
    CBSelected = false;
}
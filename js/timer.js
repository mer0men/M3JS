var GAMETIMER = setInterval(function(){
	if(!IsMenu) {
		if(IsCompany){
			Time -= 1;
			TimerLabel.textContent = "Time: " + Time;
			if (Time === 0) {
				alert("Вы проиграли");
				NewGame();
			}

			if (Score >= GOAL) {
				alert("Вы выиграли!!");
				Money += 20 + Math.floor(Score / 10);
				MoneyLabel.textContent = "Money: " + Money;
				NextLVL();
			}
		}
    }
}, 1000)
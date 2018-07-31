var GAMETIMER = setInterval(function(){
	if(!IsMenu) {
		if(IsCompany){
			Time -= 1;
			TimerLabel.textContent = "Time: " + Time;
			if (Time === 0) {
				alert("Вы проиграли");
				IsCompany = false;
				InitGame();
			}

			if (Score >= GOAL) {
				alert("Вы выиграли!!");
				Money += LVL_LIST[LVL - 1].Reward;
				MoneyLabel.textContent = "Money: " + Money;
				NextLVL();
			}
		}
    }
}, 1000)
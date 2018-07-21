var GAMETIMER = setInterval(function(){

	Time -= 1;
	TimerLabel.textContent = "Time: " + Time;
	if (Time === 0){
		alert("вы проиграли");
		GlobalScore = 0;
		NewGame(50, 1);
	} 

	if (Score >= GOAL){
		GOAL*=2;
		LVL++;
		alert("Вы выиграли!!");
		GlobalScore+=Score;
		Money += 20 + Math.floor(Score / 10);
		MoneyLabel.textContent = "Money: " + Money;
		NewGame(GOAL, LVL);
	}

}, 1000)
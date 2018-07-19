var GAMETIMER = setInterval(function(){

	Time -= 1;
	TimerLabel.textContent = "Time: " + Time;
	if (Time === 0){
		alert("вы проиграли");
		NewGame(50, 1);
	} 

	if (Score >= GOAL){
		GOAL*=2;
		LVL++;
		alert("Вы выиграли!!");
		NewGame(GOAL, LVL);
	}

}, 1000)
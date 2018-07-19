var audio = new Audio();
audio.src = 'music/MainTheme.ogg';

function soundOn() {
	
	audio.play();
}

function soundOff() {
	 
	audio.pause();
}
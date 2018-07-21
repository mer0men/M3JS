var audio = new Audio();
audio.src = 'music/MainTheme.ogg';
var music = document.getElementById("music");


function soundOn() {
	
	audio.play();
}

function soundOff() {
	 
	audio.pause();
}

function MusicSwitch(){



	if(music.checked == true){
		audio.play();
	} else{
		audio.pause();
	}

}
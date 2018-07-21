var audio = new Audio();
audio.src = 'music/MainTheme.ogg';
var music = document.getElementById("music");

function MusicSwitch(){
	if(music.checked == true){
		audio.play();
	} else{
		audio.pause();
	}

}
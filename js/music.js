var audio = new Audio();
audio.src = 'music/MainTheme.ogg';
var cb = document.getElementById("music")
function soundOn() {
	audio.play();
}

function soundOff() {
	audio.pause();
}
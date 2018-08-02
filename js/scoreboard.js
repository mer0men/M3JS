let database;
let ref;
let data;
let inputHeader;
let outputHeader;
let saveHeader;

database = firebase.database();
ref = database.ref('scores');

inputHeader = document.getElementById("LatestScore");
saveHeader = document.getElementById("SaveButton");

saveHeader.addEventListener("click", function() { 

	const textToSave = inputHeader.value;  

	data = {

		name: textToSave,
		score: Score

	}

	ref.push(data);
});

ref.on('value', gotData, errData);

function gotData(data) {
	

	let scorelistings;

	scorelistings = selectAll('.scorelisting');

 	for (let i = 0; i < scorelistings.length; i++) {

 	scorelistings[i].remove();

    }

	let scores;
	let keys;

	scores = data.val();
	keys = Object.keys(scores);

	for (let i = 0; i < keys.length; i++) {

		let k;
		let name;
		let score;
		let li;


		k = keys[i];
		name = scores[k].name;
		score = scores[k].score;
		li = createElement('li', name + ': ' + score);

		li.class('scorelisting');
		li.parent('OutputScore');

	}
}

function errData(err) {
	
	console.log('Error!');
	console.log(err);

}
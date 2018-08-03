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

	if (textToSave !== '') {

		data = {

			name: textToSave,
			score: GlobalScore		

		}

	} else {

		data = {

			name: "UNKNOWN",
			score: GlobalScore

		}
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

	let values = [];

	for (var i = 0; i < keys.length; i++) {

		let k;

		k = keys[i];
		
		values.push(scores[k]);

	}

    bubbleSort(values);

	for (let i = 0; i < 10; i++) {

		let name;
		let score;
		let li;

		name = values[i].name;
		score = values[i].score;

		li = createElement('li', name + ': ' + score);

		li.class('scorelisting');
		li.parent('OutputScore');

	}
}

function errData(err) {
	
	console.log('Error!');
	console.log(err);

}

function bubbleSort(a)
{
    let swapped;

    do {

        swapped = false;

        for (let i=0; i < a.length-1; i++) {

            if (a[i].score < a[i+1].score) {

                let temp = a[i];

                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;

            }
        }

    } while (swapped);
}
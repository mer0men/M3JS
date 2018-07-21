var config = {
	apiKey: "AIzaSyAnE7ox1PWprAcBg8nSyqPC92sQvwpu16A",
	authDomain: "match3scoreboard-c6dd8.firebaseapp.com",
	databaseURL: "https://match3scoreboard-c6dd8.firebaseio.com",
	projectId: "match3scoreboard-c6dd8",
	storageBucket: "match3scoreboard-c6dd8.appspot.com",
	messagingSenderId: "217806210111"
};

firebase.initializeApp(config);
var firestore = firebase.firestore();

const docRef = firestore.doc("samples/ScoreData");
const outputHeader = document.getElementById("ScoreOutput");
const inputHeader = document.getElementById("LatestScore");
const saveHeader = document.getElementById("SaveButton");

saveHeader.addEventListener("click", function() {
	const textToSave = inputHeader.value;
	console.log("User: " + textToSave + ": " + GlobalScore);
	docRef.add({
		Name: textToSave,
		Score: GlobalScore
	}).then(function(docRef) {
		console.log("Score saved!");
	}).catch(function(error) {
		console.log("Error adding score: ", error);
	});
})

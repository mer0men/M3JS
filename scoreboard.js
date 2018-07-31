var config = {
    apiKey: "AIzaSyCLnj-k3yNzkBM8ByCuJrexF2AwGnn_Q-c",
    authDomain: "match3-319b8.firebaseapp.com",
    databaseURL: "https://match3-319b8.firebaseio.com",
    projectId: "match3-319b8",
    storageBucket: "",
    messagingSenderId: "382102288431"
};

var firestore;

firebase.initializeApp(config);
firestore = firebase.firestore();

const docRef = firestore.doc("samples/ScoreData");
const inputHeader = document.getElementById("LatestScore");
const saveHeader = document.getElementById("SaveButton");
//const loadHeader = document.getElementById("LoadButton");
const outputHeader = document.getElementById("OutputScore");

saveHeader.addEventListener("click", function() {

    const textToSave = inputHeader.value;

    console.log("User: " + textToSave + ": " + GlobalScore);

    docRef.set ({

        Name: textToSave,
        Score: GlobalScore

    }).then(function() {

        console.log("Score saved!");

    }).catch(function(error) {

        console.log("Error adding score: ", error);

    });
});

// loadHeader.addEventListener("click", function () {
//
//     docRef.get().then(function(doc) {
//
//         if (doc && doc.exists) {
//
//             const myData = doc.data();
//             outputHeader.innerText = myData.Name + ": "+ myData.Score;
//
//         }
//
//     }).catch(function(error) {
//
//         console.log("Error adding score: ", error);
//
//     });
// });

getRealtimeUpdates = function () {

    docRef.onSnapshot(function (doc) {

        if (doc && doc.exists) {

            const myData = doc.data();
            outputHeader.innerText = myData.Name + ": "+ myData.Score;

        }

    })
};

getRealtimeUpdates();
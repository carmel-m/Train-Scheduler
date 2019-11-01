// add document.on(ready)

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDvXoTXktnheH3slTb32CVS9RNADbuCDl8",
    authDomain: "carmel-s-app.firebaseapp.com",
    databaseURL: "https://carmel-s-app.firebaseio.com",
    projectId: "carmel-s-app",
    storageBucket: "carmel-s-app.appspot.com",
    messagingSenderId: "224712573983",
    appId: "1:224712573983:web:81d39ec9c8248a1bdf412a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

var currentTime = moment().format("HH:mm");
// console.log(currentTime);

// start of on click
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    console.log("submit clicked");
    sendToFirebase();
});


function sendToFirebase() {
    console.log("send to firebase function")
    // get value from input fields
    var trainInput = $("#train-input").val().trim();
    var destInput = $("#dest-input").val().trim();
    var firstInput = $("#first-input").val().trim();
    var freqInput = $("#freq-input").val().trim();

    console.log(trainInput, destInput, firstInput, freqInput);

    // For firebase
    database.ref().push({
        train: trainInput,
        destination: destInput,
        first: firstInput,
        frequency: freqInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    // clear input boxes after submit button is clicked
    $("#train-input").val("");
    $("#dest-input").val("");
    $("#first-input").val("");
    $("#freq-input").val("");
};

database.ref().on("child_added", function (childSnapshot) {

    //console log everything coming out of childSnapshot
    console.log(childSnapshot);

    // store data
    var train = childSnapshot.val().train;
    var dest = childSnapshot.val().destination;
    var first = childSnapshot.val().first;
    var freq = childSnapshot.val().frequency;

    var firstConvert = moment(first, "HH:mm").subtract(1, "years");

    var timeDiff = moment().diff(moment(firstConvert), "minutes");
    // console.log(timeDiff);

    var lastTrain = timeDiff % freq;
    // console.log("last train: " + lastTrain);

    var timeRemain = freq - lastTrain;
    // console.log("time remaining: " + timeRemain);

    var nextTrain = moment().add(timeRemain, "minutes");
    nextTrainConvert = moment(nextTrain).format("HH:mm");
    // console.log("next train: " + nextTrainConvert);

    // add everything into the table
    $("#table-body").append(
        "<tr><td class='train-display'>" + train +
        "</td><td class='dest-display'>" + dest +
        "</td><td class='freq-display'>" + freq + 
        "</td><td class='next-train-display'>" + nextTrainConvert +
        "</td><td class='mins-away-display'>" + timeRemain + "</td></tr>"
    );

    // handle errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


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

var trainInput = "";
var destInput = "";
var firstInput = "";
var freqInput = "";


// start of on click
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    sendToFirebase();
});

function sendToFirebase() {

    // get value from input fields
    var trainInput = $("#train-input").val().trim();
    var destInput = $("#dest-input").val().trim();
    var firstInput = $("#first-input").val().trim();
    var freqInput = $("#freq-input").val().trim();

    console.log(trainInput, destInput, firstInput, freqInput);

    // FOR FIREBASE
    database.ref().push({
        train: trainInput,
        destination: destInput,
        first: firstInput,
        frequency: freqInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

};

// clear input boxes after submit button is clicked
$("#train-input").val("");
$("#dest-input").val("");
$("#first-input").val("");
$("#freq-input").val("");

database.ref().on("child_added", function (childSnapshot) {

    
    //console log everything coming out of childSnapshot

    // add everything into the table




    // handle errors
}, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
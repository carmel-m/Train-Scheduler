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
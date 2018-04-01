var firebase = require("firebase");

var config = {
    apiKey: config.firebase_api_key,
    authDomain: "localpol-c2a9b.firebaseapp.com",
    databaseURL: "https://localpol-c2a9b.firebaseio.com",
    projectId: "localpol-c2a9b",
    storageBucket: "localpol-c2a9b.appspot.com",
    messagingSenderId: "393583030469"
};
firebase.initializeApp(config);

var database = firebase.database();
var config = require("../../config.js");


var fb_config = {
    apiKey: config.keys.firebase_api_key,
    authDomain: "localpol-c2a9b.firebaseapp.com",
    databaseURL: "https://localpol-c2a9b.firebaseio.com",
    projectId: "localpol-c2a9b",
    storageBucket: "localpol-c2a9b.appspot.com",
    messagingSenderId: "393583030469"
};
firebase.initializeApp(fb_config);

var database = firebase.database();

function update_elections(electionId, title, level, type, state) {
  firebase.database().ref('elections/' + electionId).set({
    title: title,
    level: level,
    type: type,
    state : state
  });
}
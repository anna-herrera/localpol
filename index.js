var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

var firebase = require("firebase");
var config = require("./config.js");
var request = require("request");

console.log(config.keys.usvote_api_token);
//console.log(config)

var options = {
  url: 'https://localelections.usvotefoundation.org/api/v1/elections?election_level_id=7',
  headers: {
    'Authorization': 'Token ' + config.keys.usvote_api_token
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
  } else {
    console.log(error);
  }
}

request(options, callback);

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

function writeElectionData(electionId, title, level, type, state) {
  firebase.database().ref('elections/' + electionId).set({
    title: title,
    level: level,
    type: type,
    state : state
  });
}


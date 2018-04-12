var config = require('../config');
var firebase = require('firebase');

var config_fb = {
    apiKey: config.keys.firebase_api_key,
    authDomain: "localpol-c2a9b.firebaseapp.com",
    databaseURL: "https://localpol-c2a9b.firebaseio.com",
    projectId: "localpol-c2a9b",
    storageBucket: "localpol-c2a9b.appspot.com",
    messagingSenderId: "393583030469"
};

firebase.initializeApp(config_fb);

var database = firebase.database();

function writeElection(title, state, type, level, date, otherDates) {
    var electionData = {
        title: title,
        state: state,
        type: type,
        level: level,
        date: date,
        otherDates: otherDates
    };

    var newElectionKey = firebase.database().ref().child('elections').push().key;

    var updates = {};

    updates['/elections/' + newElectionKey] = electionData;
    
    return firebase.database().ref().update(updates);
};

function readElections() {
    return firebase.database().ref('/elections');
};

module.exports.writeElection = writeElection;
module.exports.readElections = readElections;
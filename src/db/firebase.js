var config = require('../config');
var admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var config = require("../config.js");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(config.keys.firebase_api_key),
  databaseURL: "https://localpol-c2a9b.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/Elections");


function writeElection(title, state, type, level, date, otherDates) {
    var electionData = {
        title: title,
        state: state,
        type: type,
        level: level,
        date: date,
        otherDates: otherDates
    };

    var newElectionKey = ref.push().key;

    var updates = {};

    updates['/Elections/' + newElectionKey] = electionData;
    
    return db.ref().update(updates);
};

function readElections() {
    ref.once("value").then(function(snapshot) {
        //console.log(snapshot.val());
        return(snapshot.val());
    });
};



module.exports.writeElection = writeElection;
module.exports.readElections = readElections;
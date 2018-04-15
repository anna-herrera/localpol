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
var testElectionsRef = db.ref("/Elections2");


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

/* testing set elections DON'T USE ON REF!!! */
function setElections() {
    var dummyData = {
        election_date : "2018-09-30",
        level : "City",
        state : "Vermont",
        title : "Montpelier Election",
        type : "Party Precinct Caucus"
    }
    testElectionsRef.set(dummyData);
}

/* returns a promise to read new elections */
function readElectionsPromise() {
    return new Promise(function(resolve, reject) {
        ref.once("value", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        })
        //console.log(snapshot.val());
    });
};


/* read elections once and print */
function readElections() {
    testElectionsRef.once("value", function(snapshot) {
        console.log(snapshot.val());
    })
}

/* testing constant printing of updated data */
function constantReadElections() {
    testElectionsRef.on("value", function(snapshot) {
        console.log(snapshot.val());
    })
}

/* testing basic querying */
function queryState() {
    console.log("Something");
    var ref = db.ref("/Elections");
    ref.orderByChild("state").equalTo("California").on("child_added", function(snapshot) {
        console.log("some state");
        console.log(snapshot.val());
    });
        //console.log(snapshot.val());
}

/* 
    return a promise listing the elections in a given state 
    takes in state, a string parameter
*/
function queryByState(state) {
    return new Promise(function(resolve, reject) {
        var electionsRef = db.ref("Elections");
        ref.orderByChild("state").equalTo(state).on("child_added", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        });
    });
}

function querySpecificElection(key) {
    return new Promise(function(resolve, reject) {
        var election = db.ref("/Elections").child(key);
        election.once("value", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        })
        //console.log(snapshot.val());
    });
}




module.exports.writeElection = writeElection;
module.exports.readElections = readElections;
module.exports.setElections = setElections;
module.exports.readElectionsPromise = readElectionsPromise;
module.exports.constantReadElections = constantReadElections;
module.exports.queryState = queryState;
module.exports.querySpecificElection = querySpecificElection;
module.exports.queryByState = queryByState;

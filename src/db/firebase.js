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
        otherDates: otherDates,
        candidates: null
    };

    var newElectionKey = ref.push().key;

    var updates = {};

    updates['/Elections/' + newElectionKey] = electionData;
    
    return db.ref().update(updates);
};

function writeUser(uid, email) {
    var userData = {
        uid: uid,
        email: email
    };

    var newUserKey = db.ref('/Users').push().key;

    var updates = {};

    updates['/Users/' + newUserKey] = userData;
    
    return db.ref().update(updates);
};

function writeCandidate(electionIds, name, bio, platform) {
    var candidateData = {
        name: name,
        bio: bio,
        platform: platform,
        electionIds: electionIds
    };

    var newCandidateKey = db.ref("/Candidates").push().key;

    var updates = {};

    updates['/Candidates/' + newCandidateKey] = candidateData;
    for (var i in electionIds) {
        //console.log('/Elections/' + electionIds[i] + '/candidates/' + newCandidateKey);
        updates['/Elections/' + electionIds[i] + '/candidates/' + newCandidateKey] = name;
    };
    
    return db.ref().update(updates);
};


function writeState(state) {
    var newStateKey = db.ref("/States").push().key;

    var updates = {};

    updates['/States/' + newStateKey] = { name: state};
    
    return db.ref().update(updates);
};

/* testing set elections DON'T USE ON REF!!! */
function setElections() {
    db.ref("/Elections").set(null);
}

function setCandidates() {
    db.ref("/Candidates").set(null);
}

function setStates() {
    db.ref("/States").set(null);
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
        });
    });
};


function readStatesPromise() {
    return new Promise(function(resolve, reject) {
        db.ref("/States").once("value", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        })
    });
};

/* 
    return a promise listing the elections in a given state 
    takes in state, a string parameter
*/
function queryByState(state) {
    return new Promise(function(resolve, reject) {
        var electionsRef = db.ref("/Elections");
        electionsRef.orderByChild("state").equalTo(state).on("value", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        });
    });
}

function queryByTitle(title) {
    return new Promise(function(resolve, reject) {
        var electionsRef = db.ref("/Elections");
        electionsRef.orderByChild("title").equalTo(title).on("value", function(snapshot) {
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
    });
}

function querySpecificCandidate(key) {
    return new Promise(function(resolve, reject) {
        var candidate = db.ref("/Candidates").child(key);
        candidate.on("value", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        })
    });
}

function queryUserProfile(key) { 
    return new Promise(function(resolve, reject) {
        var candidate = db.ref("/UserToCandidates").child(key);
        candidate.on("value", function(snapshot) {
            if (snapshot === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        })
    });
}

/* take in the id of candidate to be updated and an object of the new data values */
function updateCandidate(candidateId, newData) {
    return new Promise(function(resolve, reject) {
        var candidate = db.ref("/Candidates").child(candidateId);
        candidate.update(newData);
    });    
}

/* takes in a candidate and election object and adds the id and title to candidate/electionIds */
function candidateAddElection(candidateId, electionTitle) {
    var candidateElectionsRef = db.ref("Candidates/" + candidateId + "/electionIds").push();
    candidateElectionsRef.set({title: electionTitle});
}

function electionAddCandidate(electionId, candidateId, candidateName) {
    var electionCandidatesRef = db.ref("Elections/" + electionId + "/candidates").push();
    electionCandidatesRef.set(
        {
            candidateId: candidateId,
            candidateName: candidateName
        }
    );
}


module.exports.admin = admin;
module.exports.writeElection = writeElection;
module.exports.setElections = setElections;
module.exports.readElectionsPromise = readElectionsPromise;
module.exports.querySpecificElection = querySpecificElection;
module.exports.queryByState = queryByState;
module.exports.queryByTitle = queryByTitle;
module.exports.writeState = writeState;
module.exports.readStatesPromise = readStatesPromise;
module.exports.setStates = setStates;
module.exports.writeCandidate = writeCandidate;
module.exports.setCandidates = setCandidates;
module.exports.querySpecificCandidate = querySpecificCandidate;
module.exports.queryUserProfile = queryUserProfile;
module.exports.updateCandidate = updateCandidate;
module.exports.candidateAddElection = candidateAddElection;
module.exports.electionAddCandidate = electionAddCandidate;
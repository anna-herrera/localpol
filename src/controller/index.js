var fb = require('../db/firebase');
var usvote = require('../api/usvote_api');

function add_elections(level_id) {
    var elections_promise = usvote.get_elections(level_id, null, null);
    elections_promise.then(function(data) {
        
        // return a promise
        return usvote.get_elections(level_id, data.meta.total_objects, null);
    }).then(function(data2) {
        // data2 is result from apicall
        //console.log(data2);
        data2.objects.forEach(function(election) {
            fb.writeElection(election.title, election.state.name, election.election_type.name, 
                election.election_level.name, election.election_date, election.dates);
        });

    });
}

function update_elections() {
    fb.setElections();
    add_elections(3);
    add_elections(7);
}


function display_elections() {
    var elections = fb.readElectionsPromise();
    elections.then(function(data) {
        //console.log(data);
    })
}

function update_states(level_id) {
    fb.setStates();
    var states_promise = usvote.get_states();
    states_promise.then(function(data) {
        data.objects.forEach(function(state) {
            fb.writeState(state.name);
        });
    });
}

function add_candidates() {
    fb.setCandidates();
    fb.writeCandidate(['-LAMVz0Bc12PzUBZMvYM', '-LAMVz0Bc12PzUBZMvYN'], 'Anna', "Anna's bio", "Anna's platform")
    fb.writeCandidate(['-LAMVz0Bc12PzUBZMvYM', '-LAMVz0Bc12PzUBZMvYN'], 'Daniel', "Daniel's bio", "Daniel's platform")
}

module.exports.display_elections = display_elections;
module.exports.update_elections = update_elections;
module.exports.update_states = update_states;
module.exports.add_candidates = add_candidates;
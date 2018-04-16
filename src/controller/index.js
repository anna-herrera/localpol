var fb = require('../db/firebase');
var usvote = require('../api/usvote_api');

function update_elections(level_id) {
    var elections_promise = usvote.get_elections(level_id, null, null);
    elections_promise.then(function(data) {
        
        // return a promise
        return usvote.get_elections(level_id, data.meta.total_objects, null);
    }).then(function(data2) {
        // data2 is result from apicall
        console.log(data2);
        data2.objects.forEach(function(election) {
            fb.writeElection(election.title, election.state.name, election.election_type.name, 
                election.election_level.name, election.election_date, election.dates);
        });

    });

    /* working read elections (won't be able to update automatically) */
    /* end working read elections */

    /* try querying by state (California) */
    // fb.queryState();
    /* end querying */

    /* setting and constant reading of elections */
    // fb.setElections();
    // fb.readElections().then(function(data) {
    //     console.log(data);
    // })

    // fb.constantReadElections();
    /* end setting/constant reading */
}

function display_elections() {
    var elections = fb.readElectionsPromise();
    elections.then(function(data) {
        console.log(data);
    })
}

function update_states(level_id) {
    fb.setStates();
    var states_promise = usvote.get_states();
    states_promise.then(function(data) {
        
        // return a promise
        console.log(data);
        data.objects.forEach(function(state) {
            fb.writeState(state.name);
        });

    });

}

module.exports.display_elections = display_elections;
module.exports.update_elections = update_elections;
module.exports.update_states = update_states;
var fb = require('../db/firebase');
var usvote = require('../api/usvote_api');



function display_elections() {
    /*var elections_promise = usvote.get_elections(7, null, null);
    elections_promise.then(function(data) {
        
        // return a promise
        return usvote.get_elections(7, data.meta.total_objects, null);
    }).then(function(data2) {
        // data2 is result from apicall
        console.log(data2);
        data2.objects.forEach(function(election) {
            fb.writeElection(election.title, election.state.name, election.election_type.name, 
                election.election_level.name, election.election_date, election.dates);
        });

    });*/

    var elections = fb.readElections();
    elections.then(function(data) {
        console.log(data);
    });

    //console.log(fb.readElections());
}

module.exports.display_elections = display_elections;
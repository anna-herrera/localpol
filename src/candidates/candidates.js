// candidates.js - candidates route module

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var authentication = require('./authentication');
var firebase = authentication.firebase;
var adminFb = require('../db/firebase'); // admin fb
var admin = adminFb.admin;

var token;

/* modules to validate and sanitize form input */
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/', function(req, res) {
    res.redirect('/candidates/home');
});

router.get('/candidate/:id/view', function(req, res) {
  // have to make sure that the id is in the users database
  var userId = req.params['id'];

  admin.auth().getUser(userId)
    .then(function(userRecord) {
        adminFb.querySpecificCandidate(userId).then(function(data) {
          if (data) { // indicates that user profile exists
            var candidateData = data;
            adminFb.readElectionsPromise()
              .then(function(data) {
                var elections = data;
                var photo = (userRecord.photoURL) ? userRecord.photoURL : '/user.png'
                var email = userRecord.email;

                res.render('candidate_pages/viewCandidate', {
                  electionList: elections, 
                  userId: userId, 
                  data: candidateData,
                  photoURL: photo,
                  email: email
                });
              })
          } else {
            // should create data for candidate
            // get name from admin auth

            var displayName = userRecord.displayName;
            if (!displayName)
                displayName = "Display name not set";
            var candidateData = {
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              name: displayName,
              platform: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            }
            adminFb.updateCandidate(userId, candidateData);
            res.redirect('/candidates/candidate/' + userId + '/view');      
          }
        }).catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
      res.redirect('/candidates/login');
    });
});

router.get('/candidate/:id/edit', function(req, res) {
  // have to make sure that the id is in the users database
  var userId = req.params['id'];
  // console.log('user id is: ' + userId);

  admin.auth().getUser(userId)
    .then(function(userRecord) {
        adminFb.querySpecificCandidate(userId).then(function(data) {
          if (data) { // indicates that user profile exists
            var candidateData = data;
            adminFb.readElectionsPromise()
              .then(function(data) {
                var elections = data;
                var photo = (userRecord.photoURL) ? userRecord.photoURL : '/user.png'
                var email = userRecord.email;
                res.render('candidate_pages/editCandidate', {
                  electionList: elections, 
                  userId: userId, 
                  data: candidateData,
                  photoURL: photo,
                  email: email
                });
              })
          } else {
            // should create data for candidate
            // get name from admin auth

            var displayName = userRecord.displayName;
            if (!displayName)
                displayName = "Display name not set";
            var candidateData = {
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              name: displayName,
              platform: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            }
            adminFb.updateCandidate(userId, candidateData);
            res.redirect('/candidates/candidate/' + userId + '/edit');      
          }
        }).catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
      res.redirect('/candidates/login');
    });
});


router.post('/candidate/:id/edit', function(req, res) {
  var userId =req.params.id;
  var newData = req.body;
  adminFb.updateCandidate(userId, newData);
  res.redirect('/candidates/candidate/' + userId + '/view');
});

router.post('/candidate/:id/addElection', function(req, res) {
  // add election name to the candidate
  var userId = req.params.id;
  var newElectionId = req.body.electionSelector;


  adminFb.querySpecificElection(newElectionId)
    .then(function(data) {
      var electionTitle = data.title;
      adminFb.candidateAddElection(userId, electionTitle);
      // add candidate id and name to the election
      admin.auth().getUser(userId)
        .then(function(userRecord) {
          var displayName = userRecord.displayName;
          adminFb.electionAddCandidate(newElectionId, userId, displayName);
          res.redirect('/candidates/candidate/' + userId + '/view');
        })
        .catch(function(error) {
          console.log("Error fetching user data:", error);
          res.send("Error fetching user's data");
        });
    });
});

router.get('/login', function(req, res) {
    res.render('candidate_pages/login');
});

router.get('/home', function(req, res) {
    res.render('candidate_pages/success');
});

router.get('/success', function(req, res) {
  res.render('candidate_pages/success');
});

module.exports = router;
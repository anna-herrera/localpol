// candidates.js - candidates route module

var express = require('express');
var router = express.Router();
var authentication = require('./authentication');
var firebase = authentication.firebase;

// var uiConfig = {
//     signInSuccessUrl: '/candidates/success',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       // firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID//,
//       // firebase.auth.PhoneAuthProvider.PROVIDER_ID
//     ],
//     // Terms of service url.
//     // tosUrl: '<your-tos-url>'
//     credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO // change from accountchooser.com
// };


// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// router.get('/', function(req, res) {
//     res.render('candidate_pages/login', {ui: ui, uiConfig: uiConfig});
// });

// router.get('/login', function(req, res) {
//     res.render('candidate_pages/login', {ui: ui, uiConfig: uiConfig});
// });

router.get('/', function(req, res) {
    res.render('candidate_pages/login');
});

router.post('/login', function(req, res) {
  authentication.createUserWithEmailAndPassword('test@email.com', '').catch(function(error) {
    console.log(error.message);
  });
})

// router.get('/', function(req, res) {
//     res.render('candidate_pages/login', {firebase: firebase});
// });

router.get('/login', function(req, res) {
    res.render('candidate_pages/login');
});

router.get('/home', function(req, res) {
    res.render('candidate_pages/success');
});

router.get('/candidates/:id', function(req, res) {
  console.log(req.params.id);
});

router.get('/success', function(req, res) {
  res.render('candidate_pages/success');
	// res.send(firebase.auth());
	// console.log(firebase.auth().current_user);
});

module.exports = router;
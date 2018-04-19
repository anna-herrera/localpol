var firebase = require('firebase');
require('firebase/auth');
// var firebaseui = require('firebaseui');

var config = {
  apiKey: "AIzaSyA4B5iDlyyF-NEn0P7lLa5Ik6dE_R-QJfY",
  authDomain: "localpol-c2a9b.firebaseapp.com",
  databaseURL: "https://localpol-c2a9b.firebaseio.com",
  projectId: "localpol-c2a9b",
  storageBucket: "localpol-c2a9b.appspot.com",
  messagingSenderId: "393583030469"
};
firebase.initializeApp(config);

// /* function to register if can't use firebaseui */
// function register(email, password, name) {
// 	firebase.auth().createUserWithEmailAndPassword('test@email.com', '').catch(function(error) {
// 		console.log(error.message);
// 	});
// }

//  function to sign in if can't use firebaseui 
// function signIn(email, password) {
// 	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
// 	  // Handle Errors here.
// 	  var errorCode = error.code;
// 	  var errorMessage = error.message;
// 	  console.log(errorMessage);
// 	});
// }



module.exports.firebase = firebase;
// module.exports.register = register;
// module.exports.signIn = signIn;

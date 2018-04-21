var firebase = require('firebase');
require('firebase/auth');

var config = {
  apiKey: "AIzaSyA4B5iDlyyF-NEn0P7lLa5Ik6dE_R-QJfY",
  authDomain: "localpol-c2a9b.firebaseapp.com",
  databaseURL: "https://localpol-c2a9b.firebaseio.com",
  projectId: "localpol-c2a9b",
  storageBucket: "localpol-c2a9b.appspot.com",
  messagingSenderId: "393583030469"
};
firebase.initializeApp(config);

module.exports.firebase = firebase;

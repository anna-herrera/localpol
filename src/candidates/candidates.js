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

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// router.use(express.static('views'));

// router.get('/', function(req, res) {
//     res.render('candidate_pages/login', {ui: ui, uiConfig: uiConfig});
// });

// router.get('/login', function(req, res) {
//     res.render('candidate_pages/login', {ui: ui, uiConfig: uiConfig});
// });

router.get('/', function(req, res) {
    res.redirect('/candidates/login');
});

// router.post('/login', function(req, res) {
//   firebase.auth().createUserWithEmailAndPassword('test@email.com', '').catch(function(error) {
//       res.send(error);
//   }).then(res.redirect('/home'));
// })

router.get('/register', function(req, res) {
  res.render('candidate_pages/register');
})

/*
router.post('/register', function(req, res) {
  [
    check('username')
      // Every validator method in the validator lib is available as a
      // method in the check() APIs.
      // You can customize per validator messages with .withMessage()
      .isEmail().withMessage('must be an email')

      // Every sanitizer method in the validator lib is available as well!
      .trim()
      .normalizeEmail()

      // ...or throw your own errors using validators created with .custom()
      .custom(value => {
        return findUserByEmail(value).then(user => {
          throw new Error('this email is already in use');
        })
      }),

    // General error messages can be given as a 2nd argument in the check APIs
    check('password', 'passwords must be at least 5 chars long and contain one number')
      .isLength({ min: 5 })
      .matches(/\d/),

    // No special validation required? Just check if data exists:
    check('addresses.*.street').exists(),

    // Wildcards * are accepted!
    check('addresses.*.postalCode').isPostalCode(),

    // Sanitize the number of each address, making it arrive as an integer
    sanitize('addresses.*.number').toInt()
  ], (req, res, next) => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // matchedData returns only the subset of data validated by the middleware
    const user = matchedData(req);
    createUser(user).then(user => res.json(user));
  });

  var name = req.body.displayName;
  var email = req.body.emailAddress;
  var password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password);
})

*/

// router.get('/', function(req, res) {
//     res.render('candidate_pages/login', {firebase: firebase});
// });

router.get('/login', function(req, res) {
    res.render('candidate_pages/login');
});

router.post('/login', function(req, res) {
  token = req.body.idToken;
  admin.auth().verifyIdToken(token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      console.log(uid)
      // TODO: implement three routes based on whether the candidate is assigned to an election or not 
      // res.send('/candidates/candidate/' + uid);
      res.redirect('/candidates/register');
    })
    .catch(function(error) {
      console.log(error);
      res.send('/candidates/login');
    })
})

router.get('/home', function(req, res) {
    res.render('candidate_pages/success');
});

router.get('/candidate', function(req, res) {
  res.render('candidate_pages/candidate');
});

router.get('/candidate/:id', function(req, res) {
  res.render('candidate_pages/candidateHome');
});

router.post('/candidate/:id/verify', function(req, res) {
  console.log("logged in as " + req.body.idToken);
  var idToken = req.body.idToken;
  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      console.log("uid found: " + uid);
      console.log(req.params.id);
      if (uid !== req.params.id) { // user is not the same as page they are trying to access
        res.status(404);
        res.send('/candidates/candidate/' + uid); // try to access candidate's own page
      }
    })
    .catch(function(error) {
      console.log('you are not authorized to access this page');
      res.send('/candidates/login');
    })
})

router.get('/success', function(req, res) {
  res.render('candidate_pages/success');
	// res.send(firebase.auth());
	// console.log(firebase.auth().current_user);
});

module.exports = router;
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

// router.use(express.static('views'));

// router.get('/', function(req, res) {
//     res.render('candidate_pages/login', {ui: ui, uiConfig: uiConfig});
// });

// router.get('/login', function(req, res) {
//     res.render('candidate_pages/login', {ui: ui, uiConfig: uiConfig});
// });
// 

router.get('/', function(req, res) {
    // try and get to daniel's edit page
    res.redirect('/candidates/home');
    // res.redirect('/candidates/login');
});

// router.post('/login', function(req, res) {
//   firebase.auth().createUserWithEmailAndPassword('test@email.com', '').catch(function(error) {
//       res.send(error);
//   }).then(res.redirect('/home'));
// })

router.get('/register', function(req, res) {
  res.render('candidate_pages/register');
})

router.get('/candidate/:id/view', function(req, res) {
  // have to make sure that the id is in the users database
  var userId = req.params['id'];
  console.log('user id is: ' + userId);

  admin.auth().getUser(userId)
    .then(function(userRecord) {
        adminFb.querySpecificCandidate(userId).then(function(data) {
          if (data) { // indicates that user profile exists
            var candidateData = data;
            adminFb.readElectionsPromise()
              .then(function(data) {
                var elections = data;
                var photo = (userRecord.photoURL) ? userRecord.photoURL : '/anna.jpg'
                res.render('candidate_pages/viewCandidate', {
                  electionList: elections, 
                  userId: userId, 
                  data: candidateData,
                  photoURL: photo
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
  console.log('user id is: ' + userId);

  admin.auth().getUser(userId)
    .then(function(userRecord) {
        adminFb.querySpecificCandidate(userId).then(function(data) {
          if (data) { // indicates that user profile exists
            var candidateData = data;
            adminFb.readElectionsPromise()
              .then(function(data) {
                var elections = data;
                var photo = (userRecord.photoURL) ? userRecord.photoURL : '/anna.jpg'
                res.render('candidate_pages/editCandidate', {
                  electionList: elections, 
                  userId: userId, 
                  data: candidateData,
                  photoURL: photo
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

  // adminFb.querySpecificCandidate(userId).then(function(data) {
  //   if (data) { // indicates that user exists
  //     var candidateData = data;
  //     adminFb.readElectionsPromise()
  //       .then(function(data) {
  //         var elections = data;
  //         console.log(candidateData);
  //         res.render('candidate_pages/editCandidate', {electionList: elections, userId: userId, data: candidateData});
  //       })
  //   } else {
  //     // should create data for candidate
  //     // get name from admin auth

  //     admin.auth().getUser(userId)
  //       .then(function(userRecord) {
  //         console.log("Successfully fetched user data:", userRecord.toJSON());

  //         var displayName = userRecord.displayName;
  //         if (!displayName)
  //             displayName = "Display name not set";
  //         var candidateData = {
  //           platform: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //           name: displayName,
  //           bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  //         }
  //         adminFb.updateCandidate(userId, candidateData);
  //         res.redirect('/candidates/candidate/' + userId + '/edit');
  //       })
  //       .catch(function(error) {
  //         console.log("Error fetching user data:", error);
  //         res.redirect('/candidates/login');
  //       });

     
      
  //   }
  // }).catch(function(err) {
  //   console.log(err);
  // });

  // TODO check that user exists
  // admin.auth().getUser(userId)
  // .then(function(userRecord) {
  //   isUser = true;
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log("Successfully fetched user data:", userRecord.toJSON());
  // })
  // .catch(function(error) {
  //   console.log("Error fetching user data:", error);
  // });

  //     // have to map from user to profile
  //     var candidateId = adminFb.queryUserProfile(req.params['id']);
  //     candidateId.then(function(data) {
  //       console.log('candidate id = '+ data);
  //       return data; // return promise with candidate id
  //     }).then(function(data) {
  //         if (data) {
  //           var candidateId = data;
  //           var candidates = adminFb.querySpecificCandidate(candidateId);
  //           return adminFb.querySpecificCandidate(candidateId);
  //         } else {
  //           res.send('could not find user');
  //         }
  //     }).then(function(data) {
  //       var candidateData = data;
  //       // var eMap = adminFb.getStateElectionMap();
  //       // eMap.then(function(data) {
  //       //   console.log("data is " + data.get('California'));
  //       // });
  //       var elections = adminFb.readElectionsPromise();
  //       elections.then(function(data) {
  //         res.render('candidate_pages/editCandidate', {electionList: data, userId: userId, data: candidateData});
  //       })
  //       // res.render('candidate_pages/editCandidate', {electionsMap: eMap, userId: userId, data: candidateData});
  //     }).catch(function(error) {
  //             console.log(error);
  //             res.send(error);
  //     });


router.post('/candidate/:id/edit', function(req, res) {
  var userId =req.params.id;
  var newData = req.body;
  adminFb.updateCandidate(userId, newData);
  res.redirect('/candidates/candidate/' + userId + '/view');
});

router.post('/candidate/:id/addElection', function(req, res) {
  // todo add candidate id to the election
  // add election name to the candidate
  var userId = req.params.id;
  var newElectionId = req.body.electionSelector;
  // for (const prop in req.body.electionSelector) {
  //   console.log(prop + " : " + req.body.electionSelector.prop);
  // }
  console.log(req.body.electionSelector);
  adminFb.querySpecificElection(newElectionId)
    .then(function(data) {
      var electionTitle = data.title;
      adminFb.candidateAddElection(userId, electionTitle);
      // add candidate id and name to the election
      admin.auth().getUser(userId)
        .then(function(userRecord) {
          console.log("Successfully fetched user data:", userRecord.toJSON());
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

router.post('/candidate_login', function(req, res) {
  admin.auth().getUserByEmail(req.body.eml)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
});



router.get('/home', function(req, res) {
    res.render('candidate_pages/success');
});

// router.get('/candidate/:id', function(req, res) {
//   console.log(req.params['id']);
//   var candidates = adminFb.querySpecificCandidate(req.params['id']);
//   candidates.then(function(data) {
//     console.log(data);
//     res.render('candidate_pages/candidateHome', {data : data});
//   })
  
// });

// router.post('/candidate/:id/verify', function(req, res) {
//   console.log("logged in as " + req.body.idToken);
//   var idToken = req.body.idToken;
//   admin.auth().verifyIdToken(idToken)
//     .then(function(decodedToken) {
//       var uid = decodedToken.uid;
//       console.log("uid found: " + uid);
//       console.log(req.params.id);
//       if (uid !== req.params.id) { // user is not the same as page they are trying to access
//         res.status(404);
//         res.send('/candidates/candidate/' + uid); // try to access candidate's own page
//       }
//     })
//     .catch(function(error) {
//       console.log('you are not authorized to access this page');
//       res.send('/candidates/login');
//     })
// })

router.get('/success', function(req, res) {
  res.render('candidate_pages/success');
	// res.send(firebase.auth());
	// console.log(firebase.auth().current_user);
});

module.exports = router;
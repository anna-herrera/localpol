var express = require("express");
var controller = require("./controller/index");
var fb = require("./db/firebase");
var candidates = require("./candidates/candidates.js");
var gcal = require('./api/google_calendar_api.js');
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config.js');
var session = require('express-session');
var bodyParser = require('body-parser');
var alert = require('alert-node');
var admin = fb.admin;

//const TOKEN_PATH = 'credentials.json';
const fs = require('fs');

var token;
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/candidates', candidates);
app.use( bodyParser.urlencoded({ extended: false }) ); 

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use( express.static( __dirname + "/public" ) );

/* Authentication */

// console.log(config.keys.google_client_secret.web.client_secret);
passport.use(new GoogleStrategy({
    clientID: config.keys.google_client_id,
    clientSecret: config.keys.google_client_secret.web.client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/plus.login']
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


/*todo probably need session to true*/
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/calendar'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) { 
    req.session.access_token = req.user.accessToken;
    res.redirect(req.session.search);
  });
  


/* Displaying */ 

app.get('/', function (req, res) {
  var states = fb.readStatesPromise();
  states.then(function(data) {
    res.render('pages/index', {data: data});
  })
})

app.get('/getState', function (req, res) {
  var state = req.query['stateSelector'];
  // console.log(state);
  var elections = fb.queryByState(state);
  elections.then(function(data) {
    //console.log(data);
    //res.status(HttpStatus.OK);
    if (data == null) {
      var byTitle = null;
    } else {
      var ordered = Object.values(data);
      var byTitle = ordered.slice(0);
      byTitle.sort(function(a,b) {
          var x = a.title.toLowerCase();
          var y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    //console.log('by title:');
    //console.log(byTitle);
    res.render('pages/elections', {data: byTitle});
  })
})

/*This currently renders a page listing all the elections. 
We can modify it to be /elections/:state and use the state 
parameter to get elections from a particular state. See elections.ejs
under views/pages to see how I linked the specific election route
to each list item.*/

app.get('/elections', function (req, res) {
  var elections = fb.readElectionsPromise();
  elections.then(function(data) {
    res.render('pages/elections', {data: data});
  })
})

app.get('/elections?state=:state'), function (req, res) {
  var elections = fb.queryByState(req.params['state']);
}
/*When an election is selected from the elections page, 
it links to the specific election page. This page currently 
displays the title of a specific election. I do a query based
on the election id which is passed in through the path.*/

app.get('/election/:id', function (req, res) {
  // console.log(req.params['id']);
  var elections = fb.queryByTitle(req.params['id']);
  elections.then(function(data) {
    //console.log(data);
    res.render('pages/election', {data: Object.values(data)[0]});
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use(ignoreFavicon);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

app.get('/election/:id/:date', function(req, res){
  
  // console.log(token);
  req.session.search = '/election/' + req.params['id'] + '/' + req.params['date'];
  if(!req.session.access_token) return res.redirect('/auth/google');
  
  var accessToken     = req.session.access_token;
  //var calendarId      = req.params.calendarId;

  var elections = fb.queryByTitle(req.params['id']);
  elections.then(function(data) {
    var data2 = Object.values(data)[0];
    if (req.params['date'] == 'actual') {
      var date = data2.date;
    } else {
      var date = data2.otherDates[parseInt(req.params['date'], 10)].date;
    }

    var event = {
      'summary': data2.title,
      'start': {
        'date' : date,
      },
      'end': {
        'date' : date,
      }
    };
    gcal(accessToken).events.insert("primary", event, function(err, data) {
      if(err) return res.send(500,err);
      alert("Election Added to Calendar");
      return res.redirect('/election/' + req.params['id']);
    });
  })
});


app.get('/candidate/:id', function (req, res) {
  // console.log(req.params['id']);
  var userId = req.params['id'];

  admin.auth().getUser(userId)
    .then(function(userRecord) {
      var photo = (userRecord.photoURL) ? userRecord.photoURL : '/user.png'
      var email = userRecord.email;
      var candidates = fb.querySpecificCandidate(userId);
      candidates.then(function(data) {
        // console.log(data);
        res.render('pages/profile', {data: data, photoURL: photo, email: email});
      });
  }).catch(function(error) {
    res.redirect('/');
  })
});


app.get('/candidates', function(req, res) {
  res.render('pages/candidates');
});

app.post('/getCandidate', function(req, res) {
  
  fb.createUser(req.body.usr, req.body.pwd);
});

//controller.update_states();
//controller.update_elections();
//controller.add_candidates();


var express = require("express");
var controller = require("./controller/index");
var fb = require("./db/firebase");
var candidates = require("./candidates/candidates.js");

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/candidates', candidates); // this adds the /candidates route to the app

app.get('/', function (req, res) {
  var states = fb.readStatesPromise();
  states.then(function(data) {
    res.render('pages/index', {data: data});
  })
})

app.get('/getState', function (req, res) {
  var state = req.query['stateSelector'];
  console.log(state);
  var elections = fb.queryByState(state);
  elections.then(function(data) {
    //res.status(HttpStatus.OK);
    var ordered = Object.values(data);
    var byTitle = ordered.slice(0);
    byTitle.sort(function(a,b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

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
  console.log(req.params['id']);
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

// controller.update_states();
// controller.update_elections();
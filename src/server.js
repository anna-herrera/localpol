var express = require("express");
var controller = require("./controller/index");
var fb = require("./db/firebase");
var candidates = require("./candidates/candidates.js");

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/candidates', candidates); // this adds the /candidates route to the app

app.get('/', function (req, res) {
  res.render('pages/index', {electionName: 'Vermont Election'});
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
  var elections = fb.querySpecificElection(req.params['id']);
  elections.then(function(data) {
    res.render('pages/election', {data: data});
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


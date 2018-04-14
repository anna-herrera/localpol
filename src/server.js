var express = require("express");
var controller = require("./controller/index");
var fb = require("./db/firebase");

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('pages/index', {electionName: 'Vermont Election'});
})

app.get('/elections', function (req, res) {
  var elections = fb.readElectionsPromise();
  elections.then(function(data) {
    //console.log(data);
    res.render('pages/elections', {data: data});
  })
})

app.get('/election/:id', function (req, res) {
  //console.log("rendering one election")

  var elections = fb.querySpecificElection(req.params['id']);
  elections.then(function(data) {
    //console.log(data);
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

controller.display_elections();

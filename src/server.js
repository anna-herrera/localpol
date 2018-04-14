var express = require("express");
var controller = require("./controller/index");

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {electionName: 'Vermont Election'});
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

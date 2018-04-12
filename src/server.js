var express = require("express");
var admin = require('firebase-admin');

// Fetch the service account key JSON file contents
var config = require(__dirname + "/config.js");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(config.keys.firebase_api_key),
  databaseURL: "https://localpol-c2a9b.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/Elections");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

// import cors from "cors"
// import { renderToString } from "react-dom/server"
// import App from '../shared/App'
// import React from 'react'
// import serialize from "serialize-javascript"
// import { get_elections } from '../shared/usvote_api'
// import { matchPath } from "react-router-dom"
// import routes from '../shared/routes'
// import { StaticRouter, matchPath } from "react-router-dom"
var controller = require("./controller/index");

const app = express()

//app.use(cors())

//app.use(express.static("public"))
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
/*

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(
    (route) => matchPath(req.url, route)
  ) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App data={data}/>
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
  
})

*/


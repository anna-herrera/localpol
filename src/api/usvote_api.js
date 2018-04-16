//var express = require('express')
var config = require("../config.js");
//var request = require("request");
var fetch = require('isomorphic-fetch');

/*export function fetchPopularRepos (language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    });
}*/
//var app = express()


// app.listen(8000, function () {
//   console.log('Example app listening on port 8000!')
// })

//console.log(config.keys.usvote_api_token);
//console.log(config)

function append_url(first, url, appended) {
  if (first) {
    return url + '?' + appended;
  } else {
    return url + '&' + appended;
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    //return info;
  } else {
    console.log(error);
  }
};

function get_elections(election_level_id, limit, offset) {
  var url = 'https://localelections.usvotefoundation.org/api/v1/elections';

  var first = true;

  
  if (election_level_id != null) {
    url = append_url(first, url, 'election_level_id=' + election_level_id)
    first = false;
  }

  if (limit != null) {
    url = append_url(first, url, 'limit=' + limit)
    first = false;
  }

  if (offset != null) {
    url = append_url(first, url, 'offset=' + offset)
    first = false;
  }
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var options = {
    headers: {
      'Authorization': 'Token ' + config.keys.usvote_api_token
    }
  };

  //console.log(config.keys.usvote_api_token)
  //console.log(url)

  return fetch(url, options)
    .then(function(response) {
      return response.json();
    });
}


function get_states(){
  var url = 'https://localelections.usvotefoundation.org/api/v1/states?limit=56';
  var options = {
    headers: {
      'Authorization': 'Token ' + config.keys.usvote_api_token
    }
  };
  return fetch(url, options)
    .then(function(response) {
      return response.json();
    });
}

module.exports.get_states = get_states;
module.exports.get_elections = get_elections;




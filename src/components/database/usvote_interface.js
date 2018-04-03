//var express = require('express')
var config = require("../../config.js");
var request = require("request");
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
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    return info;
  } else {
    console.log(error);
  }
}

function get_elections(state_id, election_level_id,  election_type_id, limit, offset) {
  var url = 'https://localelections.usvotefoundation.org/api/v1/elections';

  var first = true;

  if (state_id != null) {
    url = append_url(first, url, 'state_id=' + state_id)
    first = false;
  }

  if (election_level_id != null) {
    url = append_url(first, url, 'election_level_id=' + election_level_id)
    first = false;
  }

  if (election_type_id != null) {
    url = append_url(first, url, 'election_type_id=' + election_type_id)
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

  var options = {
    url: url,
    headers: {
      'Authorization': 'Token ' + config.keys.usvote_api_token
    }
  };

  console.log(request(options, callback).meta);

}





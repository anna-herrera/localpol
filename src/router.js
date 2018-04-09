import React from 'react';
import {render} from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import LocationForm from './components/pages/locationForm'
import CityList from './components/pages/cityList'
import About from './components/pages/about'
import CandidateLogin from './components/pages/candidateLogin'
import ElectionList from './components/pages/electionList'
import Election from './components/pages/election'
import CandidateProfile from './components/pages/candidateProfile'

// Used for client-side and server-side rendering
var router = (
  <Router history={browserHistory} onUpdate={fireTracking}>
    <Route path="/" component={LocationForm}>
      <IndexRoute component={LocationForm} />
      <Route path="cities" component={CityList} />
      <Route path="about" component={About} />
      <Route path="candidate_login" component={CandidateLogin} />
      <Route path="city/:cityNamet" component={ElectionList} />
      <Route path="election/:electionName" component={Election} />
      <Route path="candidate/:candidateName" component={CandidateProfile} />
    </Route>
  </Router>
);

// Attach handlers when page is opened in browser
if (typeof document !== "undefined") {
  document.addEventListener('DOMContentLoaded', function() {
    render(router, document.getElementById("root"));
  });
}

function fireTracking() {
  ga('set', 'page', location.pathname);
  ga('send', 'pageview');
}

module.exports = router;
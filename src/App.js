import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/headerComponents/header'
import LocationForm from './components/pages/locationForm'
import CityList from './components/pages/cityList'
import About from './components/pages/about'
import CandidateLogin from './components/pages/candidateLogin'
import ElectionList from './components/pages/electionList'
import Election from './components/pages/election'
import CandidateProfile from './components/pages/candidateProfile'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>

        <div className="App">

          <Header />
                
            <Route exact path="/" component={LocationForm} />
            <Route exact path="/cities" component={CityList} />
            <Route exact path="/about" component={About} />
            <Route exact path="/candidate_login" component={CandidateLogin} />
            <Route exact path="/city/:cityName" component={ElectionList} />
            <Route exact path="/election/:electionName" component={Election} />
            <Route exact path="/candidate/:candidateName" component={CandidateProfile} />

        </div>

      </Router>
    );
  }
}

export default App;

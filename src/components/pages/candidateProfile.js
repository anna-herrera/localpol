import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class CandidateProfile extends Component {

  render() {
    return (
      <div>
      <h1>{this.props.match.params.candidateName}</h1>
      <ul className="city-list">
        <li><Link to="/election/election1">Election 1</Link></li>
        <li><Link to="/election/election2">Election 2</Link></li>
        <li><Link to="/election/election3">Election 3</Link></li>
      </ul>
      </div>
      );
  }
}

export default withRouter(CandidateProfile);
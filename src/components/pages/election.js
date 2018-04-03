import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class Election extends Component {

  render() {
    return (
      <div>
      <h1>{this.props.match.params.electionName}</h1>
      <div>
        <div className="square">Dates to know</div>
        <div className="square">
          <li><Link to="/candidate/candidate1">Candidate 1</Link></li>
          <li><Link to="/candidate/candidate2">Candidate 2</Link></li>
          <li><Link to="/candidate/candidate3">Candidate 3</Link></li>
        </div>
      </div>
      </div>
      );
  }
}

export default withRouter(Election);
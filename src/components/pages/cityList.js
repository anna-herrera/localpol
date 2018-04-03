import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CityList extends Component {

  render() {
    return (
      <div>
      <h1>Cities near you</h1>
      <ul className="city-list">
        <li><Link to="/city/city1">City 1</Link></li>
        <li><Link to="/city/city2">City 2</Link></li>
        <li><Link to="/city/city3">City 3</Link></li>
      </ul>
      <div className="square">Map goes here</div>
      </div>
      );
  }
}

export default CityList;
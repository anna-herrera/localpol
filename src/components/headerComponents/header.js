import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<header className="header">
				<h1>LocalPol</h1>
				<nav>
					<ul>
						<li><Link to="/about"> About LocalPol</Link></li>
						<li><Link to="/"> Search elections by area</Link></li>
						<li><Link to="/candidate_login"> Candidate login</Link></li>
					</ul>
				</nav>
			</header>
			);
	}
}

export default Header;
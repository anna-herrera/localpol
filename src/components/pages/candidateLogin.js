import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class CandidateLogin extends Component {
	constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.username,
      password: event.target.password
    });
  }

  handleSubmit(event) {
    // alert('Location has been submitted.');
    // event.preventDefault();
    // this.props.history.push("/cities")
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input value={this.state.username} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
	}
}

export default withRouter(CandidateLogin);
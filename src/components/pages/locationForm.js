import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class LocationForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
      state: null,
      city_zip: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      state: event.target.state,
      city_zip: event.target.city_zip
    });
  }

  handleSubmit(event) {
    // alert('Location has been submitted.');
    event.preventDefault();
    this.props.history.push("/cities")
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          State:
          <input value={this.state.state} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          City/Zip:
          <input value={this.state.city_zip} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
	}
}

export default withRouter(LocationForm);
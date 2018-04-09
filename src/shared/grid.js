import React, { Component } from 'react'

class Grid extends Component {
  constructor(props) {
    super(props)

    let repos
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = props.staticContext.data
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }

  componentDidMount () {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  fetchRepos (lang) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(lang)
      .then((repos) => this.setState(() => ({
        repos,
        loading: false,
      })))
  }

  render() {
    const { repos, loading } = this.state

    if (loading === true) {
      return <p>LOADING</p>
    }
    //console.log(repos)
    return (
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {repos.objects.map((election) => (
          //console.log(election)
          <li key={election.id} style={{margin: 30}}>
            <ul>
              <li>{election.title}</li>
              <li>{election.election_status}</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}

export default Grid
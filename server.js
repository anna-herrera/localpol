/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(3);

var _cors2 = _interopRequireDefault(_cors);

var _server = __webpack_require__(4);

var _App = __webpack_require__(5);

var _App2 = _interopRequireDefault(_App);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _serializeJavascript = __webpack_require__(6);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _usvote_api = __webpack_require__(7);

var _routes = __webpack_require__(13);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { matchPath } from "react-router-dom"
const app = (0, _express2.default)();

app.use((0, _cors2.default)());

app.use(_express2.default.static("public"));

app.get("*", (req, res, next) => {
  const activeRoute = _routes2.default.find(route => (0, _reactRouterDom.matchPath)(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(data => {
    const context = { data };
    const markup = (0, _server.renderToString)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_App2.default, { data: data })
    ));

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${(0, _serializeJavascript2.default)(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
  }).catch(next);
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _grid = __webpack_require__(11);

var _grid2 = _interopRequireDefault(_grid);

var _routes = __webpack_require__(13);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {render} from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
//import Routes from './routes'
// import Header from './components/headerComponents/header'
// import {BrowserRouter as Router} from 'react-router-dom'
// import { renderRoutes } from 'react-router-config'
// import { routes } from './routes'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends _react.Component {
  render() {
    return _react2.default.createElement(
      'div',
      null,
      _routes2.default.map(({ path, exact, component: C }) => _react2.default.createElement(_reactRouterDom.Route, {
        key: path,
        path: path,
        exact: exact,
        render: props => _react2.default.createElement(C, props)
      }))
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <Router>

//         <div className="App">

//           <Header />
//             <Router>  
//               {renderRoutes(Routes)}
//             </Router>
//         </div>

//       </Router>
//     );
//   }
// }

// if(typeof window !== 'undefined') {
//     console.log("doc defined now");
//     render(<App />, document.querySelector('#app'));
// }
// 
exports.default = App;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRepos = fetchPopularRepos;
exports.get_elections = get_elections;

var _isomorphicFetch = __webpack_require__(8);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var express = require('express')
var config = __webpack_require__(9);
//var request = require("request");
function fetchPopularRepos(language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  return (0, _isomorphicFetch2.default)(encodedURI).then(data => data.json()).then(repos => repos.items).catch(error => {
    console.warn(error);
    return null;
  });
}
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
    //return info;
  } else {
    console.log(error);
  }
}

function get_elections(state_id, election_level_id, election_type_id, limit, offset) {
  var url = 'https://localelections.usvotefoundation.org/api/v1/elections';

  var first = true;

  if (state_id != null) {
    url = append_url(first, url, 'state_id=' + state_id);
    first = false;
  }

  if (election_level_id != null) {
    url = append_url(first, url, 'election_level_id=' + election_level_id);
    first = false;
  }

  if (election_type_id != null) {
    url = append_url(first, url, 'election_type_id=' + election_type_id);
    first = false;
  }

  if (limit != null) {
    url = append_url(first, url, 'limit=' + limit);
    first = false;
  }

  if (offset != null) {
    url = append_url(first, url, 'offset=' + offset);
    first = false;
  }
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var options = {
    headers: {
      'Authorization': 'Token ' + config.keys.usvote_api_token
    }
  };

  console.log(config.keys.usvote_api_token);
  console.log(url);

  return (0, _isomorphicFetch2.default)(url, options).then(function (response) {
    return response.json();
  });
  //.then(function(myJson) {
  //console.log(myJson);
  // })
  // .catch((error) => {
  //   console.warn(error)
  //   console.log(body);
  //   return null
  // });
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = {
    firebase_api_key: 'AIzaSyA4B5iDlyyF-NEn0P7lLa5Ik6dE_R-QJfY',
    usvote_api_token: '79411da39ec8c63c893192c2cf56135d00550da5',
    usvote_api_password: 'H7bb42LX$22'
};

module.exports.keys = keys;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Grid extends _react.Component {
  constructor(props) {
    super(props);

    let repos;
    if (false) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = props.staticContext.data;
    }

    this.state = {
      repos,
      loading: repos ? false : true
    };

    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id);
    }
  }
  fetchRepos(lang) {
    this.setState(() => ({
      loading: true
    }));

    this.props.fetchInitialData(lang).then(repos => this.setState(() => ({
      repos,
      loading: false
    })));
  }

  render() {
    const { repos, loading } = this.state;

    if (loading === true) {
      return _react2.default.createElement(
        'p',
        null,
        'LOADING'
      );
    }
    //console.log(repos)
    return _react2.default.createElement(
      'ul',
      { style: { display: 'flex', flexWrap: 'wrap' } },
      repos.objects.map(election =>
      //console.log(election)
      _react2.default.createElement(
        'li',
        { key: election.id, style: { margin: 30 } },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            election.title
          ),
          _react2.default.createElement(
            'li',
            null,
            election.election_status
          )
        )
      ))
    );
  }
}

exports.default = Grid;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _locationForm = __webpack_require__(14);

var _locationForm2 = _interopRequireDefault(_locationForm);

var _cityList = __webpack_require__(15);

var _cityList2 = _interopRequireDefault(_cityList);

var _about = __webpack_require__(16);

var _about2 = _interopRequireDefault(_about);

var _candidateLogin = __webpack_require__(17);

var _candidateLogin2 = _interopRequireDefault(_candidateLogin);

var _electionList = __webpack_require__(18);

var _electionList2 = _interopRequireDefault(_electionList);

var _election = __webpack_require__(19);

var _election2 = _interopRequireDefault(_election);

var _candidateProfile = __webpack_require__(20);

var _candidateProfile2 = _interopRequireDefault(_candidateProfile);

var _reactRouterDom = __webpack_require__(12);

var _grid = __webpack_require__(11);

var _grid2 = _interopRequireDefault(_grid);

var _usvote_api = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{ path: '/',
  exact: true,
  component: _locationForm2.default
}, { path: '/elections/:id',
  component: _grid2.default,
  fetchInitialData: (path = '') => (0, _usvote_api.get_elections)(null, path.split('/').pop(), null, null, null)
  /*{ path: '/cities',
    exact: true,
    component: CityList
  },
  { path: '/about',
    exact: true,
    component: About
  },
  { path: '/candidate_login',
    exact: true,
    component: CandidateLogin
  },
  { path: '/city/:cityName',
    //exact: true,
    component: ElectionList
  },
  { path: '/election/:electionName',
    //exact: true,
    component: Election
  },
  { path: '/candidate/:candidateName',
    //exact: true,
    component: CandidateProfile
  }*/
}];

exports.default = routes;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocationForm extends _react.Component {
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
    this.props.history.push("/cities");
  }

  render() {
    return _react2.default.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      _react2.default.createElement(
        'label',
        null,
        'State:',
        _react2.default.createElement('input', { value: this.state.state, onChange: this.handleChange })
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'label',
        null,
        'City/Zip:',
        _react2.default.createElement('input', { value: this.state.city_zip, onChange: this.handleChange })
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
    );
  }
}

exports.default = (0, _reactRouterDom.withRouter)(LocationForm);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CityList extends _react.Component {

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Cities near you'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'city-list' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/city/city1' },
            'City 1'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/city/city2' },
            'City 2'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/city/city3' },
            'City 3'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'square' },
        'Map goes here'
      )
    );
  }
}

exports.default = CityList;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class About extends _react.Component {

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        'About LocalPol'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      )
    );
  }
}

exports.default = About;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CandidateLogin extends _react.Component {
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
    return _react2.default.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      _react2.default.createElement(
        'label',
        null,
        'Username:',
        _react2.default.createElement('input', { value: this.state.username, onChange: this.handleChange })
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'label',
        null,
        'Password:',
        _react2.default.createElement('input', { type: 'password', value: this.state.password, onChange: this.handleChange })
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
    );
  }
}

exports.default = (0, _reactRouterDom.withRouter)(CandidateLogin);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ElectionList extends _react.Component {

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Upcoming elections in ',
        this.props.match.params.cityName
      ),
      _react2.default.createElement(
        'ul',
        { className: 'city-list' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/election/election1' },
            'Election 1'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/election/election2' },
            'Election 2'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/election/election3' },
            'Election 3'
          )
        )
      )
    );
  }
}

exports.default = (0, _reactRouterDom.withRouter)(ElectionList);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Election extends _react.Component {

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        this.props.match.params.electionName
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'square' },
          'Dates to know'
        ),
        _react2.default.createElement(
          'div',
          { className: 'square' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/candidate/candidate1' },
              'Candidate 1'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/candidate/candidate2' },
              'Candidate 2'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/candidate/candidate3' },
              'Candidate 3'
            )
          )
        )
      )
    );
  }
}

exports.default = (0, _reactRouterDom.withRouter)(Election);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CandidateProfile extends _react.Component {

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        this.props.match.params.candidateName
      ),
      _react2.default.createElement(
        'ul',
        { className: 'city-list' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/election/election1' },
            'Election 1'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/election/election2' },
            'Election 2'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/election/election3' },
            'Election 3'
          )
        )
      )
    );
  }
}

exports.default = (0, _reactRouterDom.withRouter)(CandidateProfile);

/***/ })
/******/ ]);
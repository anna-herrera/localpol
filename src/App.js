import React, { Component } from 'react'
import {render} from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
//import Routes from './routes'
import Header from './components/headerComponents/header'
import {BrowserRouter as Router} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
//import { routes } from './routes'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
       Hello {this.props.data}
      </div>
    )
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
export default App;


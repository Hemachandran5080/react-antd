import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Body from './components/Body';
import SignInSide from './components/SignInSide';
import { BrowserRouter as Router, Route,Switch,withRouter} from "react-router-dom";
import Navbar from './components/Navbar';


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={SignInSide} />
      <Route path="/employeestable" component={Navbar} />
      <Route path="/chart" component={Body} />
      <Route />
      <Route />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"
import AppMain from './AppMain'
import AppLandingPage from './AppLandingPage'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/web-maker/create" component={AppMain}/>
        <Route path="/web-maker" component={AppLandingPage}/>
      </Switch>
    </Router>
  )
}

export default App;

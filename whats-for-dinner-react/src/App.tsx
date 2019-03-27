import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppNav } from './components/appnav';
import { Switch, Route } from 'react-router';
import { HomePage } from './pages/home/component';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <AppNav/>
        <Switch>
          <Route key="homepage" exact={true} path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;

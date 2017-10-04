import React, { Component } from 'react';
import Main from './components/Main';
import Splash from './components/Splash';
import './App.css';
import logo from './images/logo.png';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();

    this.state = {
      splash: false
    };

    setTimeout(() => {
      this.setState({
        splash: false
      })
    }, 3500)
  }

  render() {

    const content = (this.state.splash)
        ? <Splash />
        : (<div className="Notes">
            <header className="Notes__header">
              <img className="Notes__logo" src={logo} alt=""/>
            </header>
            <Main />
          </div>);

    return content;
  }
}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({})
)(App);

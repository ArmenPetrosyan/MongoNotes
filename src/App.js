import React, { Component } from 'react';
import Main from './components/Main';
import Splash from './components/Splash';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();

    this.state = {
      splash: true
    };

    setTimeout(() => {
      this.setState({
        splash: false
      })
    }, 3200)
  }

  render() {

    const content = (this.state.splash)
        ? <Splash />
        : (<div className="Notes">
            <header className="Notes__header"></header>
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

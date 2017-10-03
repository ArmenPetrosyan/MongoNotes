import React, { Component } from 'react';
import Editor from './Editor';
import Navigation from './Navigation';
import './Main.css';
import { connect } from 'react-redux';


class Main extends Component {
  render() {
    return (
      <main className="Notes__main">
        <Navigation
          list={this.props.notesStore.list}
          active={this.props.notesStore.active}
        />
        <Editor
          active={this.props.notesStore.active}
        />
      </main>
    );
  }
}

export default connect(
  state => ({
    notesStore: state
  }),
  dispatch => ({})
)(Main);

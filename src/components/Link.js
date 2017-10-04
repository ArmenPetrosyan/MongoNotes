import React, { Component } from 'react';
import notesStore from '../store/notesStore';
import { connect } from 'react-redux';

class Link extends Component {
  constructor() {
    super();
  }

  onClickHandler = (event) => {
    event.preventDefault();
    console.log('THIS', this.props, event.target);
    const currentTitle = event.target.text;
    const filtered = this.props.testStore.list.filter((element) => currentTitle === element.title);

    notesStore.dispatch({
      type: 'ACTIVE_NOTE',
      payload: {
        ...filtered[0]
      }
    });
    // notesStore.dispatch(getNoteByTitle('la la laDefault'));
  }

  render() {
    return (
      <a
        key={this.props.id}
        className={`Navigation__link ${this.props.additional}`}
        onClick={this.onClickHandler}
      >
        {this.props.title}
        <i
          className={`Navigation__star fa fa-star ${this.props.starredClassname}`}
          aria-hidden="true"
        />
      </a>
    )
  }
}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({})
)(Link);
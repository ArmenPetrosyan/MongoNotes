import React, { Component } from 'react';
import htmlUtils from 'js-htmlencode';
import PropTypes from 'prop-types';

import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import notesStore from '../store/notesStore';
import { connect } from 'react-redux';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './Editor.css';

class Editor extends Component {

  constructor() {
    super();

    this.state = {
      content: null,
      editorState: EditorState.createEmpty(),
    };

    notesStore.subscribe(() => {
      const cnt = notesStore.getState().active.content;
      if(cnt) {
        const contentBlock = htmlToDraft(cnt);

        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            editorState
          })
        }
      }

      console.log('SUBSCRIBED')

      this.setState({
        title: notesStore.getState().active.title
      });
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSaveHandler = () => {
    const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    if(this.props.notesStore.active.id) {
      notesStore.dispatch({
        type: 'UPDATE_NOTE',
        payload: {
          id: this.props.notesStore.active.id,
          title: this.state.title,
          content: content
        }
      });
    } else {
      notesStore.dispatch({
        type: 'ADD_NOTE',
        payload: {
          title: this.state.title,
          content: content,
          created: new Date()
        }
      });
    }
  };

  onTitleChangeHandler = (event) => {
    this.setState({
      title: event.target.value
    });
  };


  render() {
    const { editorState } = this.state;

    return (
      <section className="Editor">
        <input
          type="text"
          placeholder="Enter note title"
          className="Editor__header"
          value={this.state.title || this.props.active.title}
          onChange={this.onTitleChangeHandler}
        />

        <main className="Editor__main">
          <Wysiwyg
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="Editor__content"
            onEditorStateChange={this.onEditorStateChange}
          />
        </main>
        <footer className="Editor__footer">
          <button
            className="Editor__save"
            onClick={this.onSaveHandler}
          >
            Save
          </button>
        </footer>
      </section>
    );
  }
}

Editor.propTypes = {
    title   : PropTypes.string,
    content : PropTypes.node
};

Editor.defaultProps = {
    title: "Test note",
    content:(
        <div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        </div>
    )
};

export default connect(
  state => ({
    notesStore: state
  }),
  dispatch => ({})
)(Editor);

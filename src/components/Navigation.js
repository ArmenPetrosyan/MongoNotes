import React, { Component } from 'react';
import notesStore from '../store/notesStore';
import './Navigation.css';
import { fetchNotes, getNoteByTitle } from '../actions';

class Navigation extends Component {
  
  constructor() {
    super();
    
    this.activeClass = 'Navigation__link_active';

    notesStore.dispatch(fetchNotes());
  }
	
  onClickHandler(event) {
    event.preventDefault();
    console.log(event);
    notesStore.dispatch(getNoteByTitle('la la laDefault'));
  }
  
  render() {
    return (
      <aside
        className="Navigation"
        onClick={this.onClickHandler}
      >
        {
          this.props.list.reverse().map((element, index) => {
            let additional = (element.title === this.props.active.title) ? this.activeClass : '';
            return ( <a key={index} className={`Navigation__link ${additional}`}>{element.title}</a>)
          })
        }
      </aside>
    );
  }
}

export default Navigation;

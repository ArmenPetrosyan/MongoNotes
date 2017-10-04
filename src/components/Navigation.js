import React, { Component } from 'react';
import notesStore from '../store/notesStore';
import './Navigation.css';
import { fetchNotes, getNoteByTitle } from '../actions';
import NavigationLink from './Link';

class Navigation extends Component {
  
  constructor() {
    super();
    
    this.activeClass = 'Navigation__link_active';

    notesStore.dispatch(fetchNotes());
  }
	
  // onClickHandler = (event) => {
  //   event.preventDefault();
  //   console.log('THIS', this, event.target);
  //   const currentTitle = event.target.text;
  //   const filtered = this.props.list.filter((element) => currentTitle === element.title);
  //
  //   notesStore.dispatch({
  //     type: 'ACTIVE_NOTE',
  //     payload: {
  //       ...filtered[0]
  //     }
  //   });
  //   // notesStore.dispatch(getNoteByTitle('la la laDefault'));
  // }

  addNewHandler = () => {
    notesStore.dispatch({
      type: 'CREATE_NOTE'
    })
  };
  
  render() {
    if(this.props.fetchError) alert('Your connct to DB is broken')
    return (
      <aside
        className="Navigation__wrap"
      >
        <nav
          className="Navigation"
        >
          {
            this.props.list.map((element) => {
              let additional = (element.title === this.props.active.title) ? this.activeClass : '';
              let starredClassname = (element.starred) ? "" : "hidden";
              return (
                <NavigationLink
                  id={element._id}
                  additional={additional}
                  starredClassname={starredClassname}
                  title={element.title}
                />)
            })
          }

          <span
            className="Navigation__add"
            onClick={this.addNewHandler}
          >
            <i
              className="fa fa-plus-circle"
              aria-hidden="true"
            />
            New note
          </span>
        </nav>
      </aside>
    );
  }
}

export default Navigation;

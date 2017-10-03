import 'whatwg-fetch';

export const fetchNotes = () => {
  return function (dispatch) {
    fetch('http://localhost:8080/notes')
      .then(response => response.json())
      .then(notes => dispatch({
          type: 'RECEIVED_NOTES',
          payload: {
            notes: notes
          }
        })
      );
  };
};

export const getNoteByTitle = (title) => {
  return function (dispatch) {
    fetch(`http://localhost:8080/notes/${title}`)
      .then(response => response.json())
      .then(note => dispatch({
          type: 'ACTIVE_NOTE',
          payload: {
            title: note[0].title,
            content: note[0].content,
            created: note[0].created
          }
        })
      );
  };
};
import {getAllNotes, addNote} from '../utils/notesAPI';


export default function notes(state = {list:[], active:{title:''}}, action) {

  switch (action.type) {
    case 'FETCH_NOTES' :
      return state;

    case 'RECEIVED_NOTES' :
      return {
        ...state,
        list: [
          ...state.list,
          ...action.payload.notes
        ]
      };

    case 'ADD_NOTE' : {
      addNote(action.payload);

      return {
        ...state,
        active: {
          "title": action.payload.title,
          "content": action.payload.content,
          "created": action.payload.created
        },
        list: [
          ...state.list,
          {
            "title": action.payload.title,
            "content": action.payload.content,
            "created": action.payload.created
          }
        ]
      };
    }

    case 'ACTIVE_NOTE' : {
      return {
        ...state,
        active: {
          "title": action.payload.title,
          "content": action.payload.content,
          "created": action.payload.created
        }
      }
    }
  }

  return state;
}
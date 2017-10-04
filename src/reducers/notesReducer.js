import {updateNote, addNote} from '../utils/notesAPI';


export default function notes(state = {list:[], active:{title:''}, fetchError: false}, action) {

  switch (action.type) {
    case 'FETCH_NOTES' :
      return state;

    case 'RECEIVED_NOTES' : {
      return {
        ...state,
        list: [
          ...state.list,
          ...action.payload.notes
        ]
      };
    }

    case 'ERROR_RECEIVED_NOTES' : {
      return {
        ...state,
        fetchError: true
      };
    }

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
          "id": action.payload._id,
          "title": action.payload.title,
          "content": action.payload.content,
          "created": action.payload.created
        }
      }
    }

    case 'CREATE_NOTE' : {
      return {
        ...state,
        active: {
          "id": null,
          "title": '',
          "content": 'Write text here',
          "created": ''
        }
      }
    }

    case 'UPDATE_NOTE' : {
      const activeObject = {
        "title": action.payload.title,
        "content": action.payload.content
      };

      updateNote(state.active.id, activeObject);

      return {
        ...state,
        active  : {
          ...state.active,
          ...activeObject
        },
        list    : state.list.map(note => (note._id === state.active.id) ? {
          ...note,
          "title": action.payload.title,
          "content": action.payload.content
        } : note)
      }
    }
  }

  return state;
}
import { applyMiddleware, createStore } from 'redux';
import notesReducer from '../reducers/notesReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middle = applyMiddleware(thunk, logger);

const notesStore = createStore(notesReducer, middle);


notesStore.subscribe(() => {
  console.info('subscribe', notesStore.getState());
});

export default notesStore;
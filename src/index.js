import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import notesStore from './store/notesStore';

ReactDOM.render(
  <Provider store={notesStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

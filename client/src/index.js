import React from 'react';
import ReactDOM from 'react-dom';
import Tetris from './components/tetris.js';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Tetris />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

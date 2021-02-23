import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import generateInitialState from '../reducers/helpers/generateInitialState';
import thunk from 'redux-thunk';

export const store = createStore(
  rootReducer,
  generateInitialState({ isPlaying: false }),
  applyMiddleware(thunk)
);

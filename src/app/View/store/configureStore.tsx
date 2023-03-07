import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import filterReducer from '../containers/filter/filterReducer';
import languageReducer from '../containers/Language/languageReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  language: languageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

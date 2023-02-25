import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import filterReducer from '../containers/filter/filterReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

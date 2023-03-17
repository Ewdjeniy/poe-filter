import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  language: languageReducer,
});

export default rootReducer;

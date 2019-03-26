import { combineReducers } from 'redux';

import modal from './modal';
import user from './user';
import project from './project';

const rootReducer = combineReducers({
  project,
  modal,
  user,
});

export default rootReducer;

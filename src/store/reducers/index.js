import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import modal from './modal';
import user from './user';
import project from './project';

const rootReducer = combineReducers({
  project,
  modal,
  user,
  router: routerReducer,
});

export default rootReducer;

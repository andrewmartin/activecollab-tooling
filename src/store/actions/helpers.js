import { bindActionCreators } from 'redux';
import { actions as modalActions } from '../reducers/modal';
import { actions as userActions } from '../reducers/user';
import { actions as projectActions } from '../reducers/project';

export const bindAllActions = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    {
      ...projectActions,
      ...modalActions,
      ...userActions,
    },
    dispatch
  ),
});

import { createAction, handleActions } from 'redux-actions';
import { parseServerError } from 'store/helpers';
export const fetchUserStart = createAction('user/FETCH_USER_START');
export const loginUserError = createAction('user/LOGIN_USER_ERROR');
export const userError = createAction('user/USER_ERROR');
export const logoutUser = createAction('user/LOGOUT_USER');
export const loginUserSuccess = createAction('user/LOGIN_USER_SUCCESS');

export const actions = {
  loginUser: payload => async (dispatch, _getState, { apiService: { api } }) => {
    dispatch(fetchUserStart());

    try {
      const { data } = await api.instance('/login', {
        data: payload,
        method: 'POST',
      });

      const {
        accounts,
        user: { intent },
      } = data;

      const [{ name }] = accounts;

      const {
        data: { token },
      } = await api.instance('/issue-token-intent', {
        data: {
          intent,
          client_name: name,
          client_vendor: name,
        },
        method: 'POST',
      });

      return dispatch(loginUserSuccess({ ...data, token }));
    } catch (error) {
      console.log('error', error);

      return dispatch(
        userError({
          error: parseServerError(error),
        })
      );
    }
  },
  logoutUser: () => dispatch => {
    dispatch(logoutUser());
  },
};

const defaultState = {
  isLoading: false,
  serverError: null,
  token: null,
};

export default handleActions(
  {
    [fetchUserStart]: {
      next: state => {
        return {
          ...state,
          isLoading: true,
          serverError: null,
        };
      },
    },
    [loginUserSuccess]: {
      next: (state, { payload }) => {
        return {
          ...state,
          ...payload,
          isLoading: false,
          serverError: null,
        };
      },
    },
    [logoutUser]: {
      next: () => {
        return defaultState;
      },
    },
    [loginUserError]: {
      next: (state, { payload }) => {
        return {
          ...state,
          serverError: payload.error,
          isLoading: false,
        };
      },
    },
    [userError]: {
      next: (state, { payload }) => {
        return {
          ...state,
          serverError: payload.error,
          isLoading: false,
        };
      },
    },
  },

  defaultState
);

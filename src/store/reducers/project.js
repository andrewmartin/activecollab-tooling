import { createAction, handleActions } from 'redux-actions';
import { parseServerError } from 'store/helpers';

export const fetchProjectStart = createAction('project/FETCH_START');
export const projectError = createAction('project/PROJECT_ERROR');
export const projectsFetchSuccess = createAction('project/PROJECTS_FETCH_SUCCESS');

export const actions = {
  fetchProjects: () => async (dispatch, getState, { apiService: { api } }) => {
    dispatch(fetchProjectStart());

    try {
      const { data } = await api.instance('/projects', {
        headers: {
          'X-Angie-AuthApiToken': getState().user.token,
        },
      });
      return dispatch(projectsFetchSuccess(data));
    } catch (error) {
      console.log('error', error);
      return dispatch(
        projectError({
          error: parseServerError(error),
        })
      );
    }
  },
  logoutUser: () => dispatch => {
    dispatch(logoutUser());
  },
};

const buildItems = payload => {
  const obj = {};

  payload.forEach(project => {
    obj[project.id] = project;
  });

  return obj;
};

const defaultState = {
  isLoading: false,
  serverError: null,
  token: null,
  items: {},
};

export default handleActions(
  {
    [fetchProjectStart]: {
      next: state => {
        return {
          ...state,
          isLoading: true,
          serverError: null,
        };
      },
    },
    [projectsFetchSuccess]: {
      next: (state, { payload }) => {
        return {
          ...state,
          items: { ...buildItems(payload) },
          isLoading: false,
          serverError: null,
        };
      },
    },
    [projectError]: {
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

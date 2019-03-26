import { createAction, handleActions } from 'redux-actions';
import { parseServerError } from 'store/helpers';

export const fetchProjectStart = createAction('project/FETCH_START');
export const projectError = createAction('project/PROJECT_ERROR');
export const projectsFetchSuccess = createAction('project/PROJECTS_FETCH_SUCCESS');
export const projectTimeSuccess = createAction('project/PROJECTS_TIME_SUCCESS');

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
  fetchTime: id => async (dispatch, getState, { apiService: { api } }) => {
    dispatch(fetchProjectStart());

    try {
      const { data } = await api.instance(`/projects/${id}/time-records`, {
        headers: {
          'X-Angie-AuthApiToken': getState().user.token,
        },
      });
      return dispatch(projectTimeSuccess({ data, id }));
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

const appendToItem = (items, id, data) => {
  const newItems = Object.assign({}, items);

  if (newItems[id]) {
    newItems[id] = {
      ...newItems[id],
      ...data,
    };
  }

  return newItems;
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
    [projectTimeSuccess]: {
      next: (state, { payload: { id, data } }) => {
        return {
          ...state,
          items: appendToItem(state.items, id, data),
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

import { createAction, handleActions } from 'redux-actions';
import { parseServerError } from 'store/helpers';
export const fetchProjectStart = createAction('project/FETCH_START');
export const bulkUpdateStart = createAction('project/BULK_UPDATE_START');
export const projectError = createAction('project/PROJECT_ERROR');
export const projectsFetchSuccess = createAction('project/PROJECTS_FETCH_SUCCESS');
export const projectTimeSuccess = createAction('project/PROJECTS_TIME_SUCCESS');
export const projectUpdateBillableSuccess = createAction(
  'project/PROJECT_UPDATE_BILLABLE_SUCCESS'
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
  fetchTime: (id, params) => async (dispatch, getState, { apiService: { api } }) => {
    dispatch(fetchProjectStart());

    try {
      const { data } = await api.instance(`/projects/${id}/time-records/filtered-by-date`, {
        params,
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
  bulkUpdateBillable: (id, items) => async (dispatch, getState, { apiService: { api } }) => {
    dispatch(fetchProjectStart());

    items.forEach(async record => {
      try {
        const { data } = await api.instance(`/projects/${id}/time-records/${record.id}`, {
          data: {
            billable_status: 1,
          },
          method: 'PUT',
          headers: {
            'X-Angie-AuthApiToken': getState().user.token,
          },
        });
        return dispatch(projectUpdateBillableSuccess({ data, id }));
      } catch (error) {
        console.log('error', error);
        return dispatch(
          projectError({
            error: parseServerError(error),
          })
        );
      }
    });
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

const appendToTimeItem = (items, id, { single: data }) => {
  const newItems = Object.assign({}, items);

  if (newItems[id]) {
    const timeRecords = newItems[id].time_records;
    const index = timeRecords.findIndex(i => i.id === data.id);
    newItems[id].time_records[index] = data;
  }

  return newItems;
};

const bulkUpdateItemsLoading = (projectId, items) => {
  const newItems = Object.assign({}, items);

  newItems[projectId] = {
    ...newItems[projectId],
    time_records: newItems[projectId].time_records.map(r => ({
      ...r,
      isUpdating: true,
    })),
  };

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
    [bulkUpdateStart]: {
      next: (state, { payload }) => {
        return {
          ...state,
          items: bulkUpdateItemsLoading(payload, state.items),
          serverError: null,
        };
      },
    },
    [projectUpdateBillableSuccess]: {
      next: (state, { payload: { id, data } }) => {
        return {
          ...state,
          items: appendToTimeItem(state.items, id, data),
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

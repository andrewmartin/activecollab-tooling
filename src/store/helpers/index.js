export const parseServerError = payload => {
  let serverError = 'There was an error.';

  if (payload && payload.response && payload.response.data) {
    const { data } = payload.response;
    serverError = data.error;
  }

  return serverError;
};

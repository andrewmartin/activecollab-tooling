const express = require('express');
const router = express.Router();

const { loginApi, api } = require('./service');

const parseError = error => {
  let errorPayload = {
    message: 'There was an error',
    status: 500,
  };

  const { response } = error;

  if (response) {
    if (response.statusText) {
      errorPayload.message = response.statusText;
    }
    if (response.status) {
      errorPayload.status = response.status;
    }
  }

  return errorPayload;
};

router.post('/login', async (req, res) => {
  try {
    const { data } = await loginApi.instance.post('/external/login', req.body);
    return res.json(data);
  } catch (error) {
    console.error(error);
    const { status, message } = parseError(error);

    return res.status(status).json({ error: message });
  }
});

router.post('/issue-token-intent', async (req, res) => {
  try {
    const { data } = await api.instance.post('/issue-token-intent', req.body);
    return res.json(data);
  } catch (error) {
    console.error(error);
    const { status, message } = parseError(error);

    return res.status(status).json({ error: message });
  }
});

router.get('/projects', async (req, res) => {
  const { ['x-angie-authapitoken']: token } = req.headers;
  try {
    const { data } = await api.instance.get('/projects', {
      headers: {
        'X-Angie-AuthApiToken': token,
      },
    });
    return res.json(data);
  } catch (error) {
    console.error(error);
    const { status, message } = parseError(error);

    return res.status(status).json({ error: message });
  }
});

router.get('/projects/:id/time-records/filtered-by-date', async (req, res) => {
  const { ['x-angie-authapitoken']: token } = req.headers;

  const url = `/projects/${req.params.id}/time-records/filtered-by-date`;

  try {
    const { data } = await api.instance.get(url, {
      params: req.query,
      headers: {
        'X-Angie-AuthApiToken': token,
      },
    });
    return res.json(data);
  } catch (error) {
    console.error(error);
    const { status, message } = parseError(error);

    return res.status(status).json({ error: message });
  }
});

router.put('/projects/:id/time-records/:timeRecordId', async (req, res) => {
  const { ['x-angie-authapitoken']: token } = req.headers;

  const { id, timeRecordId } = req.params;

  const url = `/projects/${id}/time-records/${timeRecordId}`;

  try {
    const { data } = await api.instance(url, {
      params: req.query,
      method: 'PUT',
      data: req.body,
      headers: {
        'X-Angie-AuthApiToken': token,
      },
    });
    return res.json(data);
  } catch (error) {
    console.error(error);
    const { status, message } = parseError(error);

    return res.status(status).json({ error: message });
  }
});

module.exports = router;

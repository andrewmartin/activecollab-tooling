const axios = require('axios');

class Fetch {
  constructor(opts) {
    const { baseUrl, headers } = opts;

    this.instance = axios.create();
    this.instance.defaults.baseURL = baseUrl;

    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    };
  }
}

class ApiService {
  constructor() {
    this.loginApi = new Fetch({
      baseUrl: process.env.API_LOGIN_ROOT,
    });

    this.api = new Fetch({
      baseUrl: process.env.API_ROOT,
    });
  }
}

module.exports = new ApiService();

import axios from 'axios';

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

export default Fetch;

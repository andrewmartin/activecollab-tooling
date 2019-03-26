import Fetch from './index';

class ApiService {
  constructor() {
    this.api = new Fetch({
      baseUrl: process.env.LOCAL_API_ROOT,
    });
  }
}

const service = new ApiService();

export default service;

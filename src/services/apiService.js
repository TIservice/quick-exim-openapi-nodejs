const request = require('../utils/request');

const apiService = {
  async getData(params, apiPath) {
    try {
      const response = await request('GET', apiPath, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  },

  async postData(data, apiPath) {
    try {
      const response = await request('POST', apiPath, {}, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to create data: ${error.message}`);
    }
  },
};

module.exports = apiService;


const request = require('../utils/request');

const apiService = {
  async getExampleData(params) {
    try {
      const response = await request.get('/api/data', { params });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  },

  async createExampleData(data) {
    try {
      const response = await request.post('/api/data', data);
      return response;
    } catch (error) {
      throw new Error(`Failed to create data: ${error.message}`);
    }
  },
};

module.exports = apiService;

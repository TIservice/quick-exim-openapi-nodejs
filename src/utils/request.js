const axios = require('axios');
const config = require('../config');

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout,
  headers: {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

module.exports = request;

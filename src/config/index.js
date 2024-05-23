require('dotenv').config();

const ENVIRONMENTS = {
  production: 'https://openapi.vtopideal.com',
  sandbox: 'https://sandboxapi.vtopideal.com',
};

const config = {
    apiId: process.env.API_ID,
  apiKey: process.env.API_KEY,
  environment: process.env.NODE_ENV || 'sandbox',
  timeout: process.env.TIMEOUT || 5000,
  get baseUrl() {
    return ENVIRONMENTS[this.environment];
  },
};

module.exports = config;

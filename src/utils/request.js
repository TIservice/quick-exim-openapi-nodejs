const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/config');

const createSignature = (method, uri, queryString, body) => {
  const timestamp = Date.now().toString();
  const toSign = `${method}\n${uri}\n${queryString}\n${timestamp}\n${body}`;
  
  if (!config.secret) {
    throw new Error('Secret key is not defined in the configuration.');
  }
  
  const hmac = crypto.createHmac('sha256', config.secret);
  hmac.update(toSign);
  const signature = hmac.digest('base64');
  return {
    signature,
    timestamp
  };
};

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(reqConfig => {
  const { method, url, params, data } = reqConfig;
  const uri = url.split('?')[0];
  const queryString = new URLSearchParams(params).toString();
  const body = data ? JSON.stringify(data) : '';

  const { signature, timestamp } = createSignature(method.toUpperCase(), uri, queryString, body);

  reqConfig.headers['Authorization'] = `HMAC-SHA256 id="${config.apiKeyId}", ts="${timestamp}", sign="${signature}"`;
  
  return reqConfig;
}, error => {
  return Promise.reject(error);
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

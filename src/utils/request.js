const https = require('https');
const { URL } = require('url');
const RequestInfo = require('./sign');
const config = require('../config/config');

const headersToSign = ['user-agent', 'accept'];

const request = (method, path, params, data) => {
  return new Promise((resolve, reject) => {
    const url = new URL(`${config.baseUrl}${path}`);
    url.search = new URLSearchParams(params).toString();

    const body = data ? JSON.stringify(data) : '';
    const date = Date.now().toString();

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Accept': 'application/json'
    };

    const requestInfo = new RequestInfo(url.href, url.hostname, config.apiKeyId, config.secret, method, headers, body, null, headersToSign);
    const authorization = requestInfo.sign(date);

    headers['Authorization'] = authorization;
    headers['x-date'] = date;
    headers['appkey'] = config.apiKeyId;

    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: `${url.pathname}${url.search}`,
      headers,
      rejectUnauthorized: false // Ignore self-signed certificate errors
    };

    // Log the entire request structure before sending
    // console.log('Request structure:', {
    //   method,
    //   url: url.href,
    //   headers,
    //   body: body
    // });

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          reject({
            message: `Request failed with status code ${res.statusCode}`,
            response: {
              status: res.statusCode,
              data: responseData
            }
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
};

module.exports = request;

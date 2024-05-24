const crypto = require('crypto');

const Tool = {
  HmacSHA1Encrypt: (data, secret) => {
    return crypto.createHmac('sha1', secret).update(data).digest();
  },
  base64Encode: (data) => {
    return Buffer.from(data).toString('base64');
  },
  sortQueryParams: (query) => {
    return decodeURI(query).split('&').sort().join('&');
  },
  sortHeaders: (headers) => {
    return Object.keys(headers).sort().map(key => `${key}: ${headers[key]}`).join('\n');
  },
  getMD5: (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
  }
};

module.exports = Tool;

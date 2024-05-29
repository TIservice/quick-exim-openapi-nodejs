const { URL } = require('url');
const Tool = require('./tool');

class RequestInfo {
  constructor(url, host, apiKey, secret, method, headers, requestBody, signature, signHeaders) {
    this.url = url;
    this.host = host;
    this.apiKey = apiKey;
    this.secret = secret;
    this.method = method;
    this.headers = headers;
    this.requestBody = requestBody;
    this.signature = signature;
    this.signHeaders = signHeaders;
  }

  sign(date) {
    const url = new URL(this.url);
    const strSign = `x-data: ${this.signMethod()}\n${this.signPath(url)}\n${this.signQueryParams(url)}\n${date}\n${this.signHeadersString(date)}\n${this.signBody()}`;
    // For debugging
    // console.log(strSign); 
    const hmacStr = Tool.HmacSHA1Encrypt(strSign, this.secret);
    const signature = Tool.base64Encode(hmacStr);
    return `id=${this.apiKey},algorithm=hmac-sha1,headers=${this.getSignHeadersString()},signature=${signature}`;
  }

  signMethod() {
    return this.method ? this.method : '';
  }

  signPath(url) {
    return url.pathname ? url.pathname : '';
  }

  signQueryParams(url) {
    return url.search ? Tool.sortQueryParams(url.search.slice(1)) : '';
  }

  signHeadersString(date) {
    if (this.headers) {
      const map = {};
      for (const [key, value] of Object.entries(this.headers)) {
        if (this.signHeaders.includes(key.toLowerCase())) {
          map[key.toLowerCase()] = value;
        }
      }
      return Tool.sortHeaders(map);
    }
    return '';
  }

  getSignHeadersString() {
    return this.signHeaders.join(';');
  }

  signBody() {
    if (this.requestBody) {
      return Tool.base64Encode(Tool.getMD5(this.requestBody));
    }
    return '';
  }

  setSignHeaders(headers) {
    this.signHeaders = headers;
  }
}

module.exports = RequestInfo;

# OpenAPI SDK

This SDK allows you to interact with the OpenAPI platform using Node.js.

## Installation

```bash
npm install quick-exim-openapi
```

## example
``` javascript
const { apiService, setApiKeyId, setSecret, setEnvironment } = require('quick-exim-openapi');

// Set the environment to production or sandbox
setEnvironment('sandbox');

// Set API key and secret
setApiKeyId('your appKeyId');
setSecret('your Secret');

(async () => {
  try {
    const data = await apiService.getExampleData({ param1: 'value1' });
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const response = await apiService.createExampleData({ key: "value" });
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
})();

```




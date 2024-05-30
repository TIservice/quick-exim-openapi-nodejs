# Quick Exim OpenAPI SDK

This SDK allows you to interact with the OpenAPI platform using Node.js. It provides methods for sending requests and handling responses from the OpenAPI endpoints.

## Features

- Easily interact with OpenAPI platform
- Simple configuration for API keys and environment
- Built-in HMAC-SHA1 request signing for secure API calls

## Installation

You can install the SDK using npm:

```bash
npm install quick-exim-openapi
```

## Configuration

Before you start using the SDK, you need to set up your API key and secret, as well as the environment (production or sandbox).

### Set API Key and Secret

You can set your API key and secret using the `setApiKeyId` and `setSecret` methods.

### Set Environment

You can set the environment using the `setEnvironment` method. The available environments are `production` and `sandbox`.

## Usage

Here is an example of how to use the SDK to interact with the OpenAPI platform.

```javascript
const { apiService, setApiKeyId, setSecret, setEnvironment } = require('quick-exim-openapi');

// Set the environment to production or sandbox
setEnvironment('production');

// Set API key and secret
setApiKeyId('your appKeyId');
setSecret('your Secret');

(async () => {
  try {
    const data = await apiService.getData({ orderType: 'import' }, '/v1/api/data');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }

  try {
    const response = await apiService.postData({ key: "value" }, '/v1/api/data');
    console.log(response);
  } catch (error) {
    console.error('Error creating data:', error.message);
  }
})();
```

## API

### setApiKeyId(apiKeyId)

Sets the API key ID for authentication.

- `apiKeyId` (string): Your API key ID.

### setSecret(secret)

Sets the secret key for authentication.

- `secret` (string): Your secret key.

### setEnvironment(environment)

Sets the environment for the API calls. 

- `environment` (string): The environment to use, either `production` or `sandbox`.

### apiService.getData(params, path)

Fetches data from the specified API endpoint.

- `params` (object): Query parameters for the GET request.
- `path` (string): The API endpoint path.

Returns a promise that resolves with the data from the API.

### apiService.postData(data, path)

Sends a POST request to create data at the specified API endpoint.

- `data` (object): The data to send in the body of the POST request.
- `path` (string): The API endpoint path.

Returns a promise that resolves with the response from the API.

## Example

Here is a complete example of how to use the SDK:

```javascript
const { apiService, setApiKeyId, setSecret, setEnvironment } = require('quick-exim-openapi');

// Set the environment to production or sandbox
setEnvironment('production');

// Set API key and secret
setApiKeyId('your appKeyId');
setSecret('your Secret');

(async () => {
  try {
    const data = await apiService.getData({ orderType: 'import' }, '/v1/api/data');
    console.log('Data fetched successfully:', data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }

  try {
    const response = await apiService.postData({ key: "value" }, '/v1/api/data');
    console.log('Data created successfully:', response);
  } catch (error) {
    console.error('Error creating data:', error.message);
  }
})();
```

## License

This SDK is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## Support

If you have any questions or need support, please open an issue on the [GitHub repository](https://github.com/TIservice/quick-exim-openapi-nodejs/issues).

---

This README provides detailed information on how to install, configure, and use the OpenAPI SDK, as well as how to contribute to the project.
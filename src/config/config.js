const ENVIRONMENTS = {
  production: 'https://openapi.vtopideal.com',
  sandbox: 'https://sandboxapi.vtopideal.com',
};

const config = {
  apiKeyId: '',
  secret: '',
  environment: 'sandbox', // Default environment
  timeout: 5000,
  get baseUrl() {
    return ENVIRONMENTS[this.environment];
  },
  setApiKeyId(id) {
    this.apiKeyId = id;
  },
  setSecret(secret) {
    this.secret = secret;
  },
  setEnvironment(env) {
    if (env !== 'production' && env !== 'sandbox') {
      throw new Error('Environment must be either "production" or "sandbox"');
    }
    this.environment = env;
  }
};

module.exports = config;

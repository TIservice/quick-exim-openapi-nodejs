const exampleService = require('./services/exampleService');
const config = require('./config');

const setEnvironment = (env) => {
  if (env !== 'production' && env !== 'sandbox') {
    throw new Error('Environment must be either "production" or "sandbox"');
  }
  config.environment = env;
};

module.exports = {
  exampleService,
  setEnvironment,
};

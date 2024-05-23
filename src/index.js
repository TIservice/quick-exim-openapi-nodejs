const apiService = require('./services/apiService');
const config = require('./config/config');

const setApiKeyId = (id) => {
  config.setApiKeyId(id);
};

const setSecret = (secret) => {
  config.setSecret(secret);
};

const setEnvironment = (env) => {
  config.setEnvironment(env);
};

module.exports = {
  apiService,
  setApiKeyId,
  setSecret,
  setEnvironment,
};

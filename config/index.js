let nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'production') {
  nodeEnv = 'prod';
} else {
  nodeEnv = 'dev';
}

// eslint-disable-next-line import/no-dynamic-require
const envConfig = require(`./${nodeEnv}.json`);

module.exports = envConfig;

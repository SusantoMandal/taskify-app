let vueAppEnv = process.env.NODE_ENV;

if (vueAppEnv === 'production') {
  vueAppEnv = 'prod';
} else {
  vueAppEnv = 'dev';
}

// eslint-disable-next-line import/no-dynamic-require
const envConfig = require(`./${vueAppEnv}.json`);

module.exports = envConfig;

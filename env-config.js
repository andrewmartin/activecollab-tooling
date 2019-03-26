const parsedEnv = require('dotenv').config().parsed;

module.exports = {
  'process.env.API_ROOT': parsedEnv.API_ROOT,
  'process.env.API_LOGIN_ROOT': parsedEnv.API_LOGIN_ROOT,
  'process.env.LOCAL_API_ROOT': parsedEnv.LOCAL_API_ROOT,
};

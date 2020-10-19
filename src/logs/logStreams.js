const fs = require('fs');
const path = require('path');
const config = require('../common/config');

const getRequestsStream = () => {
  return fs.createWriteStream(path.join(process.cwd(), config.REQUESTS_LOG), {
    flags: 'a'
  });
};

const getErrorsStream = () => {
  return fs.createWriteStream(path.join(process.cwd(), config.ERRORS_LOG), {
    flags: 'a'
  });
};

module.exports = {
  getRequestsStream,
  getErrorsStream
};

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
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

const defaultFormat = (tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  JSON.stringify(req.body)
];

const errorFormat = (tokens, req, res) => [
  ...defaultFormat(tokens, req, res),
  req.error // TODO: investigate how to write stacktrace
];

const requestsLogMiddleware = morgan(
  (tokens, req, res) => {
    return defaultFormat(tokens, req, res).join(' ');
  },
  {
    stream: getRequestsStream(),
    skip(req, res) {
      return res.statusCode >= 400;
    }
  }
);

const errorsLogMiddleware = morgan(
  (tokens, req, res) => {
    return errorFormat(tokens, req, res).join(' ');
  },
  {
    stream: getErrorsStream(),
    skip(req, res) {
      return res.statusCode < 400;
    }
  }
);

module.exports = {
  requestsLogMiddleware,
  errorsLogMiddleware
};

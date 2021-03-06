const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/task/task.router');
const { getErrorsStream } = require('./logs/logStreams');
const {
  requestsLogMiddleware,
  errorsLogMiddleware
} = require('./logs/logMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(requestsLogMiddleware);
app.use(errorsLogMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  req.error = err;
  res.sendStatus(500);
});

process.on('uncaughtException', error => {
  const s = getErrorsStream();
  s.write(`uncaughtException: ${error}${require('os').EOL}`);
});

process.on('unhandledRejection', error => {
  const s = getErrorsStream();
  s.write(`unhandledRejection: ${error}${require('os').EOL}`);
});

module.exports = app;

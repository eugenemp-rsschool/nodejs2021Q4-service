const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const boardRouter = require('./resources/boards/board.router');
const userRouter = require('./resources/users/user.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');

    return;
  }

  next();
});

app.use('/boards', boardRouter);
app.use('/users', userRouter);
app.use('*', (req, res) => {
  res.status(404).end('Invalid Path');
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).end(`${err.name}: ${err.message}`);

    return;
  }

  next();
});

module.exports = app;

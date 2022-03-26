// setup constants
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const app = express();

// setup middleware
// app.use(morgan('combined')); // use this to see maximum information in the logs.
app.use(morgan('tiny')); // use this to see minimal information in the logs.
app.use(express.static(path.join(__dirname, '/public')));

// setup routing
app.get('/', (req, res) => {
  res.send('Hello World');
});

// start web application
app.listen(3000, () => {
  debug(`Listening on port ${chalk.green('3000')}`);
});
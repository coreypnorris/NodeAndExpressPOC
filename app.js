// setup constants
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// setup middleware
// app.use(morgan('combined')); // use this to see maximum information in the logs.
app.use(morgan('tiny')); // use this to see minimal information in the logs.
app.use(express.static(path.join(__dirname, '/public')));

// setup templating engine (EJS)
app.set('views', './src/views');
app.set('view engine', 'ejs');

// setup routing
app.get('/', (req, res) => {
  // res.send('Hello World');
  res.render('index', {title: 'Welcome to Globomantics', data: ['a', 'b', 'c']});
});

// start web application
app.listen(PORT, () => {
  debug(`Listening on port ${chalk.green(PORT)}`);
});
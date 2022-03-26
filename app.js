// init Express
const express = require('express');
const app = express();

// setup routing
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
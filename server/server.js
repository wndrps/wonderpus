const Test = require('./controllers')
const express = require('express');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', Test.getId, Test.getSong, (req, res) => {
  console.log('data received');
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = app;


const Test = require('./controllers')
const express = require('express');
const path = require('path');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/api', Test.getId, Test.getSong, (req, res) => {
  console.log('data received');
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});

module.exports = app;


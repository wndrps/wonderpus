const express = require('express');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = app;


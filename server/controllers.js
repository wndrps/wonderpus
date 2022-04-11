
const fetch = require('node-fetch'); // required v2 of node-fetch to use fetch
const { response } = require('./server');

// create user

// get user

// update user

const Test = {};

// app.use('/', Test.getId, Test.getSong, (req, res) => {...}

Test.getId = (req, res, next) => {
  // how to use the spotify web api reference to search and send back an appropriate ID

  // store the id in res.locals
  return next();
}

Test.getSong = (req, res, next) => {
  const id = "6rqhFgbbKwnb9MLmUQDhG6"
  fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${userAccessToken}`
      Authorization: `Bearer ${process.env.CLIENT_ID}`
    }
  })
  .then(response => response.json())
  .then(response => console.log(response));
  return next();
}

module.exports = Test;

// create user


// get user

// update user

const Test = {};

Test.getSong = (req, res, next) => {
  fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${userAccessToken}`
      Authorization: `Bearer ${process.env.CLIENT_ID}`
    }
  })
  .then(response => response.json())
  .then(({beats}) => {
    beats.forEach((beat, index) => {
      console.log(`Beat ${index} starts at ${beat.start}`);
    })
    return next();
  })
}

module.exports = Test;

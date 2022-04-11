const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User model

// Song model
const songSchema = new Schema({
    track: {type: String, required: true},
    artist: {type: String, required: true},
    previewLink: {type: String, required: true},
    dataObj: {type: Object, required: true}
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song; 



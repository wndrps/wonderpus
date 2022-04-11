const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User model

// Song model
const songSchema = new Schema({
    track: {type: String, required: true}
})

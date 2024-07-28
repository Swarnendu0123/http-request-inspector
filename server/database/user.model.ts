const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    genratedURL: String,
    requests: Array,
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

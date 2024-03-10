const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Plugin for simplifying username and password authentication with Passport
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

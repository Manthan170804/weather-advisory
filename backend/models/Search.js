const mongoose = require('mongoose');
const Schema = new mongoose.Schema({ query:String, location:String, createdAt:Date });
module.exports = mongoose.model('Search', Schema);
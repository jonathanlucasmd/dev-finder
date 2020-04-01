const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const devSchema = new mongoose.Schema({
  name: String,
  avatar_url: String,
  github_username: String,
  bio: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});


module.exports = mongoose.model('Dev', devSchema);

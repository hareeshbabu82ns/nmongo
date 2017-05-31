const mongoose = require('mongoose');


var User = mongoose.model('User', {
  name: {
    type: String,
    trim: true,
    minlength: 1,
    require: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 5
  }
});

module.exports = User;
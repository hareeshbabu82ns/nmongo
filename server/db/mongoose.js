const mongoose = require('mongoose');

//tell mongoose to user native Promise over callbacks
mongoose.Promise = global.Promise;


//connect to DB collection
mongoose.connect("mongodb://localhost:27017/Todos");

module.exports = mongoose;
const mongoose = require('mongoose');

//tell mongoose to user native Promise over callbacks
mongoose.Promise = global.Promise;


//connect to DB collection
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose;
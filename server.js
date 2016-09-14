var dotenv = require('dotenv');
dotenv.config();

var mongoose = require('mongoose');

var app = require('./server/routes');
var port = require('./server/port');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/best_friends_db');

app.listen(port, function () {
    console.log('Example app listening ' + port);
});

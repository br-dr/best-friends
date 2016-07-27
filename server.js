var express = require('express');
var app = express();
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
mongoose.connect('process.env.MONGO_DB');

app.use(express.static(__dirname + '/client'));

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.listen(port, function () {
  console.log('Example app listening ' + port);
});
var express = require('express');
var app = express();
app.use(express.static(__dirname + './public'));
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening ' + port);
});
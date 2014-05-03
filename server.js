var express = require('express');
var connect = require('connect');

var app = express();

var data = [];

app.use(express.static('./dist'));
app.use(connect.bodyParser());

app.get('/comments', function (req, res) {
  res.end(JSON.stringify(data));
});

app.post('/comments', function (req, res) {
  data.push(req.body);
  res.end(JSON.stringify(data));
});

app.listen(8080);

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var Trie = require('trie');
var trie = new Trie();

app.get('/', function(req, res, next){
  res.json({msg: 'Dictionary-API'});
});

app.get('/search/:prefix', function(req, res, next){
  var prefix = req.params.prefix;
  var result = trie.autoComplete(prefix);
  res.json(result);
});

app.post('/dictionary/', function(req, res, next){
  var words = req.body.words;
  words.forEach(function (w){
    //All in lower case
    w = w.toLowerCase();
    trie.insert(w);
  });
  res.send(200);
});


app.listen(8000);

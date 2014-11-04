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
  console.log(req.params.prefix);
  var result = trie.autoComplete(prefix);
  console.log("trie.autoComplete:", result);
  res.json(result);
});

app.post('/dictionary/', function(req, res, next){
  console.log(req.body.words);
  var words = req.body.words;
  words.forEach(function (w){
    trie.insert(w);
  });
  res.send(200);
});


app.listen(8000);

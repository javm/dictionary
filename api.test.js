var superagent = require('superagent');
var expect = require('expect.js');
var port = '8000';
before(function(done){
  var words = ["hell", "hello"];
  superagent.post('http://localhost:8000/dictionary/')
    .send({words: words})
    .end(function (err, res){
      if(err)
	console.log(err);
      console.log(res);
      done();
    });
});

describe('dictionary-api', function(){

  it('gets the index', function(done){
    superagent.get('http://localhost:'+port+'/')
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	expect(res.body).to.be.an('object');
	done();
      });
  });

  it('gets the words that start with a prefix', function(done){
    var prefix = "hell";
    superagent.get('http://localhost:'+port+'/search/'+prefix)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res);
	expect(res.body.length).to.be.above(0);
	expect(res.body.indexOf("hello")).to.be.above(-1);
	expect(res.body.indexOf("hell")).to.be.above(-1);
	done();
      });
  });

  it('puts words in the dictionary', function(done){
    var words = ["europe", "european"];
    superagent.post('http://localhost:'+port+'/dictionary/')
      .send({words: words})
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res);
	done();
      });
  });

});


var miniware = require('../src');

describe('miniware', function(){

  it('should be a function', function(done) {
    miniware.should.be.a('function');
    done();
  })

  it('should stack up and run functions', function(done) {

    var stack = miniware();

    stack.use(function(req, reply, next){
      req.url.should.equal('/hello');
      next();
    })

    stack.use(function(req, reply, next){
      reply(null, 20);
    })

    stack({
      url:'/hello'
    }, function(error, result){
      result.should.equal(20);
      done();
    })

  })

  it('return with an error if nothing handled the request or there is no out function', function(done) {
    var stack = miniware();

    var hit = false;
    stack.use(function(req, reply, next){
      hit = true;
      next();
    })

    stack({
      url:'/hello'
    }, function(error, result){
      error.should.equal('404:request not handled');
      done();
    })
  })

  it('should run a second app as part of another stack', function(done) {

    var stack1 = miniware();
    var stack2 = miniware();

    var checks = {};

    stack1.use(function(req, reply, next){
      checks.a = true;
      next();
    })

    stack1.use(stack2);

    stack2.use(function(req, reply, next){
      checks.b = true;
      req.url.should.equal('/hello');
      reply(null, 34);
    })

    stack1({
      url:'/hello'
    }, function(error, result){
      result.should.equal(34);
      done();
    })

  })

})

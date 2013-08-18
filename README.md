miniware
========

The smallest middleware implementation in the world

## installation

	$ npm install miniware

## usage

A new miniware object represents a stack of functions to cycle through just like connect middleware.

The only different is that req is a pure javascript object and rep becomes **reply** which is a standard node.js callback function.

An example of creating a tiny middleware stack and running a request through it.

```js
var miniware = require('miniware');

var tinyapp = miniware();

tinyapp.use(function(req, reply, next){
  req.url.should.equal('/hello');
  next();
})

tinyapp.use(function(req, reply, next){
  reply(null, 20);
})

tinyapp({
  url:'/hello'
}, function(error, result){
  result.should.equal(20);
})

```

## licence

MIT
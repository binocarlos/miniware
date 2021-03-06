/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/**
 * Module dependencies.
 */

module.exports = function mini_factory(){

  /*
  
    our middleware stack
    
  */
  var stack = [];

  var handler = function(req, reply, out){
    function exitout(){
      if(out){
        out(req, reply);
      }
      else{
        reply('404:request not handled');
      }
    }

    var usestack = [].concat(stack);

    function run_stack(){
      if(usestack.length<=0){
        exitout();
      }
      else{
        var handle = usestack.shift();

        handle(req, reply, function(){
          run_stack();
        })
      }
    }

    run_stack();
  }

  handler.use = function(fn){
    if(typeof(fn)!=='function'){
      throw new Error(fn + ' must be a function')
    }
    stack.push(fn);
    return this;
  }

  handler.before = function(fn){
    if(typeof(fn)!=='function'){
      throw new Error(fn + ' must be a function')
    }
    stack.unshift(fn);
  }

  return handler;
}
var fs = require('fs');
var mustache = require('mustache');

var Logger = require('../logger');

var code = function(){
    throw new Error('Template not yet ready');
}
fs.readFile('./lib/evaluators/js-evaluator.mustache', { 'encoding': 'utf-8' }, function(error, data){
    if (error) { throw error; }
    code = mustache.compile(data);
});

module.exports = function(source, callback){
    var block;
    try {
	block = Function(code({ code: source }));
    } catch (error) {
	block = function(){ this.finish() }
    }
    block.call(new Logger(callback));
}

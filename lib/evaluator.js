var fs = require('fs');
var mustache = require('mustache');

var Logger = require('./logger');

var evaluator = module.exports = {};

var code = function(){
    throw new Error('Template not yet ready');
}
fs.readFile('./lib/js-evaluator.mustache', { 'encoding': 'utf-8' }, function(error, data){
    if (error) { throw error; }
    code = mustache.compile(data);
});

evaluator.evaluate = function(source, callback){
    var block;
    try {
	block = Function(code({ code: source }));
    } catch (error) {
	block = function(){ this.finish() }
    }
    block.call(new Logger(callback));
}

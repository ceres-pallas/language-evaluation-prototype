var fs = require('fs');
var mustache = require('mustache');

var jsEvaluator = require('./evaluators/js');

var evaluator = module.exports = {};

evaluator.evaluate = jsEvaluator;

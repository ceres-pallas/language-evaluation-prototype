var Logger = require('../logger');

defaultEvaluator = module.exports = function(code, callback){
    var logger = new Logger(callback);
    logger.log('no evaluator for language');
    logger.finish();
};

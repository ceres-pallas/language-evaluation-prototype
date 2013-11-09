wrap = function(evaluator){
    return {
	evaluate: evaluator
    };
}

var evaluators = {
    'javascript': wrap(require('./evaluators/js')),
    'default': wrap(require('./evaluators/default'))
}

var evaluator = module.exports = function(language){
    return evaluators[language || 'default'] || evaluators['default'];
};

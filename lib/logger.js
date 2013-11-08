var Logger = module.exports = function(callback){
    this.callback = callback;
    this.logs = [];
    this.errorOccured = false;
}
Logger.prototype.error = function(reason){
    this.errorOccured = true;
    this.log(reason);
}
Logger.prototype.log = function(message){
    this.logs.push(message);
}
Logger.prototype.finish = function(){
    this.callback.call(this, {
	error: this.errorOccured,
	message: this.logs.join("\n"),
    });
}

(function(CodeMirror){
    var socket = io.connect(window.location.origin);

    var code = document.getElementById('code');

    var result = document.getElementById('result');
    result.className = 'success';

    var editor = CodeMirror.fromTextArea(code,{
	mode: 'javascript',
	lineNumbers: true
    });

    editor.on('change', function(instance, change){
	socket.emit('change', {
	    timestamp: (new Date()).timestamp,
	    code: instance.getValue()
	});
    });

    socket.on('result', function(data){
	result.innerHTML = '';
	result.className = data.error ? 'failure' : 'success';
	data.message.split('\n').forEach(function(log){
	    var line = document.createElement('div');
	    line.textContent = '' + log;
	    result.appendChild(line);
	});
    });

    editor.setValue('console.log(\'Hello World\');');
})(CodeMirror);

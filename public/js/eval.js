(function(CodeMirror){
    var socket = io.connect(window.location.origin);

    var language = document.getElementById('language');

    var code = document.getElementById('code');

    var result = document.getElementById('result');
    result.className = 'success';

    [{ value: 'js', text: 'JavaScript' }, { value: 'py', text: 'Python' }].forEach(function(data){
	var option = document.createElement('option');
	option.setAttribute('value', data.value);
	option.text = data.text;
	language.appendChild(option);
    });

    var editor = CodeMirror.fromTextArea(code,{
	mode: 'javascript',
	lineNumbers: true
    });

    editor.on('change', function(instance, change){
	socket.emit('change', {
	    language: language.value,
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

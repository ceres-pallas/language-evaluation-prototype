(function(CodeMirror){
    var socket = io.connect(window.location.origin);

    var language = document.getElementById('language');

    var code = document.getElementById('code');

    var result = document.getElementById('result');
    result.className = 'success';

    var editor = CodeMirror.fromTextArea(code,{
	mode: 'javascript',
	lineNumbers: true
    });

    [{ value: 'javascript', text: 'JavaScript' }, { value: 'python', text: 'Python' }].forEach(function(data){
	var option = document.createElement('option');
	option.setAttribute('value', data.value);
	option.text = data.text;
	language.appendChild(option);
    });
    language.addEventListener('change', function(){
	editor.setOption('mode', language.value);
    });
    language.addEventListener('change', function(){
	sendCode();
    });

    var sendCode = function(){
	socket.emit('change', {
	    language: language.value,
	    timestamp: (new Date()).timestamp,
	    code: editor.getValue()
	});
    };

    editor.on('change', sendCode);

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

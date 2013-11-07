(function(CodeMirror){
    var socket = io.connect(window.location.origin);

    var code = document.getElementById('code');
    code.textContent = '/* no comment */'

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
})(CodeMirror);

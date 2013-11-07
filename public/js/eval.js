(function(CodeMirror){
    var code = document.getElementById('code');
    code.textContent = '/* no comment */'

    var editor = CodeMirror.fromTextArea(code,{
	mode: 'javascript',
	lineNumbers: true
    });
})(CodeMirror);

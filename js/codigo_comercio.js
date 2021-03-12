var codeFile = new XMLHttpRequest();
var codeText = "archivo no encontrado";
codeFile.onreadystatechange = function () {
    if (codeFile.readyState === XMLHttpRequest.DONE && codeFile.status == 200) {
        codeText = codeFile.responseText;
    }
    document.getElementById('codigo-pre').innerHTML = codeText;
}
codeFile.open("GET", 'code/testFinalDefinitivo.txt', true);
codeFile.send(null);

var consoleFile = new XMLHttpRequest();
var consoleText = "archivo no encontrado";
consoleFile.onreadystatechange = function () {
    if (consoleFile.readyState === XMLHttpRequest.DONE && consoleFile.status == 200) {
        consoleText = consoleFile.responseText;
    }
    document.getElementById('consola-pre').innerHTML = consoleText;
}
consoleFile.open("GET", 'code/consola.txt', true);
consoleFile.send(null);
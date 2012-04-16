$(document).ready(function() {
    $(document).one("DOMNodeInserted", "div.oneFile" , function() {        
        Editor = CodeMirror.fromTextArea($("div.oneFile textarea#content")[0], {
            mode: "javascript",
            onChange: function(editor) {
                changeLocal = true;
                Files.update(Session.get("showFile"), {$set: {content: editor.getValue()}});
            }
        });
    });
});
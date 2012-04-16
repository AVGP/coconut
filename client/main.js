var Files = new Meteor.Collection("files");
var Editor = null, changeLocal = false;

Template.main.showFile = function() {
    return Session.get("showFile") || false;
};

Template.list.files = function() {
    return Files.find({});
};

Template.list.events = {
    "click #addfile": function() {
        var name = window.prompt("File name:", "noname.txt");
        Files.insert({filename: name, content: "Hello world!"});
    },
};

Template.file.events = {
    "click" : function() {
        Session.set("showFile", this._id);
        var cursor = Files.find({_id: this._id});
        cursor.observe({changed: function(newData) {
            if(changeLocal) {
                changeLocal = false;
                return;
            }
            Editor.setValue(newData.content);
        }});
    }
}

Template.oneFile.content = function () {
    var file = Files.findOne({_id: Session.get("showFile")}, {reactive: false});
    return file && file.content;
};

Template.oneFile.events = {
    "click #back": function() {
        Session.set("showFile", false);
    }
};
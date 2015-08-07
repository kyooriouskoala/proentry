var clearFilesFromSession, getCollection, getIcon, getTemplate, refreshFileInput,
    uploader = new ReactiveVar();

AutoForm.addInputType('slingshotFileUpload', {
    template: 'afSlingshot'
});

refreshFileInput = function(name) {
    var callback;
    callback = function() {
        var value;
        value = $('input[name="' + name + '"]').val();
        return Session.set('fileUpload[' + name + ']', value);
    };
    return setTimeout(callback, 10);
};

getIcon = function(file) {
    var icon;
    if (file) {
        file = file.toLowerCase();
        icon = 'file-o';
        if (file.indexOf('youtube.com') > -1) {
            icon = 'youtube';
        } else if (file.indexOf('vimeo.com') > -1) {
            icon = 'vimeo-square';
        } else if (file.indexOf('.pdf') > -1) {
            icon = 'file-pdf-o';
        } else if (file.indexOf('.doc') > -1 || file.indexOf('.docx') > -1) {
            icon = 'file-word-o';
        } else if (file.indexOf('.ppt') > -1) {
            icon = 'file-powerpoint-o';
        } else if (file.indexOf('.avi') > -1 || file.indexOf('.mov') > -1 || file.indexOf('.mp4') > -1) {
            icon = 'file-movie-o';
        } else if (file.indexOf('.png') > -1 || file.indexOf('.jpg') > -1 || file.indexOf('.gif') > -1 || file.indexOf('.bmp') > -1) {
            icon = 'file-image-o';
        } else if (file.indexOf('http://') > -1 || file.indexOf('https://') > -1) {
            icon = 'link';
        }
        return icon;
    }
};

getTemplate = function(file) {
    var template;
    file = file.toLowerCase();
    template = 'fileThumbIcon';
    if (file.indexOf('.jpg') > -1 || file.indexOf('.png') > -1 || file.indexOf('.gif') > -1) {
        template = 'fileThumbImg';
    }
    return template;
};

clearFilesFromSession = function() {
    return _.each(Session.keys, function(value, key, index) {
        if (key.indexOf('fileUpload') > -1) {
            return Session.set(key, '');
        }
    });
};

getCollection = function(context) {
    if (typeof context.atts.collection === 'string') {
        context.atts.collection = FS._collections[context.atts.collection] || window[context.atts.collection];
    }
    return context.atts.collection;
};

AutoForm.addHooks(null, {
    onSuccess: function() {
        return clearFilesFromSession();
    }
});

Template.afSlingshot.destroyed = function() {
    var name;
    name = this.data.name;
    return Session.set('fileUpload[' + name + ']', null);
};

Template.afSlingshot.events({
    "change .file-upload": function(e, t) {
        var files, uploadCallback, upload;
        files = e.target.files;
        if (typeof files === "undefined" || (files.length === 0)) {
            return;
        }
        upload = new Slingshot.Upload(t.data.atts.slingshotdirective);
        uploadCallback = function(file) {
            uploader.set(upload);
            return upload.send(file, function(err, downloadUrl) {
                uploader.set();
                var name;
                if (err) {
                    return console.log(err);
                } else {
                    name = $(e.target).attr('file-input');
                    $('input[name="' + name + '"]').val(downloadUrl);
                    Session.set('fileUploadSelected[' + name + ']', file.name);
                    return refreshFileInput(name);
                }
            });
        };
        if (t.data.atts.onBeforeUpload) {
            return t.data.atts.onBeforeUpload(files, uploadCallback);
        } else {
            return _.each(files, function(file) {
                return uploadCallback(file);
            });
        }
    },
    'click .file-upload-clear': function(e, t) {
        var name;
        name = $(e.currentTarget).attr('file-input');
        $('input[name="' + name + '"]').val('');
        return Session.set('fileUpload[' + name + ']', 'delete-file');
    }
});

Template.afSlingshot.helpers({
    /*isUploading: function () {
        return Boolean(uploader.get());
    },
    progress: function () {
        var upload = uploader.get();
        if (upload){
            return Math.round(upload.progress() * 100);
        }    
    },*/
    collection: function() {},
    label: function() {
        return this.atts.label || 'Choose file';
    },
    removeLabel: function() {
        return this.atts['remove-label'] || 'Remove';
    },
    accept: function() {
        return this.atts.accept || '*';
    },
    fileUploadAtts: function() {
        var atts;
        atts = _.clone(this.atts);
        delete atts.collection;
        delete atts.onBeforeUpload;
        return atts;
    },
    fileUpload: function() {
        var af, doc, file, filename, name, obj, parentData, src, upload;
        af = Template.parentData(1)._af;
        name = this.atts.name;
        upload = new Slingshot.Upload(this);
        if (af && af.submitType === 'insert') {
            doc = af.doc;
        }
        parentData = Template.parentData(0).value || Template.parentData(4).value;
        if (Session.equals('fileUpload[' + name + ']', 'delete-file')) {
            return null;
        } else if (!!Session.get('fileUpload[' + name + ']')) {
            file = Session.get('fileUpload[' + name + ']');
        } else if (parentData) {
            file = parentData;
        } else {
            return null;
        }
        if (file !== '' && file) {
            if (file.length === 17) {
                filename = Session.get('fileUploadSelected[' + name + ']');
                obj = {
                    template: 'fileThumbIcon',
                    data: {
                        filename: filename,
                        icon: getIcon(filename)
                    }
                };
                return obj;
            } else {
                filename = file;
                src = filename;
            }
        }
        if (filename) {
            obj = {
                template: getTemplate(filename),
                data: {
                    src: src,
                    filename: filename,
                    icon: getIcon(filename)
                }
            };
            return obj;
        }
    },
    fileUploadSelected: function(name) {
        return Session.get('fileUploadSelected[' + name + ']');
    },
    isUploaded: function(name, collection) {
        var file, isUploaded;
        file = Session.get('fileUpload[' + name + ']');
        isUploaded = false;
        if (file && file.length === 17) {
            isUploaded = doc.isUploaded();
        } else {
            isUploaded = true;
        }
        return isUploaded;
    },
    getFileByName: function(name, collection) {
        var file;
        file = Session.get('fileUpload[' + name + ']');
        if (file && file.length === 17) {
            console.log(doc);
            return doc;
        } else {
            return null;
        }
    }
});
//var uploader = new ReactiveVar();
//
//Template.productForm.helpers({
//    progress: function () {
//        var upload = uploader.get();
//        if (upload)
//            return Math.round(upload.progress() * 100);
//    }/*,
//    url: function () {
//        //If we are uploading an image, pass true to download the image into cache.
//        //This will preload the image before using the remote image url.
//        return this.uploader.url(true);
//    }*/
//});

//Template.productForm.events({
//    "change #file-picture_url": function (event, template) {
//        var upload = new Slingshot.Upload("myFileUploads"),
//            uploadInputField = document.getElementById('file-picture_url'),
//            file = uploadInputField.files[0];
//
//        if (file) {
//            $('#productForm button[type="submit"]').prop('disabled', true);
//            upload.send(file, function (error, url) {
//                uploader.set();
//                if (!error) {
//                    //TODO Call your method here
//                    console.log("Success!");
//                    console.log("Image available at: " + url);
//                } else {
//                    alert(error.message);
//                }
//            });
//        }
//
//        uploader.set(upload);
//    }
//});
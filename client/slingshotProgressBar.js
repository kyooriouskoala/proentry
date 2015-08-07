Template.productForm.helpers({
    progress: function () {
        console.log(Math.round(this.uploader.progress() * 100));
        //return Math.round(this.uploader.progress() * 100);
    }
});
/*Template.product.helpers({
    progress: function () {
        var upload = uploader.get();
        if (upload)
            return Math.round(upload.progress() * 100);
    }
});*/
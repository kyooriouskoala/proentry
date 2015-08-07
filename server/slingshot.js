/*
Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    maxSize: null,
});


*/
Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
    AWSAccessKeyId: Meteor.settings.private.s3.AWSAccessKeyId,
    AWSSecretAccessKey: Meteor.settings.private.s3.AWSSecretAccessKey,
    bucket: "folhas",
    acl: "public-read",
    region: "ap-southeast-1",

    authorize: function () {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }

        return true;
    },
    key: function (file) {
        //Store file into a directory by the user's username.
        return "best/" + file.name;
    }
});
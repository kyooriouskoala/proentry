Schemas = {};

Schemas.Products = new SimpleSchema({
    productTitle: {
        type: String
    },
    picture_url: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'slingshotFileUpload',
                slingshotdirective: 'myFileUploads'
            }
        }
    },
    createdBy: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    published: {
        type: Boolean,
        autoValue: function() {
            if (this.isInsert) {
                return true;
            }
        }
    },
    editedBy: {
        type: String,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    },
    editedAt: {
        type: Date,
        autoValue: function() {
            if (this.isUpdate) {
                return new Date;
            }
        },
        denyInsert: true,
        optional: true
    }
});

Products.attachSchema(Schemas.Products);
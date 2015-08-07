Meteor.methods({
    addProduct: function (doc) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        
        if (Roles.userIsInRole(this.userId, 'admin')) {
            Products.insert(doc);
        } else {
            console.log("You're not authorized to do this action.");
        }
    },
    deleteProduct: function (productID){
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        if (Roles.userIsInRole(this.userId, 'admin')) {
            Products.remove({_id: productID});
        } else {
            console.log("You're not authorized to do this action.");
        }
    },
    updateProduct: function (doc, doc_id) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        if (Roles.userIsInRole(this.userId, 'admin')) {
            
            check(doc, Products.simpleSchema());
            
            Products.update(
                { _id: doc_id },
                doc,
                { validationContext: "productForm" }
            );
            
            if (Meteor.isClient) { 
                $(".productInfo.editing").find(".menu a.cancel").trigger("click");
            }
            

        } else {
            console.log("You're not authorized to do this action.");
        }
    }
});
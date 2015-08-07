Template.product.onCreated(function() {
    var instance = this;
    
    instance.enlargeLayout = new ReactiveDict();
    instance.enlargeLayout.set('enlargeLayout', null);
    
    instance.editProduct = new ReactiveDict();
    instance.editProduct.set('editProduct', null);
});

Template.product.helpers({
    productSchema: function() {
        return Schemas.Products;
    },
    editProduct: function() {
        return Template.instance().editProduct.equals("editProduct", this._id);
    },
    enlargeLayout: function() {
        return Template.instance().enlargeLayout.equals("enlargeLayout", this._id);
    },
    progress: function () {
        return Math.round(this.uploader.progress() * 100);
    }
});

Template.product.events({
    'click .productInfo button[type="delete"]': function() {
        Meteor.call("deleteProduct", this._id);
    },
    'click .productInfo button[type="edit"]': function(e, t) {  
        $(".productInfo .menu a.cancel").trigger("click");
        t.enlargeLayout.set("enlargeLayout", this._id);
        t.editProduct.set('editProduct', this._id);
    },
    'click .productInfo .menu a.cancel': function(e, t) {
        t.editProduct.set('editProduct', null);
    },
    'click .menu a.cancel': function(e, t) {
        var me = $(e.target);
        $(".help-block").remove();
        t.enlargeLayout.set("enlargeLayout", null);
    },
    'click table tbody tr:first-child': function(e){
        var me = $(e.target);
        me.parent().parent().find("tr.display").toggleClass("hide");
    }
});
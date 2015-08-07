Template.recentlyAddedProducts.onCreated(function() { 
    this.subscribe('recently_added');
});

Template.recentlyAddedProducts.helpers({
    products: function () {
        return recentlyAddedProducts();
    }
});
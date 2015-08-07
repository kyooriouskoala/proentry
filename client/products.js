Template.products.created = function () {
    
    // 1. Initialization
    var instance = this;

    // initialize the reactive variables
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(5);

    // 2. Autorun

    // will re-run when the "limit" reactive variables changes
    this.autorun(function () {

        var limit = instance.limit.get();

        //console.log("Asking for "+limit+" products…")

        // subscribe to the products publication
        var subscription = instance.subscribe('products', limit);

        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
            //console.log("> Received "+limit+" products. \n\n")
            instance.loaded.set(limit);
        } else {
            //console.log("> Subscription is not ready yet. \n\n");
        }
    });

    // 3. Cursor

    instance.products = function() { 
        return Products.find({}, {sort: {createdAt: -1}, limit: instance.loaded.get()});
    }

};

Template.products.helpers({
    // the products cursor
    products: function () {
        return Template.instance().products();
    },
    // are there more products to show?
    hasMoreProducts: function () {
        return Template.instance().products().count() >= Template.instance().limit.get();
    },
    productSchema: function() {
        return Schemas.Products;
    }
});

Template.products.events({
    'click .load-more': function (event, instance) {
        event.preventDefault();

        // get current value for limit, i.e. how many products are currently displayed
        var limit = instance.limit.get();

        // increase limit by 5 and update it
        limit += 5;
        instance.limit.set(limit)
    }
});
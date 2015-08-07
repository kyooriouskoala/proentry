recentlyAddedProducts = function() {
    return Products.find({ published: true }, {sort: {createdAt: -1}, limit: 5});
}

productsFound = function(productID) {
    return Products.find(
        { 
            _id: productID,
            published: true 
        }
    );
}
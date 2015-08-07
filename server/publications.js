//Meteor.publish('productTitles', getProductTitles);

Meteor.publish('recently_added', function(){
    return recentlyAddedProducts();
});
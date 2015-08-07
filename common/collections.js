Products = new Mongo.Collection("proentry");

if (Meteor.isServer) {
    Products._ensureIndex({
        "productTitle": "text"
    });
}
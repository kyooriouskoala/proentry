Template.admin.helpers({
    firstName: function() {
        return Meteor.user().profile.firstName;
    }
});


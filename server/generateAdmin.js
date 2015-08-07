Meteor.methods({
    generateAdmin: function(){
        var users = [
            {username:"admin",email:"admin@example.com",roles:['admin']}
        ];

        _.each(users, function (user) {
            var id;

            id = Accounts.createUser({
                email: user.email,
                password: "apple1",
                username: user.username
            });

            if (user.roles.length > 0) {
                // Need _id of existing user record so this call must come 
                // after `Accounts.createUser` or `Accounts.onCreate`
                Roles.addUsersToRoles(id, user.roles);
            }

        });
    }
});
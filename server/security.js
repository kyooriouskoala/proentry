Products.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Products.permit('update').ifHasRole('admin').onlyProps(['currentDeal']).apply();

Accounts.onCreateUser(function(options, user) {
    user.username = user.username.toLowerCase();
    if (options.profile)
        user.profile = options.profile;
    return user;
});
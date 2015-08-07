Template.registerHelper('currentRouteIs', function (route) { 
    return Router.current().route.getName() === route; 
});

Template.registerHelper('currentRouteIsPartOf', function (routes) { 
    var routeArr = routes.split(','),
        activateCurrentPage;

    for(var i = 0; i < routeArr.length; i++) {
        routeArr[i] = routeArr[i].replace(/^\s*/, "").replace(/\s*$/, "");
        if(Router.current().route.getName() === routeArr[i]){
            var activateCurrentPage = true;
        }
    }

    return activateCurrentPage;
});
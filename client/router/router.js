Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.route('/signin', function(){
    this.render('signin');
});

Router.route('/admin', function(){
    this.render('admin');
});

Router.route('/', function(){
    this.render('home');
}, {name: 'homePage'});

Router.plugin('ensureSignedIn', {
    only: ['admin']
});
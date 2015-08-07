Package.describe({
  name: "kyooriouskoala:af-ss",
  summary: "File upload for AutoForm with Slingshot",
  description: "File upload for AutoForm with Slingshot",
  version: "0.0.1",
  git: ""
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use(
    [
    'coffeescript',
    'underscore',
    'templating',
    'less',
    'aldeed:autoform@5.1.2',
    'edgee:slingshot@0.7.1',
    'reactive-var'    
    ],
    'client');

  api.addFiles('lib/client/autoform-slingshot.html', 'client');
  api.addFiles('lib/client/autoform-slingshot.less', 'client');
  api.addFiles('lib/client/autoform-slingshot.js', 'client');
}); 

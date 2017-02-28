// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();
// Require keystone
var keystone = require('keystone');

var args = require('minimist')(process.argv.slice(2));
	
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'MFDPatientCare',
	'brand': 'MFDPatientCare',
	'port': 5000,

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'i7NZZ2o]>V!]X;t4XTM(%=/,W:)dWan5epq0!#:g%XSruaH5?q*/I/x:m(mQ(<h|',

	'signin url': '/keystone/signin',
	'signin redirect': '/',
	'signout redirect': '/keystone/signin',
	'signout url': '/keystone/signout'
	
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	title: 'MFDPatientCare',
	signout_url: keystone.get('signout url')
});
keystone.set('google api key', 'AIzaSyAr1qAP9HAR9nZpTyBa2nPlpvZOCwxfbRc');
keystone.set('google server', 'AIzaSyDuwcWqGs6nAnnCr4aykqxUrILpYih209M');
// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'users': 'users',
	'patients': 'patients',
	'data': ['questions', 'answers', 'comments']
});

// Google Maps API Config
keystone.set('google api key', 'AIzaSyAr1qAP9HAR9nZpTyBa2nPlpvZOCwxfbRc');
keystone.set('google server api key', 'AIzaSyCxo8Li0ILh5O30duXohrXowV3SqU3mqZ0');
keystone.set('default region', 'us');


// Mandrill API Configs
keystone.set('mandrill api key', 'HQgwQwPutKcYLX-x0fBH7Q');
keystone.set('mandrill username', 'rdbcasillas11@gmail.com');


// Time-Elapsed Notifications
keystone.set('alert-elapse', 3); // days

var check_elapse = require('./scheduled/check_elapse');
check_elapse(keystone);

// Start Keystone to connect to your database and initialise the web server
// Or start a REPL console to perform Mongoose Queries
if (args.repl) {
	var monrepl  = require('./node_modules/mongoose-repl/lib-js/mongoose-repl')
	var schemas = new Object();
	var getSchema = function(m) { schemas[m] = keystone.lists[m].schema;};
	Object.keys(keystone.lists).map(getSchema);
	monrepl.run(schemas, keystone.mongoose, 'localhost/mfdpatientcare')
}
else {
	keystone.start();
}

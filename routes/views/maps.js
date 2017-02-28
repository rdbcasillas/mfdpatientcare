var keystone = require('keystone');
var getPatientAndStatusList = require('../queries/getPatientAndStatusList');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
        locals = res.locals;
    
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'map';

    getPatientAndStatusList(keystone, function(patients){
		console.log(patients);
		view.render('maps', {key : patients}); 
    });
};


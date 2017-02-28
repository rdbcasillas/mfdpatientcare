var keystone = require('keystone');
var mongoose = require('../../node_modules/keystone/node_modules/mongoose');
var getPatientAndStatusList = require('../queries/getPatientAndStatusList');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
        locals = res.locals;
    
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'list';

    getPatientAndStatusList(keystone, function(patients){
		// Render the view
		  view.render('sb_table', {key : patients}); 
    });

    // Render the view
    
    
    
};

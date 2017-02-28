var keystone = require('keystone');
var getPatientList = require('../queries/getPatientList');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
        locals = res.locals;
    
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'blog';

    getPatientList(keystone, function(err, patientList){
		// Render the view
		view.render('sb_list', {patients : patientList}); 
    });
};


var keystone = require('keystone');
var getPatientLongitudinalData = require('../queries/getPatientLongitudinalData');

 

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
        locals = res.locals;
    
    locals.section = 'history';
        
	getPatientLongitudinalData(keystone, req.params.patient, function(patientObj, fields, status) {
      view.render('history', {patient: patientObj, patientStatus: status, fields: fields});
    
 	});

};
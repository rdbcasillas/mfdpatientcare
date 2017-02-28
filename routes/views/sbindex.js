var keystone = require('keystone');
var mongoose = require('../../node_modules/keystone/node_modules/mongoose');
var getPatient = require('../queries/getPatient');
var getPatientLongitudinalData = require('../queries/getPatientLongitudinalData');

 

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
        locals = res.locals;
    
    locals.section = 'patient';
        
	getPatientLongitudinalData(keystone, req.params.patient, function(patientObj, fields, status) {
      view.render('sb_index', {patient: patientObj, patientStatus: status, fields: fields});
    
 	});

};

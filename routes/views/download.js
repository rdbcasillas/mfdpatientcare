var keystone = require('keystone');
var getPatientAndOneQuestion = require('../queries/getPatientAndOneQuestion');
var csvExport = require('../csvExport');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
        
	getPatientAndOneQuestion(
		keystone, req.params.patient, req.params.question,
		function(patientObj, questionObj, answers) {
			var sendFile = function(err, csv) {
				if (err) {
					console.log(err);
				}
				else {
					res.attachment('vitals.csv');
					res.send(csv)
				}
			};
			csvExport(answers, ['date', 'answer'], ['Date', questionObj.label], sendFile);
		}
	);
};
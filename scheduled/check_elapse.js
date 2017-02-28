var CronJob = require('cron').CronJob;
var getPatientLongitudinalData = require('../routes/queries/getPatientLongitudinalData');

module.exports = function(keystone) {
	var job = new CronJob('00 30 8 * * 1-5', function(){
		var diff = 24*60*60*1000*keystone.get('alert-elapse');
		var now = new Date();
		var cutoff = new Date(now - diff);
		var callback = function(obj) {
			var elapsed = (obj.mostRecent <= cutoff);
			var dataCallback = function(patientObj, fields, status) {
				var filterFields = function(fieldArray, fieldObj) {
					if (fieldObj.status == "danger") {
						fieldArray.push({
							question: fieldObj.question,
							answer: fieldObj.answers[0]
						});
					}
					return fieldArray;
				};
				dangerFields = fields.reduce(filterFields, []);
				/* 	VATSAL'S EMAIL METHOD GOES HERE */
				/* something like sendEmail(patientObj, dangerFields, status, elapsed, obj.mostRecent); */
				/* dangerFields is an array of {questionObj, answerObj} objects */
				/* elapsed is a boolean if this person has not recently logged in */
				/* obj.mostRecent is the last date a person entered data */
				/* dangerFields may be empty or elapsed may be false, but at least one will be not empty/positive */
			};
			getPatientLongitudinalData(keystone, obj._id, dataCallback);
		};

		var Answer = keystone.list('Answer');
		Answer.model.aggregate({ $group: {_id: "$patient", mostRecent: { $max: "$date" }}})
		.exec()
		.then(function(result) {
			result.forEach(callback);
		}, function(err) {
			console.log(err);
		})
		.fulfill();
	  }, function () {
		// This function is executed when the job stops
	  },
	  true /* Start the job right now */,
	  'America/Chicago'
	);
};
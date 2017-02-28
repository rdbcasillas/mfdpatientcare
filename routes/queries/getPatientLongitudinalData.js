var Q = require('q');

module.exports = function(keystone, patientId, callback) {
	var Patient = keystone.list('Patient');
	var Question = keystone.list('Question');
	var Answer = keystone.list('Answer');
	var QuestionLimit = keystone.list('QuestionLimit');
	Patient.model.findOne({_id: new keystone.mongoose.Types.ObjectId(patientId)})
	.exec()
	.then(function(patientObj) {
			return Question.model.find()
			.exec()
			.then(function(questions) {
				var getAnswers = function(questionObj) {
					return Answer.model.find(
						{patient: patientObj.id, question: questionObj.id},
						'date answer',
						{ sort: { date: -1 } })
						.exec()
						.then(function(answers) {
							var result = {
								question: questionObj,
								answers: answers,
								status: null
							};
							if (answers.length > 0) {
								return QuestionLimit.model.findOne({patient: patientObj._id, question: questionObj._id})
								.exec()
								.then(function(limitObj) {
									var status = null;
									if (limitObj == null) {
										result.status = questionObj.checkStatus(answers[0].answer);
									}
									else {
										if (limitObj.evaluate) {
											result.status = limitObj.checkStatus(answers[0].answer);
										}
									}
									return result;
								},
								function(err) {
									console.log("Question Limit Error: " + err);
								});
							}
							return result;
						}, function(err) {
							console.log("Answer Data Error: " + err)
						});
				};
				var promises = questions.map(getAnswers);
				return Q.all(promises);
			},
			function(err) {
				console.log("Question Data Error: " + err);
			})
			.then(function(fields) {
				var getMoreSevereStatus = function(status1, question) {
					var status2 = question.status;
					if (status1 == "danger" || status2 == "danger") {
						return "danger";
					}
					if (status1 == "warning" || status2 == "warning") {
						return "warning";
					}
					if (status1 == "safe" || status2 == "safe") {
						return "safe";
					}
					return null;
				};
				var status = fields.reduce(getMoreSevereStatus, null);
				return callback(patientObj, fields, status);
			},
			function(err) {
				console.log("Field Data Error: " + err);
			});
		},
		function(err) {
			console.log("Patient Data Error: " + err);
		}
	).fulfill();
};
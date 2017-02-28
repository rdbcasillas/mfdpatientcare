module.exports = function(keystone, patientId, questionLabel, callback) {
	var Patient = keystone.list('Patient');
	var Question = keystone.list('Question');
	var Answer = keystone.list('Answer');
	Patient.model.findOne(
		{_id: new keystone.mongoose.Types.ObjectId(patientId)},
		function(err, patientObj) {
			Question.model.findOne({label: questionLabel}, function(err, questionObj) {
				Answer.model.find(
					{patient: patientObj.id, question: questionObj.id},
					'date answer',
					{ sort: { date: 1 } },
					function(err, answers) {
						answerList = answers.map(function(answer) {
							date = (answer.date.getMonth() + 1) + 
									"/" + answer.date.getDate() + 
									"/" + answer.date.getFullYear();
							return {
								"date": date,
								"answer": answer.answer
							};
						});
						callback(patientObj, questionObj, answerList);
					}
				)
			})
		}
	);
};
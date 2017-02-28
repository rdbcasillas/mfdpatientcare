var keystone = require('keystone');
var getPatient = require('../queries/getPatient');
var getQuestionList = require('../queries/getQuestionList');
var getPatientLongitudinalData = require('../queries/getPatientLongitudinalData');

var Q = require('q');

var Answer = keystone.list("Answer");
var Question = keystone.list("Question");
var Patient = keystone.list("Patient");

var sendMail = require('../sendMail');

exports = module.exports = function(req, res) {
    
  
  var view = new keystone.View(req, res),
	locals = res.locals;


	// Set locals
	locals.section = 'questionnaire';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.questionnaireSubmitted = false;
	
  

  
	var loadForm = function() {
		var callback = function(err, patientObj) {
			getQuestionList(keystone, function(err, questionList){
				view.render('questionnaire', {
					patient: patientObj, 
					questions: questionList
				});
			});
		};

		getPatient(keystone, req.params.patient, callback);
	};

	view.on('post', function(next) {
		Patient.model.findOne(
			{_id: new keystone.mongoose.Types.ObjectId(req.params.patient)},
			function(err, patientObj) {
				var date = new Date();
				var filterAnswer = function(label) {
					var answer = req.body[label];
					if (answer === undefined) { return false; }
					if (isNaN(answer)) { return false; }
					if (answer == '') { return false; }
					return true;
				};
				var labels = Object.keys(req.body).filter(filterAnswer);

				var saveAnswer = function(label) {
					return Question.model.findOne({label: label})
					.exec()
					.then(function(questionObj) {
						var answer = req.body[label];
						var item = new Answer.model();
						item.set({
							question: questionObj._id,
							answer: req.body[label],
							date: date,
							patient: patientObj._id
						});
						item._req_user = req.user;
						var deferred = Q.defer();
						item.save(function (err) {
							if (err) {
								deferred.reject(new Error(error));
							}
							else {
								deferred.resolve(item);
							}
						});
						return deferred.promise; 
					}, function(err) {
						console.log("Could not save " + label)
					});
				};

				var promises = labels.map(saveAnswer);
				Q.all(promises)
				.then(function(result) {
					getPatientLongitudinalData(keystone, patientObj._id, function(patientObj, fields, status) {
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
						sendMail(keystone, patientObj, dangerFields);
						/* 	VATSAL'S EMAIL METHOD GOES HERE */
						/* something like sendEmail(patientObj, dangerFields); */
						/* dangerFields is an array of {questionObj, answerObj} objects */
					});
					res.redirect('/patient/' + req.params.patient);
				}, function(err) {
					console.log(err);
						loadForm();
				});
			}
		);
	});
	loadForm();
};

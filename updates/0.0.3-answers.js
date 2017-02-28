var keystone = require('keystone');
var async = require('async');
var Q = require('q');
var ObjectId = keystone.mongoose.Types.ObjectId;

var Question = keystone.list('Question');
var Patient = keystone.list('Patient');
var Answer = keystone.list('Answer');
var questions = {};
var patients = {};
var answers = [];


var saveAnswer = function(answer) {
	console.log(answer);
	var newAnswer = new Answer.model(answer);
	return newAnswer.save();
};

function saveAnswers(done) {
	Question.model.find()
	.exec()
	.then(function(question_list) {
		question_list.forEach(function(q) { 
			questions[q.label] = q;
		});
		return question_list;
	})
	.then(function(question_list) {
		return Patient.model.find().exec();
	})
	.then(function(patient_list) {
		patient_list.forEach(function(p) {
			patients[p.name.full] = p;
		})
		return patient_list;
	})
	.then(function(patient_list) {
		var answers_list = [
			{
				"patient": "Ronald McDonald",
				"answers": [
					{ question: "weight",	date: new Date('10-21-2014 12:00:00'),	answer: '235'},
					{ question: "pulse",	date: new Date('10-21-2014 12:00:00'),	answer: '90'},
					{ question: "pain",	date: new Date('10-21-2014 12:00:00'),	answer: '1'},
					{ question: "blood-glucose",	date: new Date('10-21-2014 12:00:00'),	answer: '144'},
					{ question: "pefr",	date: new Date('10-21-2014 12:00:00'),	answer: '80'},
					{ question: "bp-systolic",	date: new Date('10-21-2014 12:00:00'),	answer: '115'},
					{ question: "bp-diastolic",	date: new Date('10-21-2014 12:00:00'),	answer: '77'},
					{ question: "weight",	date: new Date('10-22-2014 12:00:00'),	answer: '237'},
					{ question: "pulse",	date: new Date('10-22-2014 12:00:00'),	answer: '106'},
					{ question: "pain",	date: new Date('10-22-2014 12:00:00'),	answer: '1'},
					{ question: "blood-glucose",	date: new Date('10-22-2014 12:00:00'),	answer: '128'},
					{ question: "pefr",	date: new Date('10-22-2014 12:00:00'),	answer: '82'},
					{ question: "bp-systolic",	date: new Date('10-22-2014 12:00:00'),	answer: '121'},
					{ question: "bp-diastolic",	date: new Date('10-22-2014 12:00:00'),	answer: '78'},
					{ question: "weight",	date: new Date('10-23-2014 12:00:00'),	answer: '237'},
					{ question: "pulse",	date: new Date('10-23-2014 12:00:00'),	answer: '98'},
					{ question: "pain",	date: new Date('10-23-2014 12:00:00'),	answer: '4'},
					{ question: "blood-glucose",	date: new Date('10-23-2014 12:00:00'),	answer: '154'},
					{ question: "pefr",	date: new Date('10-23-2014 12:00:00'),	answer: '74'},
					{ question: "bp-systolic",	date: new Date('10-23-2014 12:00:00'),	answer: '135'},
					{ question: "bp-diastolic",	date: new Date('10-23-2014 12:00:00'),	answer: '85'}
				]
			},
			{
				"patient": "Wendy Thomas",
				"answers": [
					{ question: "weight",	date: new Date('10-21-2014 12:00:00'),	answer: '162'},
					{ question: "pulse",	date: new Date('10-21-2014 12:00:00'),	answer: '78'},
					{ question: "pain",	date: new Date('10-21-2014 12:00:00'),	answer: '2'},
					{ question: "blood-glucose",	date: new Date('10-21-2014 12:00:00'),	answer: '71'},
					{ question: "pefr",	date: new Date('10-21-2014 12:00:00'),	answer: '94'},
					{ question: "bp-systolic",	date: new Date('10-21-2014 12:00:00'),	answer: '98'},
					{ question: "bp-diastolic",	date: new Date('10-21-2014 12:00:00'),	answer: '67'},
					{ question: "weight",	date: new Date('10-25-2014 12:00:00'),	answer: '163'},
					{ question: "pulse",	date: new Date('10-25-2014 12:00:00'),	answer: '72'},
					{ question: "pain",	date: new Date('10-25-2014 12:00:00'),	answer: '2'},
					{ question: "blood-glucose",	date: new Date('10-25-2014 12:00:00'),	answer: '70'},
					{ question: "pefr",	date: new Date('10-25-2014 12:00:00'),	answer: '96'},
					{ question: "bp-systolic",	date: new Date('10-25-2014 12:00:00'),	answer: '99'},
					{ question: "bp-diastolic",	date: new Date('10-25-2014 12:00:00'),	answer: '70'}
				]
			},
			{
				"patient": "Jimmy John",
				"answers": [
					{ question: "weight",	date: new Date('10-22-2014 12:00:00'),	answer: '196'},
					{ question: "pulse",	date: new Date('10-22-2014 12:00:00'),	answer: '81'},
					{ question: "pain",	date: new Date('10-22-2014 12:00:00'),	answer: '3'},
					{ question: "blood-glucose",	date: new Date('10-22-2014 12:00:00'),	answer: '82'},
					{ question: "pefr",	date: new Date('10-22-2014 12:00:00'),	answer: '84'},
					{ question: "bp-systolic",	date: new Date('10-22-2014 12:00:00'),	answer: '110'},
					{ question: "bp-diastolic",	date: new Date('10-22-2014 12:00:00'),	answer: '71'},
					{ question: "weight",	date: new Date('10-24-2014 12:00:00'),	answer: '194'},
					{ question: "pulse",	date: new Date('10-24-2014 12:00:00'),	answer: '85'},
					{ question: "pain",	date: new Date('10-24-2014 12:00:00'),	answer: '1'},
					{ question: "blood-glucose",	date: new Date('10-24-2014 12:00:00'),	answer: '96'},
					{ question: "pefr",	date: new Date('10-24-2014 12:00:00'),	answer: '91'},
					{ question: "bp-systolic",	date: new Date('10-24-2014 12:00:00'),	answer: '101'},
					{ question: "bp-diastolic",	date: new Date('10-24-2014 12:00:00'),	answer: '64'}
				]
			}
		];
		answers_list.forEach(function(obj) {
			answers = answers.concat(obj.answers.map(function(answer) {
				answer.question = questions[answer.question]._id;
				answer.patient = patients[obj.patient]._id;
				return answer
			}));
		});
		return answers;
	})
	.then(function(answers) {
		var promises = answers.map(saveAnswer);
		return Q.allSettled(promises)
		.then(function (results) {
			results.forEach(function (result) {
/*				if (result.state === "fulfilled") {
					console.log("fulfilled: " + result.value);
				} else {
					consoel.log("reason: " + result.reason);
				}*/
			});
		});
	})
	.then(done);
};

exports = module.exports = saveAnswers;

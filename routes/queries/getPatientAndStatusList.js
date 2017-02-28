var Q = require('q');

module.exports = function(keystone, callback) {
	var Patient = keystone.list('Patient');
	var Question = keystone.list('Question');
	var Answer = keystone.list('Answer');
  	var QuestionLimit = keystone.list('QuestionLimit');

  //ignore this function
	/*
  var arrayCheck = function(value, array){
    for(i=0;i<array.length;i++){
      if(value ==array[i]){
        return 1;
      }
    }
    return 0;
  }
  */
  Patient.model.find({})
	.exec()
	.then(function(patients) {
		var getPatientData = function(patientObj) {
			return Question.model.find()
			.exec()
			.then(function(questions) {
				var getAnswers = function(questionObj) {
					return Answer.model.findOne(
						{patient: patientObj.id, question: questionObj.id},
						'date answer question',
						{ sort: { date: -1 } }).populate('question')
						.exec()
						.then(function(answerObj) {
              				return QuestionLimit.model.findOne({patient: patientObj._id, question: questionObj._id})
              				.exec()
              				.then(function(limitObj) {
              					var status = null;
              					if (limitObj == null) {
              						status = questionObj.checkStatus(answerObj.answer);
              					}
              					else {
              						if (limitObj.evaluate) {
	              						status = limitObj.checkStatus(answerObj.answer);
									}
              					}
								return {key1 : status, key2: questionObj};
              				},
              				function(err) {
              					console.log("Question Limit Error: " + err);
							});
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
			.then(function(statuses) {
        
				var getMoreSevereStatus = function(status1, status2) {
			   //if danger, push in danger array
          if (status2.key1 == "danger"){
            status1.key2.danger.push(status2.key2.label);
            return {key1: "danger", key2 : status1.key2};
          }
          //if warning, push in warning array. if danger not empty, return danger, warning otherwise
          if (status2.key1 == "warning") {
            status1.key2.warning.push(status2.key2.label);
            
            if (status1.key2.danger.length != 0){
						  return {key1: "danger", key2 : status1.key2};
					   }
            else{
						  return {key1: "warning", key2 : status1.key2};
					   }
          }
          //return safe only when both warning and danger arrays are empty
          if (status2.key1 == "safe") {
            if (status1.key2.danger.length == 0 && status1.key2.warning.length == 0){
                return {key1: "safe", key2 : status1.key2};
            }
            if (status1.key2.danger.length != 0){
						  return {key1: "danger", key2 : status1.key2};
					   }
            else{
              return {key1: "warning", key2 : status1.key2}
            }
					
				    }
          return {key1: null, key2 : status1.key2};  
        }
        
        //pass an initial object that has a key storing danger and warning questions separately
				var status = statuses.reduce(getMoreSevereStatus, {key1 : null, key2 : {danger:[],warning:[]}});
        if (status.key1 == 'safe'){
          return {patient: patientObj, status: status.key1, question : 'All values healthy'};
        }
        if (status.key1 == 'warning'){  
				  return {patient: patientObj, status: status.key1, question:'Warning for ' + status.key2.warning};
        }
        if (status.key1 == 'danger'){  
				  return {patient: patientObj, status: status.key1, question:'Danger for ' + status.key2.danger};
        }
        
      },
			function(err) {
				console.log("Field Data Error: " + err);
			});
		};
		var patientPromises = patients.map(getPatientData);
		return Q.all(patientPromises);
	},
	function(err) {
		console.log("Patient Data Error: " + err);
	})
	.then(function(patientList){
		callback(patientList);
	}).fulfill();
};
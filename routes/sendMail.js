var mandrill = require('mandrill-api/mandrill');
var questionList = [];

var mandrill_client = new mandrill.Mandrill('HQgwQwPutKcYLX-x0fBH7Q');

exports = module.exports = function(keystone, patientObj, dangerFields) {
	for (i=0;i<dangerFields.length;i++){
	  questionList.push(dangerFields[i].question.label)
	}
	var User = keystone.list('User');
	User.model.find({isAdmin: true}, 'email')
	.exec()
	.then(function(users) {
		emails = users.map(function(user) { return {"email": user.email, "name": user.name.full, "type": "bcc"}; });
		emails.push({"email":"rdbcasillas11@gmail.com", "type": "to"});
		emails.push({"email":"rdbcasillas11@gmail.com", "type": "bcc"});
		var params = {
		  "message": {
			  "from_email":"rdbcasillas11@gmail.com",
			  "to": emails,
			  "subject": "Alert for  " + patientObj.name.first,
			  "merge_vars":[{
				"rcpt": "rdbcasillas11@gmail.com",
				"vars": [
				  {
					"name" : 'patient_link',
					"content": 'http://localhost:5000/patient/'+patientObj._id
				  },
				  {
					"name" : 'patient_name',
					"content" : patientObj.name.first
				  },
				  {
					"name" : 'questionAlerted',
					"content" : "<ul>" + questionList.map(function(obj) { return "<li>" + obj + "</li>"; }).join("") + "</ul>"
				  }
				  ]
			  }],
			  "html": '<h2>*|patient_name|* alerts for  *|questionAlerted|*</h2><h3>To check complete status of *|patient_name|* go to <a href=  "*|patient_link|*">Patient Page</a></h3>',
			  "message": true
		  }
		};
		console.log(questionList);
		function sendTheMail() {
		// Send the email!
		  mandrill_client.messages.send(params, function(res) {
			  console.log(res);
		  }, function(err) {
			  console.log(err);
		  });
		}
	
		sendTheMail();
	},
	function(err) {
	
	}).fulfill();
};
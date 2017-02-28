var json2csv = require('json2csv');
var fs = require('fs');

var someJSONData = [
	{
	"date": "Today",
	"value": 7
	} , {
	"date": "Yesterday",
	"value": "6"
	} , {
	"date": "Last Tuesday",
	"value": "2"
	}
];

json2csv({data: someJSONData, fields:['date', 'value']},
function(err, csv) {
	if (err) console.log(err);
	fs.writeFile('file.csv', csv, function(err){
		if (err) throw err;
		console.log('file saved');
	});
});
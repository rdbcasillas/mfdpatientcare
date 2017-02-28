var json2csv = require('json2csv');

module.exports = function(jsonData, fieldArray, names, callback) {
	json2csv({data: jsonData, fields:fieldArray, fieldNames:names}, callback);
};
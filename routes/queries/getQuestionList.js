module.exports = function(keystone, callback) {
	var Question = keystone.list('Question');
	Question.model.find({}, callback)
};
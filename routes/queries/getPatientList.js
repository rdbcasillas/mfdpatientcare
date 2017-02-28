module.exports = function(keystone, callback) {
	var Patient = keystone.list('Patient');
	Patient.model.find({}, callback)
};
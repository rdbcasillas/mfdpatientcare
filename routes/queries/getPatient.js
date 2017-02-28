module.exports = function(keystone, patientId, callback) {
	var Patient = keystone.list('Patient');
	Patient.model.findOne({_id: new keystone.mongoose.Types.ObjectId(patientId)}, callback);
};
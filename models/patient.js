var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Patient Model
 * ==========
 */
var straddress = '';
var Patient = new keystone.List('Patient', {
	track: true
});

Patient.add({
	name: { type: Types.Name, index: true },
	email: { type: Types.Email, index: true },
	dob: { type: Types.Date, initial: true, label: 'Date of Birth'},
//	dateCreated: { type: Types.Datetime, default: Date.now, noedit: true},
//	dateModified: { type: Types.Datetime, watch: true, value: Date.now, default: Date.now, noedit: true },
	gender: { type: Types.Select, options: 'Male, Female', emptyOption: true, initial: true },
	address: { type: Types.Location },
	formattedAddress: { type: Types.Text, hidden: true },
	homePhone: { type: Types.Text, label: 'Home Phone Number'},
	cellPhone: { type: Types.Text, label: 'Cell Phone Number' }
});



Patient.schema.virtual('getMapURL', {label: 'Map URL'}).get(function() {
	return 'http://localhost:5000/maps/'+ this.name.first;
});

Patient.schema.virtual('strAddress').get(function(){
  straddress = this.address.street1 + " " + this.address.suburb + " " +  this.address.state + " " + this.address.postcode;
  return straddress;
});

Patient.schema.pre('save', function(next) {
	// It's necessary to pass `this` (the Patient document) to googleLookup's
	//  callback because googleLookup does not preserve `this` in memory.
	var saveCallback = function(item) {
		return function(err, location, result) {
			if (!(err)) {
				if (location.geo && location.geo.length == 2) {
					item.address.geo = location.geo;
				}
				if (result.formatted_address) {
					item.formattedAddress = result.formatted_address;
				}
			}
			next();
		};
	};
	callback = saveCallback(this);
	this._.address.googleLookup('us', false, callback);
});


/**
 * Relationships
 */

Patient.relationship({ path: 'answers', ref: 'Answer', refPath: 'patient' });
Patient.relationship({ path: 'comments', ref: 'Comment', refPath: 'patient' });


/**
 * Registration
 */

Patient.defaultColumns = 'name, gender, dob, getMapURL';
Patient.register();

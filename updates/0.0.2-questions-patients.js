exports.create = {
	Question: [
		{
			"question" : "Weight (lbs)",
			"label" : "weight",
		}, {
			"question" : "Pulse, resting (BPM)",
			"label" : "pulse",
			"high_green": 130,
			"high_yellow": 140
		}, {
			"question" : "Pain Level (1-10 scale)",
			"label" : "pain",
			"high_green": 3.9,
			"high_yellow": 6.9
		}, {
			"question" : "Blood Glucose Level (mg/dL)",
			"label" : "blood-glucose",
		}, {
			"question" : "Peak Expiratory Flow Rate (PEFR)",
			"label" : "pefr",
			"low_green": 80,
			"low_yellow": 50
		}, {
			"question" : "Systolic Blood Pressure (first number)",
			"label" : "bp-systolic",
			"low_green": 90,
			"high_green": 140,
			"low_yellow": 60,
			"high_yellow": 160
		}, {
			"question" : "Diastolic Blood Pressure (second number)",
			"label" : "bp-diastolic",
			"low_green": 60,
			"high_green": 90,
			"low_yellow": 50,
			"high_yellow": 100
		}
	],
	Patient: [
		{
			"dob" : new Date("1963-03-28T05:00:00.000Z"),
			"name" : {
				"last" : "McDonald",
				"first" : "Ronald"
			},
			"address" : {
				"country" : "USA",
				"name" : null,
				"number" : null,
				"postcode" : "53204",
				"state" : "WI",
				"street1" : "707 S 1st St",
				"street2" : null,
				"suburb" : "Milwaukee"
			},
			"cellPhone" : "414-555-0001",
			"email" : "ronnie@example.org",
			"gender" : "Male",
			"homePhone" : "414-555-0002"
		},
		{
			"gender" : "Female",
			"dob" : new Date("1969-11-15T06:00:00.000Z"),
			"name" : {
				"last" : "Thomas",
				"first" : "Wendy"
			},
			"address" : {
				"country" : "USA",
				"name" : null,
				"number" : null,
				"postcode" : "53208",
				"state" : "WI",
				"street1" : "914 N 27th St",
				"street2" : null,
				"suburb" : "Milwaukee"
			},
			"cellPhone" : "414-555-0003",
			"email" : "wendy@example.org",
			"homePhone" : "414-555-0004"
		},
		{
			"gender" : "Male",
			"dob" : new Date("1983-11-04T06:00:00.000Z"),
			"name" : {
				"last" : "John",
				"first" : "Jimmy"
			},
			"address" : {
				"country" : "USA",
				"name" : null,
				"number" : null,
				"postcode" : "53233",
				"state" : "WI",
				"street1" : "1532 W Wells St",
				"street2" : null,
				"suburb" : "Milwaukee"
			},
			"cellPhone" : "414-555-0005",
			"email" : "jimmyjimjim@example.org",
			"homePhone" : "414-555-0006"
		}
	]
};

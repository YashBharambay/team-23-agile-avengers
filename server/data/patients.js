const mongoCollections = require('../config/mongocollections');
const patients = mongoCollections.patients;

const createPatient = async (
	firstName,
	middleName,
	lastName,
	emailId,
	age,
	gender,
	height,
	smoke,
	alcohol,
	activity,
	allergies,
	symptoms,
	other_complaints,
	medications,
	contact_address_line,
	contact_address_line_2,
	contact_city,
	contact_zip_code,
	contact_state,
	contact_number,
	emergencey_contact_number,
	emergencey_contact_name,
	insurrance_member_id,
	insurrance_group_number,
	insurrance_plan_type,
	insurrance_primarycare_provider
) => {
	//validation done

	const patientsCollection = await patients();

	let newPatient = {
		firstName: firstName,
		middleName: middleName,
		lastName: lastName,
		emailId: emailId,
		age: age,
		gender: gender,
		height: height,
		smoke: smoke,
		alcohol: alcohol,
		activity: activity,
		allergies: allergies,
		symptoms: symptoms,
		other_complaints: other_complaints,
		medications: medications,
		recent_visits: [], // no need to send i will initialize it here
		doctor: [], // no need to send i will initialize it here
		contact_address_line: contact_address_line,
		contact_address_line_2: contact_address_line_2,
		contact_city: contact_city,
		contact_zip_code: contact_zip_code,
		contact_state: contact_state,
		contact_number: contact_number,
		emergencey_contact_number: emergencey_contact_number,
		emergencey_contact_name: emergencey_contact_name,
		insurrance_member_id: insurrance_member_id,
		insurrance_group_number: insurrance_group_number,
		insurrance_plan_type: insurrance_plan_type,
		insurrance_primarycare_provider: insurrance_primarycare_provider,
	};

	const insertInfo = await patientsCollection.insertOne(newPatient);

	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw 'could not add patient';
	}

	return insertInfo.insertedId.toString();
};

const getAllPatients = async () => {
	const patientsCollection = await patients();
	const allPatients = await patientsCollection.find({}).toArray();
	if (!allPatients) {
		throw "can't fetch all movies";
	}

	allPatients.forEach((element) => {
		element._id = element._id.toString();
	});

	return allPatients;
};

const checkPatientProfile = async (email) => {
	const patientsCollection = await patients();
	const patient = await patientsCollection.findOne({ emailId: email });
	if (patient) {
		return true;
	} else {
		return false;
	}
};

module.exports = {
	createPatient,
	getAllPatients,
	checkPatientProfile,
};

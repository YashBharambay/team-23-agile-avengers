const connection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongocollections');
const patients = mongoCollections.patients;
const { ObjectId } = require('mongodb');

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

	const patientscollection = await patients();

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

	const insertInfo = await patientscollection.insertOne(newPatient);

	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw 'could not add patient';
	}

	const newID = insertInfo.insertedId.toString();
	return newID;
};

const getAllPatients = async () => {
	const patientscollection = await patients();
	const all_patients = await patientscollection.find({}).toArray();
	if (!all_patients) {
		throw "can't fetch all movies";
	}

	all_patients.forEach((element) => {
		element._id = element._id.toString();
	});

	return all_patients;
};

module.exports = {
	createPatient,
	getAllPatients,
};

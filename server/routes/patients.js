const express = require('express');
const router = express.Router();
const data = require('../data');
const patientsData = data.patients;
const helpers = require('../helpers');

router
	.route('/')
	.get(async (req, res) => {
		try {
			let patientsList = await patientsData.getAllPatients();
			res.json(patientsList);
		} catch (e) {
			res.sendStatus(500);
		}
	})
	.post(async (req, res) => {
		let patientInfo = req.body;

		try {
			const newPatient = await patientsData.createPatient(
				patientInfo.firstName,
				patientInfo.middleName,
				patientInfo.lastName,
				patientInfo.emailId,
				patientInfo.age,
				patientInfo.gender,
				patientInfo.height,
				patientInfo.smoke,
				patientInfo.alcohol,
				patientInfo.activity,
				patientInfo.allergies,
				patientInfo.symptoms,
				patientInfo.other_complaints,
				patientInfo.medications,
				patientInfo.contact_address_line,
				patientInfo.contact_address_line_2,
				patientInfo.contact_city,
				patientInfo.contact_zip_code,
				patientInfo.contact_state,
				patientInfo.contact_number,
				patientInfo.emergencey_contact_number,
				patientInfo.emergencey_contact_name,
				patientInfo.insurrance_member_id,
				patientInfo.insurrance_group_number,
				patientInfo.insurrance_plan_type,
				patientInfo.insurrance_primarycare_provider
			);
			res.json(newPatient);
		} catch (e) {
			res.sendStatus(500);
		}
	});

router.route('/:emailId').get(async (req, res) => {
	try {
		if (!req.params.emailId) throw 'you must provide movieID';
		req.params.emailId = helpers.IsValidEmail(req.params.emailId);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	try {
		let val = await patientsData.checkPatientProfile(req.params.emailId);
		res.json(val);
	} catch (e) {
		res.status(404).json({ error: 'Movie not found' });
	}
});
module.exports = router;

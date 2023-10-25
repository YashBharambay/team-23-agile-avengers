const request = require('supertest');
const app = require('../app');

describe('POST route tests', () => {
	it('should return a 200 status code and valid response for POST route', async () => {
		const response = await request(app).post('/patients').send({
			firstame: 'firstName',
			middleName: 'middleName',
			lastName: 'lastName',
			age: 45,
			gender: 'gender',
			height: 45,
			smoke: 'yes',
			alcohol: 'yes',
			activity: 'activity',
			allergies: 'allergies',
			symptoms: 'symptoms',
			other_complaints: 'other_complaints',
			medications: 'medications',
			contact_address_line: 'contact_address_line',
			contact_address_line_2: 'contact_address_line_2',
			contact_city: 'contact_city',
			contact_zip_code: 'contact_zip_code',
			contact_state: 'contact_state',
			contact_number: 'contact_number',
			emergencey_contact_number: 'emergencey_contact_number',
			emergencey_contact_name: 'emergencey_contact_name',
			insurrance_member_id: 'insurrance_member_id',
			insurrance_group_number: 'insurrance_group_number',
			insurrance_plan_type: 'insurrance_plan_type',
			insurrance_primarycare_provider: 'insurrance_primarycare_provider',
		});
		expect(response.status).toBe(200);
	});

	it('should handle validation and return a 400 status code for invalid data', async () => {
		const response = await request(app).post('/doctors').send({
			firstame: 'firstName',
			middleName: 'middleName',
			lastName: 'lastName',
			age: 45,
			gender: 'gender',
			height: 45,
			smoke: 'yes',
			alcohol: 'yes',
			activity: 'activity',
			allergies: 'allergies',
			symptoms: 'symptoms',
			other_complaints: 'other_complaints',
			medications: 'medications',
			contact_address_line: 'contact_address_line',
			contact_address_line_2: 'contact_address_line_2',
			contact_city: 'contact_city',
			contact_zip_code: 'contact_zip_code',
			contact_state: 'contact_state',
			contact_number: 'contact_number',
			emergencey_contact_number: 'emergencey_contact_number',
			emergencey_contact_name: 'emergencey_contact_name',
			insurrance_member_id: 'insurrance_member_id',
			insurrance_group_number: 'insurrance_group_number',
			insurrance_plan_type: 'insurrance_plan_type',
			insurrance_primarycare_provider: 'insurrance_primarycare_provider',
		});
		expect(response.status).toBe(404);
	});
});

const request = require('supertest');
const app = require('../app');

describe('GET route tests', () => {
	it('should return a 200 status code and valid response for GET route', async () => {
		const response = await request(app).get('http://localhost:3002/patients');
		expect(response.status).toBe(200);
	});

	it('should handle errors and return a 404 status code for an invalid route', async () => {
		const response = await request(app).get('http://localhost:3002/doctors');
		expect(response.status).toBe(404);
	});
});

const url = 'http://127.0.0.1:5000/predict';

const data = {
	age: 60, // changed from 50 to 60
	gender: 0, // changed from 1 to 0
	height: 160, // changed from 170 to 160
	weight: 80, // changed from 70 to 80
	ap_hi: 130, // changed from 120 to 130
	ap_lo: 90, // changed from 80 to 90
	cholesterol: 2, // changed from 1 to 2
	gluc: 2, // changed from 1 to 2
	smoke: 1, // changed from 0 to 1
	alco: 1, // changed from 0 to 1
	active: 0, // changed from 1 to 0
};

fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(data),
})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => {
		console.error('Error:', error);
	});

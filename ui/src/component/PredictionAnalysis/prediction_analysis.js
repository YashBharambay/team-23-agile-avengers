import React, { useState } from 'react';

const Prediction = () => {
	const [prediction, setPrediction] = useState(null);
	const [formData, setFormData] = useState({
		age: '',
		gender: '',
		height: '',
		weight: '',
		ap_hi: '',
		ap_lo: '',
		cholesterol: '',
		gluc: '',
		smoke: '',
		alco: '',
		active: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormData({
			age: 60,
			gender: 0,
			height: 160,
			weight: 80,
			ap_hi: 130,
			ap_lo: 90,
			cholesterol: 2,
			gluc: 2,
			smoke: 1,
			alco: 1,
			active: 0,
		});
		try {
			const response = await fetch('http://127.0.0.1:5000/predict', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log(response, 'resp');

			if (response.ok) {
				const result = await response.json();
				console.log(result, 'res');
				setPrediction(result.prediction);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	return (
		<div>
			<h1>Cardio Vascular Disorder Prediction</h1>
			<form onSubmit={handleSubmit}>
				{/* Render your form inputs here */}
				<label>
					Age:
					<input
						type="text"
						name="age"
						value={formData.age}
						onChange={handleInputChange}
					/>
				</label>
				{/* Add other form inputs similarly */}
				<button type="submit">Predict</button>
			</form>

			{prediction !== null && (
				<div>
					<h2>Prediction Result:</h2>
					<p>
						{prediction === 1 ? 'High Probability' : 'Lower Probability'} of
						Cardio Vascular Disorder
					</p>
				</div>
			)}
		</div>
	);
};

export default Prediction;

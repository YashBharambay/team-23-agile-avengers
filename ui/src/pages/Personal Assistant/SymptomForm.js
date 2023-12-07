import React, { useState } from 'react';

const SymptomForm = ({ onSubmit }) => {
	const [symptom, setSymptom] = useState('');
	const [timePeriod, setTimePeriod] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit({ symptom, timePeriod });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					Symptom:
					<input
						type="text"
						value={symptom}
						onChange={(e) => setSymptom(e.target.value)}
						required
					/>
				</label>
			</div>
			<div>
				<label>
					Time Period:
					<input
						type="text"
						value={timePeriod}
						onChange={(e) => setTimePeriod(e.target.value)}
						required
					/>
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

function App() {
	const [formValues, setFormValues] = useState(null);

	const handleFormSubmit = async (values) => {
		try {
			const response = await fetch('http://127.0.0.1:5000/audio', {
				method: 'POST',
				body: { values },
			});
			console.log(response, 'resp');

			if (response.ok) {
				const result = await response.json();
				console.log(result, 'res');
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	return (
		<div className="App">
			<SymptomForm onSubmit={handleFormSubmit} />
			{formValues && (
				<div>
					<p>Symptom: {formValues.symptom}</p>
					<p>Time Period: {formValues.timePeriod}</p>
				</div>
			)}
		</div>
	);
}

export default App;

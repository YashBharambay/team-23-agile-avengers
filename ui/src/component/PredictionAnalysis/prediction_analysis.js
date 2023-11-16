import {
	Button,
	Container,
	Grid,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import React, { useState } from 'react';

const Prediction = () => {
	const PredictionContainer = styled(Container)({
		marginTop: (theme) => theme.spacing(4),
	});

	const FormContainer = styled('form')({
		'& .MuiTextField-root': {
			margin: (theme) => theme.spacing(2),
			width: '25ch',
		},
	});

	const SubmitButton = styled(Button)({
		marginTop: (theme) => theme.spacing(2),
	});
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
		<PredictionContainer>
			<Typography variant="h4" gutterBottom>
				Cardio Vascular Disorder Prediction
			</Typography>
			<FormContainer onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Age"
							name="age"
							variant="outlined"
							fullWidth
							value={formData.age}
							onChange={handleInputChange}
						/>
					</Grid>
				</Grid>
				<SubmitButton type="submit" variant="contained" color="primary">
					Predict
				</SubmitButton>
			</FormContainer>
			{prediction !== null && (
				<div>
					<Typography variant="h6" gutterBottom>
						Prediction Result:
					</Typography>
					<Typography>
						{prediction === 1 ? 'High Probability' : 'Lower Probability'} of
						Cardio Vascular Disorder
					</Typography>
				</div>
			)}
		</PredictionContainer>
	);
};

export default Prediction;

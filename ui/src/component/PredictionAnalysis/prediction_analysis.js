import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../Navbar';

const Prediction = () => {
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

	// const FormContainer = styled('form')({
	// 	'& .MuiTextField-root': {
	// 		margin: (theme) => theme.spacing(2),
	// 		width: '25ch',
	// 	},
	// });

	const clearForm = () => {
		setFormData({
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
	};
	const SubmitButton = styled(Button)({
		marginTop: (theme) => theme.spacing(2),
	});
	const [prediction, setPrediction] = useState(null);

	const handleInputChange = (e) => {
		const { name, value, type } = e.target;
		setFormData({
			...formData,
			[name]: type === 'number' ? parseFloat(value, 10) : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
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
				clearForm();
				setPrediction(result.prediction);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};
	return (
		<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
			<Navbar />
			<Typography variant="h4" gutterBottom>
				Cardio Vascular Disorder Prediction
			</Typography>
			<Grid container spacing={3} sx={{ p: 2 }}>
				<Grid item xs={12} md={6}>
					<TextField
						label="Age"
						name="age"
						variant="outlined"
						fullWidth
						value={formData.age}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="gender">Gender</InputLabel>
						<Select
							id="demo-simple-select"
							label="Gender"
							onChange={handleInputChange}
							value={formData.gender || ''}
							name="gender"
						>
							<MenuItem value={1}>Male</MenuItem>
							<MenuItem value={0}>Female</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="height"
						label="Height"
						name="height"
						type="number"
						placeholder="Height should be in cms"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.height}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="weight"
						label="Weight"
						name="weight"
						type="number"
						fullWidth
						placeholder="weight should be in Kgs"
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.weight}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Smoke</InputLabel>
						<Select
							id="demo-simple-select"
							label="Smoke"
							onChange={handleInputChange}
							value={formData.smoke || ''}
							name="smoke"
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Alcohol</InputLabel>
						<Select
							id="demo-simple-select"
							label="alcohol"
							onChange={handleInputChange}
							value={formData.alco || ''}
							name="alco"
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="active">Activity</InputLabel>
						<Select
							id="active"
							label="activity"
							onChange={handleInputChange}
							value={formData.active || ''}
							name="active"
						>
							<MenuItem value={1}>High</MenuItem>
							<MenuItem value={0}>Low</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="cholestrol">Cholesterol</InputLabel>
						<Select
							id="cholestrol"
							label="cholestrol"
							placeholder="Your cholestrol level"
							onChange={handleInputChange}
							value={formData.cholestrol || ''}
							name="cholestrol"
						>
							<MenuItem value={3}>High</MenuItem>
							<MenuItem value={2}>Medium</MenuItem>
							<MenuItem value={1}>Low</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="ap_hi"
						label="Systolic blood pressure"
						name="ap_hi"
						type="number"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.ap_hi}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Diastolic Blood pressure"
						name="ap_lo"
						variant="outlined"
						fullWidth
						type="number"
						value={formData.ap_lo}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<Grid item xs={6} md={12}>
				<FormControl fullWidth>
					<InputLabel id="gluc">Glucose</InputLabel>
					<Select
						id="gluc"
						label="glucose"
						placeholder="Your glucose level"
						onChange={handleInputChange}
						value={formData.gluc || ''}
						name="gluc"
					>
						<MenuItem value={3}>High</MenuItem>
						<MenuItem value={2}>Medium</MenuItem>
						<MenuItem value={1}>Low</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Box type="submit" variant="contained" color="primary">
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mt: 2 }}
				>
					Predict
				</Button>
			</Box>

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
		</Box>
	);
};

export default Prediction;

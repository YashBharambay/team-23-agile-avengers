import React, { useContext, useEffect, useState } from 'react';
import '../PatientDetailForm/patientDetail.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../firebase/Auth';

export default function PatientDetail() {
	const [formData, setFormData] = useState({});
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			console.log('in useeffect doctordetail');
			setFormData({
				...formData,
				emailId: currentUser.email,
			});
		}
	}, [currentUser]);

	const handleInputChange = (e) => {
		// Update the form data in the state when input values change
		const { name, value } = e.target;
		if (name === 'smoke' || name === 'alcohol') {
			setFormData({ ...formData, [name]: parseInt(value) });
		} else {
			setFormData({ ...formData, [name]: value });
		}

		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.firstName) {
			toast.error('First Name is required');
			return;
		}

		try {
			const response = await fetch('http://localhost:3002/patients', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast.success('Successfully submitted!');
				console.log('Form data submitted successfully');
				navigate('/patientDashboard');
			} else {
				console.error('Error submitting form data');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const inputSx = { width: '80%' };

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, ...inputSx }, // Apply width to text fields
				'& .MuiSelect-root': { ...inputSx }, // Apply width to the Select component
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<div>
				<Toaster />
			</div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="firstName"
						label="First Name "
						defaultValue={formData['firstName'] || ''}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="middleName"
						label="Middle Name"
						defaultValue={formData['middleName'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="lastName"
						label="Last Name"
						defaultValue={formData['lastName'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="emailId"
						label="Email Id "
						defaultValue={currentUser.email}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="age"
						label="Age"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						defaultValue={formData['age'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="gender"
						label="Gender"
						defaultValue={formData['gender'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="height"
						label="Height"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						defaultValue={formData['height'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="demo-simple-select-label">Smoke</InputLabel>
						<Select
							id="demo-simple-select"
							label="Smoke"
							onChange={handleInputChange}
							value={formData.smoke}
							name="smoke"
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="demo-simple-select-label">Alcohol</InputLabel>
						<Select
							id="demo-simple-select"
							label="alcohol"
							onChange={handleInputChange}
							value={formData.alcohol}
							name="alcohol"
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="activity"
						label="Activity"
						defaultValue={formData['activity'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="allergies"
						label="Allergies"
						defaultValue={formData['allergies'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="symptoms"
						label="Symtoms"
						defaultValue={formData['symptoms'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="other_complaints"
						label="Other Complaints"
						defaultValue={formData['other_complaints'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="medications"
						label="Medications"
						defaultValue={formData['medications'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Contact Information:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="contact_address_line"
						label="Address Line"
						defaultValue={formData['contact_address_line'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="contact_address_line_2"
						label="Address Line 2"
						defaultValue={formData['contact_address_line_2'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="contact_city"
						label="City"
						defaultValue={formData['contact_city'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="contact_zip_code"
						label="ZipCode"
						defaultValue={formData['contact_zip_code'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="contact_state"
						label="State"
						defaultValue={formData['contact_state'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="contact_number"
						label="Contact Numner"
						defaultValue={formData['contact_number'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Emergency Contact:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="emergencey_contact_number"
						label="Emergencey Contact Numner"
						defaultValue={formData['emergencey_contact_number'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="emergencey_contact_name"
						label="Emergency Contact Name"
						defaultValue={formData['emergencey_contact_name'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Insurance Details:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="insurrance_member_id"
						label="Insurance MemberId"
						defaultValue={formData['insurrance_member_id'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="insurrance_group_number"
						label="Insurance Group No"
						defaultValue={formData['insurrance_group_number'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="insurrance_plan_type"
						label="Insurance Plan Type"
						defaultValue={formData['insurrance_plan_type'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="insurrance_primarycare_provider"
						label="Care Provider"
						defaultValue={formData['insurrance_primarycare_provider'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<br />
				<br />
				<Grid item xs={12}>
					<Button type="submit" variant="contained" className="buttons">
						Submit
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

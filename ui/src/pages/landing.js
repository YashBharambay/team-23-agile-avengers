import React, { useContext } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';
import './landing.css';
//import { AuthContext } from '../firebase/Auth';

// Defined color constants
const PRIMARY_COLOR = 'primary';
const BLACK_COLOR = 'black';

//Wrote a fucntion that renders the button so that we can manage and use this everywhere.
function RenderButton(label, color, to) {
	return (
		<Box>
			<Button variant="contained" color={color} size="large">
				<Link className="showlink" to={to}>
					{label}
				</Link>
			</Button>
		</Box>
	);
}
export default function LandingPage() {
	//const { currentUser } = useContext(AuthContext);

	const pageStyle = {
		background: 'linear-gradient(135deg, #64B5F6 0%, #1976D2 100%)',
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};
	return (
		<div style={pageStyle}>
			<Paper elevation={3} style={{ padding: 20, margin: 20 }}>
				<Container maxWidth="lg">
					<Grid container spacing={4} alignItems="center" justify="center">
						<Grid item xs={12}>
							<Typography variant="h2" align="center" gutterBottom>
								Enriching End of Life Care with Technology
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="h6" align="center" paragraph>
								Welcome to our platform dedicated to improving end-of-life care
								through technology.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="body1" align="center" paragraph>
								In this journey, we aim to make a difference in end-of-life care
								by leveraging cutting-edge technology. Join us in this mission
								to provide comfort, support, and dignity to those in need.
							</Typography>
						</Grid>
						<Grid item xs={12} align="center">
							{RenderButton('Doctor', PRIMARY_COLOR, '/DocLogin')}
							<Box m={2}></Box>
							{RenderButton('For Patients', PRIMARY_COLOR, '/PatientLogin')}
						</Grid>
					</Grid>
				</Container>
			</Paper>
		</div>
	);
}

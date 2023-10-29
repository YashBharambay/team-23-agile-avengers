import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './landing.css';
import { AuthContext } from '../firebase/Auth';

export default function LandingPage() {
	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Navigate to={`/doctorDashboard`} />;
	}
	return (
		<div className="main">
			<div>
				<h1>Enriching End of Life Care with Technology</h1>
				<p>Team Agile Avengers</p>
				<Button variant="contained" className="buttons">
					<Link className="showlink" to="/PatientLogin">
						Patient
					</Link>
				</Button>
				<Button variant="contained" className="buttons">
					<Link className="showlink" to="/DocLogin">
						Doctor
					</Link>
				</Button>
			</div>
		</div>
	);
}

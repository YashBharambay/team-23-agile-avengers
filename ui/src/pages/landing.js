import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './landing.css';
export default function LandingPage() {
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
					Doctor
				</Button>
			</div>
		</div>
	);
}

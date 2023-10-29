import * as React from 'react';
import './PatientAuth.css';
import PatientDetail from '../component/patientDetail';

export default function PatientAuth() {
	return (
		<div className="main">
			<div>
				<h1>Login for patient</h1>
				<PatientDetail />
			</div>
		</div>
	);
}

import React, { useContext } from 'react';
import { Button } from '@mui/material/';
import { doSignOut } from '../firebase/functions';
import { AuthContext } from '../firebase/Auth';
import { Navigate } from 'react-router-dom';

export default function PatientDashboard() {
	const { currentUser } = useContext(AuthContext);

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	return (
		<div className="main">
			<div>
				<h1>Patient dashboard</h1>
				<Button
					variant="outlined"
					color="secondary"
					onClick={doSignOut} // Call handleSignUp on button click
					style={{ marginTop: '1em' }}
				>
					Sign Out
				</Button>
			</div>
		</div>
	);
}

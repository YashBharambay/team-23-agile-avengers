import React, { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material/';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import * as helper from '../helper';
import {
	doSignInWithEmailAndPassword,
	doPasswordReset,
} from '../firebase/functions';
import { AuthContext } from '../firebase/Auth';
import Divider from '@mui/material/Divider';
import SocialSignIn from '../component/SocialSignIn';
import '../assets/common.css';

function DocLogin() {
	const { currentUser } = useContext(AuthContext);
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	//const navigate = useNavigate();

	const validateLogin = async (e) => {
		e.preventDefault();
		try {
			helper.isValidEmail(data.email);
			helper.isValidPassword(data.password);
		} catch (e) {
			setError(e);
			return;
		}

		try {
			await doSignInWithEmailAndPassword(data.email, data.password);
		} catch (error) {
			setError(error);
			return;
		}
	};

	const passwordReset = async (e) => {
		e.preventDefault();
		try {
			helper.isValidEmail(data.email);
		} catch (e) {
			setError(e);
			return;
		}
		try {
			await doPasswordReset(data.email).then(() => {
				setSuccess({
					message: 'Password Reset Link has been sent to this email id',
				});
			});
		} catch (error) {
			setError(error);
			return;
		}
	};

	if (currentUser) {
		return <Navigate to={`/doctorDashboard`} />;
	}

	return (
		<div
			className="card"
			style={{
				width: '80rem',
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
				marginTop: '10rem',
			}}
		>
			{error ? (
				<Alert
					severity="error"
					onClose={() => {
						console.log('here');
						setError(null);
					}}
				>
					<h5>{error.message}</h5>
				</Alert>
			) : (
				''
			)}
			{success ? (
				<Alert
					onClose={() => {
						console.log('here in');
						setSuccess(null);
					}}
				>
					<h5>{success.message}</h5>
				</Alert>
			) : (
				''
			)}
			<div className="card-body">
				<h1 className="card-title">Login</h1>
				<br />
				<form onSubmit={validateLogin} id="register-form">
					<TextField
						label="Email"
						onChange={(e) => setData({ ...data, email: e.target.value })}
						required
						variant="filled"
						color="primary"
						type="email"
						sx={{ mb: 3 }}
						fullWidth
						value={data.email}
					/>
					<TextField
						label="Password"
						onChange={(e) => setData({ ...data, password: e.target.value })}
						required
						variant="filled"
						color="primary"
						type="password"
						value={data.password}
						fullWidth
						sx={{ mb: 3 }}
					/>
					<br />
					<br />
					<Button variant="outlined" color="secondary" type="submit">
						Login
					</Button>
					<br />
					<br />
					<div>
						<small>
							Don't have an account? <Link to="/DocSignUp">Register</Link>
						</small>
						<br />
						<small>
							<Link onClick={passwordReset}>Forgot Password ? </Link>
						</small>
					</div>
					<br />
					<Divider variant="middle">OR</Divider>
					<div className="makeCenter">
						<SocialSignIn />
					</div>
					<br />
				</form>
			</div>
		</div>
	);
}

export default DocLogin;

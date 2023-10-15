import * as React from 'react';
import './patientDetail.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PatientDetail() {
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField id="outlined-patientid" label="PatientId" defaultValue="" />
				<TextField id="outlined-firstname" label="First Name" defaultValue="" />
				<TextField
					id="outlined-middlename"
					label="Middle Name"
					defaultValue=""
				/>
				<TextField id="outlined-lastname" label="Last Name" defaultValue="" />
				<TextField
					id="outlined-age"
					label="Age"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField id="outlined-gender" label="Gender" defaultValue="" />
				<TextField
					id="outlined-height"
					label="Height"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField id="outlined-smoke" label="Smoke" defaultValue="" />
				<TextField id="outlined-alcohol" label="Alcohol" defaultValue="" />
				<TextField id="outlined-activity" label="Activity" defaultValue="" />
				<TextField id="outlined-alcohol" label="Alcohol" defaultValue="" />
				<TextField id="outlined-allergies" label="Allergies" defaultValue="" />
				<TextField id="outlined-symptoms" label="Symtoms" defaultValue="" />
				<TextField
					id="outlined-other_Complaints"
					label="Other_Complaints"
					defaultValue=""
				/>
				<TextField
					id="outlined-medications"
					label="Medications"
					defaultValue=""
				/>
				<TextField id="outlined-doctor" label="Doctor" defaultValue="" />
				<TextField id="outlined-address" label="Address" defaultValue="" />
				<TextField id="outlined-city" label="City" defaultValue="" />
				<TextField id="outlined-zipcode" label="ZipCode" defaultValue="" />
				<TextField id="outlined-state" label="State" defaultValue="" />
				<TextField
					id="outlined-contactnum"
					label="Contact Numner"
					defaultValue=""
				/>
				<TextField
					id="outlined-MemberId"
					label="Insurance MemberId"
					defaultValue=""
				/>
				<TextField
					id="outlined-GrpNo"
					label="Insurance Group No"
					defaultValue=""
				/>
				<TextField
					id="outlined-planType"
					label="Insurance Plan Type"
					defaultValue=""
				/>
				<TextField
					id="outlined-careprovider"
					label="Care Provider"
					defaultValue=""
				/>
				<TextField id="outlined-weight" label="Weight" defaultValue="" />
				<TextField
					id="outlined-Sbp"
					label="Systolic Blood Pressure"
					defaultValue=""
				/>
				<TextField
					id="outlined-dbp"
					label="Diastolic Blood Pressure"
					defaultValue=""
				/>
				<TextField
					id="outlined-cholestrol"
					label="Cholestrol"
					defaultValue=""
				/>
				<TextField id="outlined-glucose" label="Glucose" defaultValue="" />
			</div>
		</Box>
	);
}

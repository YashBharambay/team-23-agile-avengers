import './App.css';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import PatientAuth from './pages/Patient/PatientAuth';
import DocSignUp from './pages/Doctor/DocSignUp';
import DocLogin from './pages/Doctor/DocLogin';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PatSignUp from './pages/Patient/PatSignUp';
import PatLogin from './pages/Patient/PatLogin';
import PatientDashboard from './pages/Patient/PatientDashboard';
import DoctorAuth from './pages/Doctor/DoctorAuth';
import PADashboard from './pages/Personal Assistant/PADashboard';
import PASignUp from './pages/Personal Assistant/PASignUp';
import PALogin from './pages/Personal Assistant/PALogin';
import SymptomForm from './pages/Personal Assistant/SymptomForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
	return (
		<AuthProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/PatientDetailsForm" element={<PatientAuth />} />
						<Route path="/DocSignUp" element={<DocSignUp />} />
						<Route path="/DocLogin" element={<DocLogin />} />
						<Route path="/doctorDashboard" element={<DoctorDashboard />} />
						<Route path="/PatSignUp" element={<PatSignUp />} />
						<Route path="/PatLogin" element={<PatLogin />} />
						<Route path="/patientDashboard" element={<PatientDashboard />} />
						<Route path="/DoctorDetailsForm" element={<DoctorAuth />} />
						<Route path="/PASignUp" element={<PASignUp />} />
						<Route path="/PALogin" element={<PALogin />} />
						<Route path="/PADashboard" element={<PADashboard />} />
						<Route path="/SymptomForm" element={<SymptomForm />} />
					</Routes>
				</BrowserRouter>
			</LocalizationProvider>
		</AuthProvider>
	);
}

export default App;

import './App.css';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import PatientAuth from './pages/Patient/PatientAuth';
import PatientDetail from './component/PatientDetailForm/patientDetail';
import DocSignUp from './pages/Doctor/DocSignUp';
import DocLogin from './pages/Doctor/DocLogin';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PatSignUp from './pages/Patient/PatSignUp';
import PatLogin from './pages/Patient/PatLogin';
import PatientDashboard from './pages/Patient/PatientDashboard';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/PatientLogin" element={<PatientAuth />} />
					<Route path="/PatientDetailsForm" element={<PatientDetail />} />
					<Route path="/DocSignUp" element={<DocSignUp />} />
					<Route path="/DocLogin" element={<DocLogin />} />
					<Route path="/doctorDashboard" element={<DoctorDashboard />} />
					<Route path="/PatSignUp" element={<PatSignUp />} />
					<Route path="/PatLogin" element={<PatLogin />} />
					<Route path="/patientDashboard" element={<PatientDashboard />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

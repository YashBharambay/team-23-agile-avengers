import './App.css';
import PatientDetail from '../src/component/patientDetail';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import PatientAuth from './pages/PatientAuth';
import DocLogin from './pages/DocLogin';
import DocSignUp from './pages/DocSignUp';
import DoctorDashboard from './pages/DoctorDashboard';

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
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

import './App.css';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import PatientAuth from './pages/PatientAuth';
import DocLogin from './pages/DocLogin';
import DocSignUp from './pages/DocSignUp';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDetail from './component/PatientDetailForm/patientDetail';
import PatLogin from './pages/PatLogin';
import PatSignUp from './pages/PatSignUp';
import PatientDashboard from './pages/PatientDashboard';

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

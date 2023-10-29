import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import PatientAuth from './pages/PatientAuth';
import PatientDetail from './components/PatientDetailForm/patientDetail';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/PatientLogin" element={<PatientAuth />} />
				<Route path="/PatientDetailsForm" element={<PatientDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

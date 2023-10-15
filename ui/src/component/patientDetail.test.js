import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PatientDetail from './patientDetail';

test('renders PatientId field', () => {
	render(<PatientDetail />);
	const patientIdField = screen.getByLabelText(/PatientId/i);
	expect(patientIdField).toBeInTheDocument();
});

test('renders First Name field', () => {
	render(<PatientDetail />);
	const firstNameField = screen.getByLabelText(/First Name/i);
	expect(firstNameField).toBeInTheDocument();
});

test('Age field accepts only numbers', () => {
	const { getByLabelText } = render(<PatientDetail />);
	const ageInput = getByLabelText('Age');
	fireEvent.change(ageInput, { target: { value: 'abc' } }); //Entered NonNumber
	expect(ageInput.value).toBe(''); // Value should be an empty string after invalid input
});

test('Age field accepts numeric input', () => {
	const { getByLabelText } = render(<PatientDetail />);
	const ageInput = getByLabelText('Age');
	fireEvent.change(ageInput, { target: { value: '25' } }); //Enter Number
	expect(ageInput.value).toBe('25'); // Value should remain as '25'
});

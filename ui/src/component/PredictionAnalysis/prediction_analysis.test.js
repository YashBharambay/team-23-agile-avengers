import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Prediction from './prediction_analysis';

test('Prediction renders without errors', () => {
	render(<Prediction />);
	const PredictionsHeading = screen.getByRole('heading', {
		name: 'Cardio Vascular Disorder Prediction',
	});
	expect(PredictionsHeading).toBeInTheDocument();
});

// test('renders button with correct label', () => {
// 	const label = 'Click me';
// 	const { getByText } = render(<ButtonComponent label={label} />);

// 	const buttonElement = getByText(label);
// 	expect(buttonElement).toBeInTheDocument();
// });

test('updates state when input values change', () => {
	render(<Prediction />);
	const ageInput = screen.getByLabelText('Age:');

	fireEvent.change(ageInput, { target: { value: '30' } });

	expect(ageInput.value).toBe('30');
});

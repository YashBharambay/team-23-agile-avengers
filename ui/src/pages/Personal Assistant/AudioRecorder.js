import React, { useContext, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material/';
import { doSignOut } from '../../firebase/functions';
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import './PADashboard.css';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import SymptomForm from './SymptomForm';

import Recorder from 'recorder-js';

function timeout(delay) {
	return new Promise((res) => setTimeout(res, delay));
}

function generateQuestions(symptom, time_period) {
	// Function to determine if it's day or night
	const getDayOrNight = () => {
		const hours = new Date().getHours();
		return hours < 12 ? 'night' : 'day';
	};

	// Determine day or night
	const day_or_night = getDayOrNight();

	// General questions object
	const general_questions = {
		primary_symtom: `Has the ${symptom} been troubling you during the ${day_or_night}? Please say Yes or No`,
		severity: `On a scale from 1 to 5, with 1 being very mild and 5 being extremely severe, how would you rate the severity of your ${symptom}?`,
		duration: `Has the symptom been present for more than ${time_period} continuously? Please say Yes or No`,
		continuous: `Can you tell me if the ${symptom} has been continuous? Please say Yes or No`,
	};

	return general_questions;
}

// Example usage
//const symptom = 'pain';
//const time_period = '2 hours';
//const questions = generateQuestions(symptom, time_period);
//console.log(questions);

const AudioRecorder = () => {
	const emojiData = [
		{ emoji: '😴', name: 'Sleeping' },
		{ emoji: '👂', name: 'Listening' },
		{ emoji: '🤓', name: 'Talking' },
		{ emoji: '🤔', name: 'Thinking' },
		{ emoji: '🥱', name: 'Yawning' },
		{ emoji: '🍕', name: 'food' },
		{ emoji: '🚰', name: 'water' },
		{ emoji: '🚽', name: 'restroom' },
	];

	const changeEmoji = () => {
		const nextIndex = (currentIndex + 1) % emojiData.length;
		setCurrentIndex(nextIndex);
	};

	const [currentIndex, setCurrentIndex] = useState(0);

	const currentEmoji = emojiData[currentIndex].emoji;
	const currentEmojiName = emojiData[currentIndex].name;

	const [recorder, setRecorder] = useState(null);
	const [audioURL, setAudioURL] = useState('');
	const [responseLabel, setResponseLabel] = useState('');

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const audioContext = new (window.AudioContext ||
					window.webkitAudioContext)();

				const sampleRate = 16_000;

				const newRecorder = new Recorder(audioContext, {
					format: 'wav', // Specify WAV format
					sampleRate: sampleRate,
				});
				newRecorder.init(stream);
				setRecorder(newRecorder);
			})
			.catch((error) => console.error('Error accessing media devices.', error));
	}, []);

	const startRecording = () => {
		recorder && recorder.start();
		const nextIndex = 1;
		setCurrentIndex(nextIndex);
	};

	const stopRecording = () => {
		if (recorder) {
			recorder.stop().then(({ blob }) => {
				setAudioURL(URL.createObjectURL(blob));
				const nextIndex = 3;
				setCurrentIndex(nextIndex);
				uploadAudio(blob); // Call the upload function
			});
		}
	};

	const uploadAudio = async (audioBlob) => {
		let data = null;
		const formData = new FormData();
		formData.append('file', audioBlob, 'recording.wav');

		try {
			const response = await fetch('http://127.0.0.1:5000/audio', {
				method: 'POST',
				body: formData,
			});
			console.log(response, 'resp');

			if (response.ok) {
				const result = await response.json();
				console.log(result, 'res');
				respond(result.label);
				speechHandler(msg);
				await timeout(5000);
				setCurrentIndex(0);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const [ourText, setOurText] = useState('');
	const msg = new SpeechSynthesisUtterance();

	const speechHandler = (msg) => {
		window.speechSynthesis.speak(msg);
	};

	const respond = (text) => {
		console.log(text);
		switch (text) {
			case 'water':
				setCurrentIndex(6);
				msg.text = 'Staff notified about water';
				break;
			case 'food':
				setCurrentIndex(5);
				msg.text = 'Staff notified about food';
				break;
			case 'restroom':
				setCurrentIndex(7);
				msg.text = 'Staff notified about restroom';
				break;
			default:
				text = 'others';
				setCurrentIndex(2);
				msg.text = 'Staff notified you need assistance';
		}
	};

	return (
		<div className="App" onMouseDown={startRecording} onMouseUp={stopRecording}>
			<div>
				<Button
					variant="outlined"
					color="secondary"
					className="top-right-button"
					//onClick= // Call handleSignUp on button click
					href="/SymptomForm"
				>
					Ask Questions
				</Button>
			</div>
			<div className="center-content">
				<div className="emoji-container">{currentEmoji}</div>
				<div className="emoji-name">{currentEmojiName}</div>
			</div>
		</div>
	);
};

export default AudioRecorder;

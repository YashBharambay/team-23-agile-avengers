import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material/';
import { doSignOut } from '../../firebase/functions';
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import './PADashboard.css';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';

URL = window.URL || window.webkitURL;

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //audio context to help us record

const AudioRecorder = () => {
	const [audioURL, setAudioURL] = useState('');
	const [mediaRecorder, setMediaRecorder] = useState(null);

	const emojiData = [
		{ emoji: '😴', name: 'Sleeping' },
		{ emoji: '👂', name: 'Listening' },
		{ emoji: '🤓', name: 'Talking' },
		{ emoji: '🙂', name: 'Happy Happy' },
		{ emoji: '🥱', name: 'Yawning' },
	];

	const changeEmoji = () => {
		const nextIndex = (currentIndex + 1) % emojiData.length;
		setCurrentIndex(nextIndex);
	};

	const [currentIndex, setCurrentIndex] = useState(0);
	const [audioUrl, setAudioUrl] = useState(null);
	const [audioBlob, setAudioBlob] = useState(null);

	useEffect(() => {
		// Request permissions and create media stream
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const newMediaRecorder = new MediaRecorder(stream);

				setMediaRecorder(newMediaRecorder);

				newMediaRecorder.ondataavailable = (e) => {
					const audioBlob = new Blob([e.data], { type: 'audio/mp3' });
					const audioUrl = URL.createObjectURL(audioBlob);
					setAudioURL(audioUrl);
					setAudioBlob(audioBlob);
				};
			})
			.catch((error) => console.error('Error accessing media devices.', error));
	}, []);

	const startRecording = () => {
		if (mediaRecorder && mediaRecorder.state === 'inactive') {
			const nextIndex = 1;
			setCurrentIndex(nextIndex);
			mediaRecorder.start();
		}
	};

	const uploadAudio = () => {
		if (audioBlob) {
			const formData = new FormData();
			formData.append('file', audioBlob, 'recording.mp3'); // 'recording.mp3' is the filename

			fetch('http://localhost:5000/audio', {
				method: 'POST',
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => console.log('Success:', data))
				.catch((error) => console.error('Error:', error));
		}
	};

	useEffect(() => {
		if (audioBlob) {
			uploadAudio(); // Call upload function when a new audioBlob is set
		}
	}, [audioBlob]);

	const stopRecording = () => {
		if (mediaRecorder && mediaRecorder.state === 'recording') {
			mediaRecorder.stop();

			console.log('2', { audioBlob });
			//let audio = new Audio({ audioURL });
			//audio = new Audio({ audioURL });

			//const fd = new FormData();
			//fd.set('file', audio, 'audio.wav');
			//fetch('http://127.0.0.1:5000/audio', { method: 'POST', body: audio });
			const nextIndex = 3;
			setCurrentIndex(nextIndex);
		}
	};

	const currentEmoji = emojiData[currentIndex].emoji;
	const currentEmojiName = emojiData[currentIndex].name;

	return (
		<div className="App" onMouseDown={startRecording} onMouseUp={stopRecording}>
			<div>
				<Button
					variant="outlined"
					color="secondary"
					className="top-right-button"
					onClick={doSignOut} // Call handleSignUp on button click
				>
					Sign Out
				</Button>
			</div>

			<div className="center-content">
				<div className="emoji-container">{currentEmoji}</div>
				<div className="emoji-name">{currentEmojiName}</div>
				{audioURL && <audio src={audioURL} controls />}
				{audioURL}
			</div>
		</div>
	);
};

export default AudioRecorder;

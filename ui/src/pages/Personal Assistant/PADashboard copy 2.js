import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material/';
import { doSignOut } from '../../firebase/functions';
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import AudioRecorder from './AudioRecorder';
import './PADashboard.css';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';

export default function PADashboard() {
	const { currentUser } = useContext(AuthContext);
	const [hasProfile, setHasProfile] = useState(false);
	const [loading, setLoading] = useState(true);

	const fetchData = async (email) => {
		try {
			const url = 'http://localhost:3002/patients/' + email;
			let ans = await axios.get(url);
			console.log(email);
			console.log('*********************profile:- ', ans.data);
			setHasProfile(ans.data);
			setLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

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



	const onMouseDown = () => {
		const nextIndex = 1;
		setCurrentIndex(nextIndex);
		//startRecording();
		<AudioRecorder />startRecording();
	};

	const onMouseUp = () => {

		//stopRecording();
		const nextIndex = 3;
		setCurrentIndex(nextIndex);
		// Playback will be handled after recording stops and the blob URL is set
		if (audioUrl) {
			const nextIndex = 2;
			setCurrentIndex(nextIndex);
			const audio = new Audio(audioUrl);
			audio.play();
			nextIndex = 3;
			setCurrentIndex(nextIndex);
		}
	};

	const playAudio = () => {
		//if (audioUrl) {
		//	const audio = new Audio(audioUrl);
		//	audio.play();
			const nextIndex = 3;
			setCurrentIndex(nextIndex);
		//}
	};

	useEffect(() => {
		console.log('in load');
		if (currentUser) {
			fetchData(currentUser.email);
		}
	}, [currentUser]);

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	const currentEmoji = emojiData[currentIndex].emoji;
	const currentEmojiName = emojiData[currentIndex].name;

	return (
		<div className="App" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
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
			</div>
		</div>
	);
}

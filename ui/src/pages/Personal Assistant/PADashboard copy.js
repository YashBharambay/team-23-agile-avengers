import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material/';
import { doSignOut } from '../../firebase/functions';
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
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

	const [currentIndex, setCurrentIndex] = useState(0);

	const changeEmoji = () => {
		// Calculate the next index
		const nextIndex = (currentIndex + 1) % emojiData.length;
		setCurrentIndex(nextIndex);
	};

	// Access the current emoji and its name using the current index
	const currentEmoji = emojiData[currentIndex].emoji;
	const currentEmojiName = emojiData[currentIndex].name;

	useEffect(() => {
		console.log('in load');
		if (currentUser) {
			fetchData(currentUser.email);
		}
	}, [currentUser]);

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	return (
		<div className="App" onClick={changeEmoji}>
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

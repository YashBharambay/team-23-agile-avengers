import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Button,
	Container,
	Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { doSignOut } from '../firebase/functions';

const Navbar = (user) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const linkTo = user === 'patient' ? '/patientDashboard' : '/doctorDashboard';

	const toggleDrawer = (open) => () => {
		setDrawerOpen(open);
	};

	const menuItems = ['Home', 'About'];

	return (
		<Box sx={{ width: '100%' }}>
			<AppBar position="static">
				<Toolbar>
					<Container sx={{ width: '100%' }}>
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							<Button color="inherit">Home</Button>
						</Link>
						<Link
							to="/about"
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<Button color="inherit">About</Button>
						</Link>
						<Link
							to="/contact"
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<Button color="inherit">Contact</Button>
						</Link>
						{/* <Button onClick={doSignOut} style={{ color: 'white' }}>
							SignOut
						</Button> */}
					</Container>
					<Button
						variant="outlined"
						onClick={doSignOut} // Call handleSignUp on button click
						color="inherit"
					>
						Sign Out
					</Button>
				</Toolbar>
			</AppBar>

			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
				<List>
					{menuItems.map((item) => (
						<ListItem button key={item} onClick={toggleDrawer(false)}>
							<ListItemText primary={item} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};

export default Navbar;

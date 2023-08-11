import {FC} from 'react';
import Profile from 'components/Profile/Profile';
import NavBar from 'components/Navbar/NavBar';
import classes from './profile.module.css';


const ProfilePage: FC = () => {
	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.centered}>
				<Profile />
			</div>
		</div>
	);
};


export default ProfilePage;
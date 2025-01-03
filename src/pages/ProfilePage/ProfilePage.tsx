import { FC } from 'react';
import { Profile } from 'components/Profile/Profile';
import { Navbar } from 'components/Navbar/Navbar';
import classes from './profile.module.css';


const ProfilePage: FC = () => {
	return (
		<div className={classes.container}>
			<Navbar />
			<div className={classes.centered}>
				<Profile />
			</div>
		</div>
	);
};


export default ProfilePage;
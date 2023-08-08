import {FC} from 'react';
import Profile from 'components/Profile/Profile';
import NavBar from 'components/Navbar/NavBar';
import classes from './pages.module.css';


const ProfilePage: FC = () => {
	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.page__center}>
				<Profile />
			</div>
		</div>
	)
}


export default ProfilePage;
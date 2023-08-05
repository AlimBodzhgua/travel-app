import {FC} from 'react';
import NavBar from 'components/Navbar/NavBar';
import classes from './pages.module.css';


const ProfilePage: FC = () => {
	return (
		<div className={classes.container}>
			<NavBar></NavBar>
			<h1>ProfilePage</h1>
		</div>
	)
}


export default ProfilePage;
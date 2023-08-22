import {FC} from 'react';
import NavBar from 'components/Navbar/NavBar';
import classes from './friends.module.css';

const FriendsPage: FC = () => {
	return (
		<div className={classes.container}>
			<NavBar />
			<h2>Friends list</h2>
		</div>
	)
}


export default FriendsPage;
import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './not-found.module.css';

const NotFoundPage: FC = () => {
	return (
		<div className={classes.centered}>
			<h1>
				Page not found.<br/>
				Such page does not exist or not available if you not logged in
			</h1>
			<NavLink 
				to='/'
				className={classes.link}
			>Go to home page</NavLink>
		</div>
	);
};

export default NotFoundPage;
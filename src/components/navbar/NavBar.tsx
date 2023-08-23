import {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import classes from './navbar.module.css';

const NavBar: FC = () => {
	return (
		<nav className={classes.nav}>
			<div className={classes.nav__left}>
				<h1 className={classes.logo}>
					<NavLink className={classes.logo__link} to='/'>
						Travel 
						<span className={classes.logo__blue}>Pro</span>
					</NavLink>
				</h1>
				<NavLink to='/travels' className={classes.nav__link}>
					My Travels
				</NavLink>
				<NavLink to='/users' className={classes.nav__link}>
					Users
				</NavLink>
			</div>	
			<div className={classes.nav__right}>		
				<NavLink to='/friends' className={classes.nav__link}>
					Friends
				</NavLink>
				<NavLink to='/profile' className={classes.nav__link}>
					Profile
				</NavLink>
			</div>
		</nav>
	);
};

export default memo(NavBar);
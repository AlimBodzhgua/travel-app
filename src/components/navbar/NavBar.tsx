import {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import classes from './navbar.module.css';

const NavBar: FC = () => {
	return (
		<nav className={classes.nav}>
			<div className={classes.nav__left}>
				<h1 className={classes.logo}>
					Travel 
					<span className={classes.logo__blue}>Pro</span>
				</h1>
				<NavLink to='/travels' className={classes.nav__link}>
					My Travels
				</NavLink>
			</div>			
			<NavLink to='/profile' className={classes.nav__link}>
				Profile
			</NavLink>
		</nav>
	)
}

export default memo(NavBar);
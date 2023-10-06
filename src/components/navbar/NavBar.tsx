import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteNames } from 'router/routes';

import classes from './navbar.module.css';

const NavBar: FC = () => {
	return (
		<nav className={classes.nav}>
			<div className={classes.nav__left}>
				<h1 className={classes.logo}>
					<NavLink
						className={classes.logo__link}
						to={RouteNames.HOME}
					>
						Travel 
						<span className={classes.logo__blue}>Pro</span>
					</NavLink>
				</h1>
				<NavLink
					to={RouteNames.TRAVELS}
					className={classes.nav__link}
				>
					My Travels
				</NavLink>
				<NavLink
					to={RouteNames.USERS}
					className={classes.nav__link}
				>
					Users
				</NavLink>
			</div>	
			<div className={classes.nav__right}>		
				<NavLink
					to={RouteNames.FRIENDS}
					className={classes.nav__link}
				>
					Friends
				</NavLink>
				<NavLink
					to={RouteNames.PROFILE}
					className={classes.nav__link}
				>
					Profile
				</NavLink>
			</div>
		</nav>
	);
};

export default memo(NavBar);
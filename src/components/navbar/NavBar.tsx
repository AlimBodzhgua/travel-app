import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import {
	AppLink,
	AppLinkSize,
	AppLinkTheme
} from 'components/UI/AppLink/AppLink';

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
				<AppLink
					to={RouteNames.TRAVELS}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					My Travels 
				</AppLink>
				<AppLink
					to={RouteNames.USERS}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					Users
				</AppLink>
			</div>	
			<div className={classes.nav__right}>	
				<AppLink
					to={RouteNames.FRIENDS}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					Friends
				</AppLink>
				<AppLink
					to={RouteNames.PROFILE}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					Profile
				</AppLink>
			</div>
		</nav>
	);
};

export default memo(NavBar);
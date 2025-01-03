import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { AppLink, AppLinkSize, AppLinkTheme } from 'components/UI/AppLink/AppLink';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';

import classes from './navbar.module.css';

export const Navbar: FC = memo(() => {
	const { t } = useTranslation();

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
					{t('My Travels')} 
				</AppLink>
				<AppLink
					to={RouteNames.USERS}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					{t('Users')}
				</AppLink>
			</div>	
			<div className={classes.nav__right}>	
				<AppLink
					to={RouteNames.FRIENDS}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					{t('Friends')}
				</AppLink>
				<AppLink
					to={RouteNames.PROFILE}
					theme={AppLinkTheme.CLEAR}
					size={AppLinkSize.SMALL}
				>
					{t('Profile')}
				</AppLink>
				<LangSwitcher />
			</div>
		</nav>
	);
});

import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classes from './not-found.module.css';

const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={classes.centered}>
			<h1>
				Page not found.<br/>
				Such page does not exist or not available if you not logged in
			</h1>
			<NavLink 
				to='/'
				className={classes.link}
			>{t('Go to home page')}</NavLink>
		</div>
	);
};

export default NotFoundPage;
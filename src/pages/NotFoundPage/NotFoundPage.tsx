import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page } from 'components/UI/Page/Page';
import classes from './not-found.module.css';

const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<Page>
			<h1 className={classes.title}>
				Page not found.<br/>
				Such page does not exist or not available if you not logged in
			</h1>
			<NavLink 
				to='/'
				className={classes.link}
			>{t('Go to home page')}</NavLink>
		</Page>
	);
};

export default NotFoundPage;
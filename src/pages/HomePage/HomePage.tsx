import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';
import { RouteNames } from 'router/routes';
import { useTranslation } from 'react-i18next';
import {
	AppLink,
	AppLinkTheme,
	AppLinkSize,
} from 'components/UI/AppLink/AppLink';
import { Page } from 'components/UI/Page/Page';
import { ReactComponent as TravelIcon } from 'assets/icons/trip.svg';
import classes from './home.module.css';


const HomePage: FC = () => {
	const { isAuth } = useAppSelector(state => state.user);
	const { t } = useTranslation();

	return (
		<Page>
			<TravelIcon className={classes.travelIcon} />
			<div className={classes.actions}>
				{isAuth ? (
					<>
						<AppLink
							to={RouteNames.PROFILE}
							size={AppLinkSize.MEDIUM}
							theme={AppLinkTheme.PRIMARY}
							className={classes.link}
						>
							{t('Profile')}
						</AppLink>
						<AppLink
							to={RouteNames.TRAVELS}
							size={AppLinkSize.MEDIUM}
							theme={AppLinkTheme.PRIMARY}
							className={classes.link}
						>
							{t('Travels')}
						</AppLink>
					</>
				) : (
					<>
						<AppLink
							to={RouteNames.REGISTER}
							size={AppLinkSize.MEDIUM}
							theme={AppLinkTheme.PRIMARY}
							className={classes.link}
						>
							{t('Register')}
						</AppLink>
						<AppLink
							to={RouteNames.LOGIN}
							size={AppLinkSize.MEDIUM}
							theme={AppLinkTheme.PRIMARY}
							className={classes.link}
						>
							{t('Login')}
						</AppLink>
					</>
				)}
			</div>
		</Page>
	);
};

export default HomePage;
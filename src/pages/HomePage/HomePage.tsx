import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';
import { RouteNames } from 'router/routes';
import { useTranslation } from 'react-i18next';
import {
	AppLink,
	AppLinkTheme,
	AppLinkSize,
} from 'components/UI/AppLink/AppLink';
import { Navbar } from 'components/Navbar/Navbar';
import classes from './home.module.css';


const HomePage: FC = () => {
	const { isAuth } = useAppSelector(state => state.user);
	const { t } = useTranslation();

	return (
		<div className={classes.container}>
			<Navbar />
			<div className={classes.centered}>
				{isAuth 
					?
						<>
							<AppLink
								to={RouteNames.PROFILE}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								{t('Profile')}
							</AppLink>
							<AppLink
								to={RouteNames.TRAVELS}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								{t('Travels')}
							</AppLink>
						</>
					:
						<>
							<AppLink
								to={RouteNames.REGISTER}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								{t('Register')}
							</AppLink>
							<AppLink
								to={RouteNames.LOGIN}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								{t('Login')}
							</AppLink>
						</>
				}
			</div>
		</div>
	);
};

export default HomePage;
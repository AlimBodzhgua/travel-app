import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';
import { RouteNames } from 'router/routes';
import {
	AppLink,
	AppLinkTheme,
	AppLinkSize,
} from 'components/UI/AppLink/AppLink';
import NavBar from 'components/Navbar/NavBar';
import classes from './home.module.css';


const HomePage: FC = () => {
	const { isAuth } = useAppSelector(state => state.user);

	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.centered}>
				{isAuth 
					?
						<>
							<AppLink
								to={RouteNames.PROFILE}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								Profile
							</AppLink>
							<AppLink
								to={RouteNames.TRAVELS}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								Travels
							</AppLink>
						</>
					:
						<>
							<AppLink
								to={RouteNames.REGISTER}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								Register
							</AppLink>
							<AppLink
								to={RouteNames.LOGIN}
								size={AppLinkSize.MEDIUM}
								theme={AppLinkTheme.PRIMARY}
							>
								Login
							</AppLink>
						</>
				}
			</div>
		</div>
	);
};

export default HomePage;
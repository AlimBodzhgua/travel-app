import {FC} from 'react';
import {useAppSelector} from 'hooks/redux';
import {NavLink} from 'react-router-dom';
import NavBar from 'components/Navbar/NavBar';
import classes from './home.module.css';

const HomePage: FC = () => {
	const {isAuth} = useAppSelector(state => state.userReducer);

	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.centered}>
				{isAuth 
					?
						<>
							<NavLink 
								to='/profile'
								className={classes.link}
							>profile</NavLink>
							<NavLink 
								to='/travels'
								className={classes.link}
							>travels</NavLink>
						</>
					:
						<>
							<NavLink 
								to='/regiser'
								className={classes.link}
							>register</NavLink>
							<NavLink 
								to='/login'
								className={classes.link}
							>login</NavLink>
						</>
				}
			</div>
		</div>
	)
}

export default HomePage;
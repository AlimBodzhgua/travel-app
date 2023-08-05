import {FC} from 'react';
import LoginForm from 'components/AuthForms/LoginForm';
import NavBar from 'components/Navbar/NavBar';
import classes from './pages.module.css';

const LoginPage: FC = () => {
	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.page__center}>
				<h1>Login in Account</h1>
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginPage;
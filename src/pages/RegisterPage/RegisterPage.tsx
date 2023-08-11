import {FC} from 'react';
import NavBar from 'components/Navbar/NavBar';
import RegisterForm from 'components/AuthForms/RegisterForm';

import classes from './register.module.css';

const RegisterPage: FC = () => {

	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.centered}>
				<h1>Register Account</h1>
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
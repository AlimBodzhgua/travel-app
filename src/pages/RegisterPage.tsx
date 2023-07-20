import {FC} from 'react';
import NavBar from 'components/navbar/NavBar';
import RegisterForm from 'components/AuthForms/RegisterForm';

import classes from './pages.module.css';

const RegisterPage: FC = () => {

	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.page__center}>
				<h1>Register Account</h1>
				<RegisterForm />
			</div>
		</div>
	)
}

export default RegisterPage;
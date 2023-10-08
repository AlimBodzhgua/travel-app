import { FC } from 'react';
import { RegisterForm } from 'components/AuthForms/RegisterForm/RegisterForm';
import { useTranslation } from 'react-i18next';
import NavBar from 'components/Navbar/NavBar';

import classes from './register.module.css';

const RegisterPage: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.centered}>
				<h1>{t('Register Account')}</h1>
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
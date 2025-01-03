import { FC } from 'react';
import { RegisterForm } from 'components/AuthForms';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'components/Navbar/Navbar';

import classes from './register.module.css';

const RegisterPage: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={classes.container}>
			<Navbar />
			<div className={classes.centered}>
				<h1>{t('Register Account')}</h1>
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
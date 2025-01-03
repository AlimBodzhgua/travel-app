import { FC } from 'react';
import { LoginForm } from 'components/AuthForms';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'components/Navbar/Navbar';
import classes from './login.module.css';

const LoginPage: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={classes.container}>
			<Navbar />
			<div className={classes.centered}>
				<h1>{t('Login in Account')}</h1>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
import { FC } from 'react';
import { LoginForm } from 'components/AuthForms/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import NavBar from 'components/Navbar/NavBar';
import classes from './login.module.css';

const LoginPage: FC = () => {
	const { t } = useTranslation()

	return (
		<div className={classes.container}>
			<NavBar />
			<div className={classes.centered}>
				<h1>{t('Login in Account')}</h1>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
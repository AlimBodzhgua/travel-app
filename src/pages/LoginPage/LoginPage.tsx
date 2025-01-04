import { FC } from 'react';
import { LoginForm } from 'components/AuthForms';
import { useTranslation } from 'react-i18next';
import { Page } from 'components/UI/Page/Page';
import classes from './login.module.css';

const LoginPage: FC = () => {
	const { t } = useTranslation();

	return (
		<Page>
			<h1 className={classes.title}>{t('Login in Account')}</h1>
			<LoginForm />
		</Page>
	);
};

export default LoginPage;
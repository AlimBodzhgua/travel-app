import { FC } from 'react';
import { RegisterForm } from 'components/AuthForms';
import { useTranslation } from 'react-i18next';
import { Page } from 'components/UI/Page/Page';

import classes from './register.module.css';

const RegisterPage: FC = () => {
	const { t } = useTranslation();

	return (
		<Page>
			<h1 className={classes.title}>{t('Register Account')}</h1>
			<RegisterForm />
		</Page>
	);
};

export default RegisterPage;
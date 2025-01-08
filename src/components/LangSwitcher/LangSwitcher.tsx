import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/UI/Button/Button';
import classes from './LangSwitcher.module.css';
import classnames from 'classnames';

export interface LangSwitcherProps {
	className?: string;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({className}) => {
	const { t, i18n } = useTranslation();

	const toggleLang = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			theme='clear'
			size='sm'
			className={classnames(classes.LangSwitcher, className)}
			onClick={toggleLang}
		>
			{t('Lang')}
		</Button>
	);
};
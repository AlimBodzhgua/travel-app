import { FC, useCallback, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectTravels } from 'redux/selectors/selectors';
import { Button } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { TravelList } from 'components/TravelList';
import { TravelCreateForm } from 'components/CreateForms/TravelCreateForm/TravelCreateForm';
import classes from './travels.module.css';


const TravelsPage: FC = () => {
	const travels = useAppSelector(selectTravels);
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const { t } = useTranslation();
	
	const onToggleShowForm = useCallback(() => {
		setShowCreateForm(prev => !prev);
	}, []);

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.title}>Travels</h1>
				<Button
					theme='primary'
					size='sm'
					onClick={onToggleShowForm}
				>
					{t('Create trip')}
				</Button>
			</header>
			{travels.length 
				? <TravelList travels={travels}/>
				: <h3>{t('You don`t have any planned trips yet')}</h3>
			}
			{showCreateForm && <TravelCreateForm onCloseForm={onToggleShowForm}/>}
		</>
	);
};

export default TravelsPage;
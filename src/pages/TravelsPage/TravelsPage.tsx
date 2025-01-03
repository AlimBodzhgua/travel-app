import { FC, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectTravels } from 'redux/selectors/selectors';
import { Button, ButtonTheme, ButtonSize } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'components/Navbar/Navbar';
import { TravelList } from 'components/TravelList';
import { TravelCreateForm } from 'components/CreateForms/TravelCreateForm/TravelCreateForm';
import classes from './travels.module.css';


const TravelsPage: FC = () => {
	const travels = useAppSelector(selectTravels);
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const { t } = useTranslation();

	const onShowFrom = () => setShowCreateForm(true);
	
	const onCloseForm = () => setShowCreateForm(false);

	return (
		<div>
			<div className={classes.container}>
				<Navbar />
				<header className={classes.header}>
					<h1 className={classes.page__title}>Travels</h1>
					<Button
						theme={ButtonTheme.PRIMARY}
						size={ButtonSize.SMALL}
						onClick={onShowFrom}
					>
						{t('Create trip')}
					</Button>
				</header>
				{travels.length 
					? <TravelList travels={travels}/>
					: <h3>{t('You don`t have any planned trips yet')}</h3>
				}
				{showCreateForm && <TravelCreateForm onCloseForm={onCloseForm}/>}
			</div>
		</div>
	);
};

export default TravelsPage;
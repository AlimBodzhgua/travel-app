import {FC, useState} from 'react';
import {useAppSelector} from 'hooks/redux';
import NavBar from 'components/navbar/NavBar';
import TravelList from 'components/travel/TravelList';
import TravelCreateForm from 'components/CreateForms/TravelCreateForm/TravelCreateForm';
import classes from './pages.module.css';


const TravelsPage: FC = () => {
	const travels = useAppSelector(state => state.userReducer.user?.travels);

	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const handleClick = () => setShowCreateForm(true);

	return (
		<div>
			<div className="container">
				<NavBar />
				<header className={classes.header}>
					<h1 className={classes.page__title}>Travels</h1>
					<button className={classes.button} onClick={handleClick}>Create trip</button>
				</header>
				{travels?.length 
					? <TravelList travels={travels}/>
					: <h3>You don`t have any planned trips yet</h3>
				}
				{showCreateForm &&
					<TravelCreateForm
						setShowCreateForm={setShowCreateForm}
					/>
				}
			</div>
		</div>
	)
}

export default TravelsPage;
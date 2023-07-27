import {FC} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector} from 'hooks/redux';
import NavBar from 'components/navbar/NavBar';
import BacklogList from 'components/BacklogList/BacklogList';
import Groups from 'components/Groups/Groups';
import classes from './pages.module.css';

const TravelDetailsPage: FC = () => {
	const { id } = useParams<{id? : string}>();
	const { user } = useAppSelector(state => state.userReducer);
	const travel  = useAppSelector(state => 
		state.userReducer.user?.travels.find(travel => travel.id === Number(id))
	);

	return (
		<div>
			<div className={classes.container}>
				<NavBar />
				<div>
					<h1>{travel?.name}</h1>
				</div>
				<div className={classes.details}>
					{travel && 
						<BacklogList backlogs={travel.backlog}/>
					}
					<Groups />
				</div>
			</div>
		</div>
	)
}


export default TravelDetailsPage;
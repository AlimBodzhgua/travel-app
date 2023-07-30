import {FC} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector} from 'hooks/redux';
import { selectTravelById } from 'redux/selectors/selectors';
import NavBar from 'components/navbar/NavBar';
import BacklogList from 'components/BacklogList/BacklogList';
import Groups from 'components/Groups/Groups';
import TravelItem from 'components/travel/TravelItem';
import classes from './pages.module.css';

const TravelDetailsPage: FC = () => {
	const { id } = useParams<{id? : string}>();
	const { user } = useAppSelector(state => state.userReducer);
	const travel = useAppSelector(state => selectTravelById(state, Number(id)));

	return (
		<div>
			<div className={classes.container}>
				<NavBar />
				{travel && 
					<>
						<TravelItem 
							id={travel.id}
							name={travel.name}
							dateStart={travel.dateStart}
							dateEnd={travel.dateEnd}
						/>
						<div className={classes.details}>
							<BacklogList backlogs={travel.backlog}/>
							<Groups />
						</div>
					</>
				}
			</div>
		</div>
	)
}


export default TravelDetailsPage;
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { selectTravelById } from 'redux/selectors/selectors';
import { TravelItem } from 'components/travel/TravelItem/TravelItem';
import NavBar from 'components/Navbar/NavBar';
import Members from 'components/Members/Members';
import BacklogList from 'components/Backlog/BacklogList/BacklogList';
import Groups from 'components/Groups/Groups';
import classes from './travel-details.module.css';

const TravelDetailsPage: FC = () => {
	const { id } = useParams<{id? : string}>();
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
						<Members />
						<div className={classes.details}>
							<BacklogList />
							<Groups />
						</div>
					</>
				}
			</div>
		</div>
	);
};


export default TravelDetailsPage;
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { selectTravelById } from 'redux/selectors/selectors';
import { TravelItem } from 'components/TravelList';
import { Navbar } from 'components/Navbar/Navbar';
import { Members } from 'components/Members';
import { BacklogList } from 'components/Backlog';
import { Groups } from 'components/Groups';
import classes from './travel-details.module.css';

const TravelDetailsPage: FC = () => {
	const { id } = useParams<{id? : string}>();
	const travel = useAppSelector(state => selectTravelById(state, Number(id)));

	return (
		<div>
			<div className={classes.container}>
				<Navbar />
				{travel && 
					<>
						<TravelItem travel={travel}/>
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
import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { selectTravelById } from 'redux/selectors/selectors';
import { TravelItem } from 'components/TravelList';
import { Members } from 'components/Members';
import { BacklogList } from 'components/Backlog';
import { Groups } from 'components/Groups';
import { TravelRoute } from 'components/TravelRoute/TravelRoute';
import classes from './travel-details.module.css';

const TravelDetailsPage: FC = () => {
	const { id } = useParams<{id? : string}>();
	const travel = useAppSelector(state => selectTravelById(state, id!));

	if (!travel) {
		return <div>Loading...</div>
	}
	
	return (
		<>
			<TravelItem travel={travel}/>
			<Members />
			<div className={classes.details}>
				<div className={classes.leftColumn}>
					<BacklogList />
					<TravelRoute />
				</div>
				<Groups />
			</div>
		</>
	);
};


export default TravelDetailsPage;
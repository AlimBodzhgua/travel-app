import {FC} from 'react';
import {ITravel} from 'types/types';
import TravelItem from './TravelItem';
import classes from './travel.module.css';

interface TravelListProps {
	travels: ITravel[];
}

const TravelList: FC<TravelListProps> = ({travels}) => {

	return (
		<ul className={classes.list}>
			{travels.map(travel => 
				<TravelItem 
					key={travel.id}
					id={travel.id}
					name={travel.name}
					dateStart={travel.dateStart}
					dateEnd={travel.dateEnd}
				/>
			)}
		</ul>
	)
}

export default TravelList;
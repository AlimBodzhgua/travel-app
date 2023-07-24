import {FC} from 'react';
import TravelItem from './TravelItem';
import classes from './travel.module.css';

const TravelList: FC = () => {
	return (
		<ul className={classes.list}>
			<TravelItem />
		</ul>
	)
}

export default TravelList;
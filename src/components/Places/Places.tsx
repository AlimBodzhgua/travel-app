import { FC, memo } from 'react';
import classnames from 'classnames';

import { ReactComponent as RouteIcon } from 'assets/icons/route.svg';
import { PlaceItem } from './PlaceItem';
import classes from './Places.module.css';

interface PlacesProps {
	places: string[];
	className?: string;
}

export const Places: FC<PlacesProps> = memo((props) => {
	const { places, className } = props;


	if (!places.length) {
		return (
			<div className={classes.emptyMsg}>
				<div>No planned places yet</div>
				<RouteIcon className={classes.routeIcon}/>
			</div>
		)
	}

	return (
		<ul className={classnames(classes.Places, className)}>
			{places.map((place, index) => (
				<PlaceItem
					key={index}
					place={place}
					number={index + 1}
				/>
			))}	
		</ul>
	);
});
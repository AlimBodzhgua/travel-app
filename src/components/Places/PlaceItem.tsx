import { FC, memo } from 'react';
import classes from './Places.module.css'
import classnames from 'classnames';
import { NumberedPin } from 'components/UI/NumberedPin/NumberedPin';

interface PlaceItemProps {
	place: string;
	number: number;
	className?: string;
}

export const PlaceItem: FC<PlaceItemProps> = (props) => {
	const {
		place,
		number,
		className,
	} = props;

	return (
		<li className={classnames(classes.PlaceItem, className)}>
			<NumberedPin number={number}/>
			<h4 className={classes.title}>{place}</h4>
		</li>
	)
}
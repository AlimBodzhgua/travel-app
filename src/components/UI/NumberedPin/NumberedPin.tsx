import { FC, memo } from 'react';
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg';
import classnames from 'classnames';

import classes from './NumberedPin.module.css'

interface NumberedPinProps {
	number: number;
	className?: string;
}

export const NumberedPin: FC<NumberedPinProps> = memo((props) => {
	const {
		number = 1,
		className,
	} = props;

	return (
		<div className={classnames(classes.NumberedPin, className)}>
			<div className={classes.number}>{number}</div>
			<PinIcon className={classes.pinIcon}/>
		</div>
	);
});
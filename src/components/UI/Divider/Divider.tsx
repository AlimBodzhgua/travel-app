import { FC, memo } from 'react';
import classnames from 'classnames';
import classes from './Divider.module.css';

type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
	orientation?: DividerOrientation; 
	size?: string;
	className?: string;
};

export const Divider: FC<DividerProps> = memo((props) => {
	const {
		orientation = 'horizontal',
		size = '100px',
		className,
	} = props;

	const dividerWidth = orientation === 'horizontal' ? size : '1.5px';
	const dividerHeight = orientation === 'horizontal' ? '1.5px' : size;
	const margin = orientation === 'horizontal' ? '4px 0' : '0 4px';  

	return (
		<div
			className={classnames(classes.Divider, className)}
			style={{ width: dividerWidth, height: dividerHeight, margin }}
		/>
	);
});
import { FC, memo, ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Hotkey.module.css';

interface HotkeyProps {
	children: ReactNode;
	rounded?: boolean;
	className?: string;
}

export const Hotkey: FC<HotkeyProps> = memo((props) => {
	const {
		rounded = true,
		children,
		className,
	} = props;

	return (
		<div className={classnames(classes.Hotkey, className, {[classes.rounded]: rounded})}>
			{children}
		</div>
	);
});
import {
	FC,
	memo,
	ButtonHTMLAttributes,
	ReactNode,
} from 'react';
import classnames from 'classnames';
import classes from './Button.module.css';

export enum ButtonTheme {
	PRIMARY = 'primary',
	BLUE = 'blue',
	CLEAR = 'clear',
	RED = 'red',
}

export enum ButtonSize {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	square?: boolean;
	theme?: ButtonTheme;
	size?: ButtonSize;
	className?: string;
}

export const Button: FC<ButtonProps> = memo((props) => {
	const {
		children,
		className,
		square,
		theme = ButtonTheme.PRIMARY,
		size = ButtonSize.MEDIUM,
		...otherProps
	} = props;

	

	return (
		<button
			className={classnames(
				classes.Button,
				classes[theme],
				classes[size],
				className,
				{[classes.square]: square},
			)}
			{...otherProps}
		>{children}</button>
	)
})



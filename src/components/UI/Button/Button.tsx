import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Button.module.css';

type ButtonTheme = 'primary' | 'blue' | 'red' | 'clear';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	square?: boolean;
	theme?: ButtonTheme;
	size?: ButtonSize;
	className?: string;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		children,
		className,
		square,
		theme = 'primary',
		size = 'md',
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
		>
			{children}
		</button>
	);
};



import {
	FC,
	memo,
	ReactNode,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classnames from 'classnames';
import classes from './AppLink.module.css';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	CLEAR = 'clear',
}

export enum AppLinkSize {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
}

interface AppLinkProps extends LinkProps {
	children: ReactNode;
	theme?: AppLinkTheme;
	size?: AppLinkSize;
	className?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
	const {
		children,
		className,
		theme = AppLinkTheme.CLEAR,
		size = AppLinkSize.SMALL,
		...otherProps
	} = props;


	return (
		<Link
			className={classnames(
				className,
				classes.AppLink,
				classes[theme],
				classes[size]
			)}
			{...otherProps}
		>
			{children}
		</Link>
	)
});
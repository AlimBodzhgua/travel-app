import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import classes from './Page.module.css';

interface PageProps {
	children: ReactNode;
	VCenetered?: boolean;
	HCentered?: boolean;
}

export const Page: FC<PageProps> = (props) => {
	const {
		children,
		VCenetered = true,
		HCentered = true,
	} = props;

	return (
		<div className={classNames(
			classes.Page,
			{ [classes.VCenetered]: VCenetered },
			{ [classes.HCentered]: HCentered },
		)}>
			{children}
		</div>
	);
};
import { Navbar } from 'components/Navbar/Navbar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.css';

export const Layout: FC = () => {
	return (
		<div className={classes.container}>
			<Navbar />
			<Outlet />
		</div>
	);
};

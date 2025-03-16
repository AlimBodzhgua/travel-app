import { FC, useEffect, useCallback, memo, ReactNode, useState, Fragment } from 'react';
import classes from './popover.module.css';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Button } from '../Button/Button';

type PopoverPlacement = 'top' | 'bottom' | 'right' | 'left'

interface PopoverProps {
	isOpen: boolean;
	hasArrow?: boolean;
	closeButton?: boolean;
	placement?: PopoverPlacement;
	children: ReactNode;
	header?: ReactNode;
	body?: ReactNode;
	footer?: ReactNode;
	onToggle?: () => void;
	onClose: () => void;
}

export const Popover: FC<PopoverProps> = memo((props) => {
	const {
		isOpen,
		onToggle,
		onClose,
		children,
		hasArrow = true,
		closeButton = true,
		placement = 'top',
		header,
		body,
		footer,
	} = props;

	const onKeydown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
            onClose();
        }
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onKeydown);

		return () => window.removeEventListener('keydown', onKeydown);
	}, [onKeydown]);

	return (
		<Fragment>
			<div
				role='button'
				onClick={onToggle}
				className={classes.trigger}
			>
				{children}
			</div>
			<div className={classnames(classes.popup, { [classes.show]: isOpen }, classes[placement])}>
				<div className={classes.header}>
					<h3 className={classes.title}>{header}</h3>
					{closeButton && (
						<Button 
							theme='clear'
							className={classes.cancel}
							onClick={onClose}
						>
							<CloseIcon />
						</Button>
					)}
				</div>
				<div className={classes.body}>
					{body}
				</div>
				<div className={classes.footer}>
					{footer}
					{hasArrow && <div className={classes.triangle}></div>}
				</div>
			</div>
		</Fragment>
	);
});
import { FC, useEffect, useCallback } from 'react';
import classes from './popup.module.css';

interface PopupProps {
	handleCancelClick: () => void;
	handleDeleteClick: () => void;
}

const Popup: FC<PopupProps> = ({handleCancelClick, handleDeleteClick}) => {

	const onKeydown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
            handleCancelClick();
        }
	}, [])

	useEffect(() => {
		window.addEventListener('keydown', onKeydown);

		return () => window.removeEventListener('keydown', onKeydown);
	}, [])

	return (
		<div className={classes.modal}>
			<h2 className={classes.modal__title}>Delete exactly?</h2>
			<div>
				All group data (including all cards in it) will be permanently deleted
			</div>
			<div className={classes.modal__actions}>
				<button 
					className={classes.cancel}
					onClick={handleCancelClick}
				>
					Cancel
				</button>
				<button 
					className={classes.submit}
					onClick={handleDeleteClick}
				>
					Yes, delete
				</button>
				<div className={classes.triangle}></div>
			</div>
		</div>
	);
};

export default Popup;
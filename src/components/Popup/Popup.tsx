import { FC, useEffect, useCallback, memo } from 'react';
import classes from './popup.module.css';

interface PopupProps {
	onCancel: () => void;
	onDelete: () => void;
}

export const Popup: FC<PopupProps> = memo((props) => {
	const { onCancel, onDelete } = props;

	const onKeydown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
            onCancel();
        }
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onKeydown);

		return () => window.removeEventListener('keydown', onKeydown);
	}, [onKeydown]);

	return (
		<div className={classes.popup}>
			<h2 className={classes.title}>Delete exactly?</h2>
			<div>
				All group data (including all cards in it) will be permanently deleted
			</div>
			<div className={classes.actions}>
				<button 
					className={classes.cancel}
					onClick={onCancel}
				>
					Cancel
				</button>
				<button 
					className={classes.submit}
					onClick={onDelete}
				>
					Yes, delete
				</button>
				<div className={classes.triangle}></div>
			</div>
		</div>
	);
});

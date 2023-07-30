import {FC} from 'react';
import classes from './modal.module.css';

interface ModalProps {
	handleCancelClick: () => void;
	handleDeleteClick: () => void;
}

const Modal: FC<ModalProps> = ({handleCancelClick, handleDeleteClick}) => {
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
				>Cancel</button>
				<button 
					className={classes.submit}
					onClick={handleDeleteClick}
				>Yes, delete</button>
				<div className={classes.triangle}></div>
			</div>
		</div>
	)
}


export default Modal;
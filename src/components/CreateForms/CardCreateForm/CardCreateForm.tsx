import React, {FC} from 'react';
import classes from './card-create.module.css';

interface CardCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CardCreateForm: FC<CardCreateFormProps> = ({setShowCreateForm}) => {

	const handleCloseClick = () => {
		setShowCreateForm(false);
	}

	return (
		<div className={classes.form}>
			<input 
				type="text" 
				className={classes.form__input}
				placeholder='Enter card title...'
			/>
			<span className={classes.form__separator}></span>
			<textarea 
				name="" 
				cols={30} 
				rows={5}
				maxLength={150}
				placeholder='Enter here your plan'
				className={classes.form__textarea}
			/>
			<button
				onClick={handleCloseClick}
				className={classes.close}
			>&#10005;</button>
		</div>
	)
}

export default CardCreateForm;
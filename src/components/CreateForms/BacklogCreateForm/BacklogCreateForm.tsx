import React, {FC, useState} from 'react';
import {useAppDispatch} from 'hooks/redux';
import {useParams} from 'react-router-dom';
import { userSlice } from 'redux/reducers/userSlice';
import classes from './backlog-create.module.css';

interface BacklogCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BacklogCreateForm: FC<BacklogCreateFormProps> = ({setShowCreateForm}) => {
	const [value, setValue] = useState<string>('');
	const { id } = useParams<{id?: string}>();
	const dispatch = useAppDispatch();

	const handleCloseClick = ():void => setShowCreateForm(false);

	const handleSaveClick = ():void => {
		if (typeof id !== 'undefined') {
			if (value.length) {
				const backlog = {id: Date.now(), name: value};
				dispatch(userSlice.actions.addBacklog({id, backlog}));
				setShowCreateForm(false);
			} else alert('Input value is empty');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
		setValue(e.target.value);
	};

	return (
		<div className={classes.form}>
			<input 
				autoFocus
				type='text'
				value={value}
				onChange={handleInputChange}
				className={classes.form__input}
			/>
			<div className={classes.form__actions}>
				<button 
					className={classes.add}
					onClick={handleSaveClick}
				>&#43;</button>
				<button 
					className={classes.close}
					onClick={handleCloseClick}
				>&#10005;</button>
			</div>
	</div>
	);
};


export default BacklogCreateForm;
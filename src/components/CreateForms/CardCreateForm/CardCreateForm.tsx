import React, {FC, useState, useId} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import {createNewCard} from 'utils/utils';
import classes from './card-create.module.css';

interface CardCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>
	groupId: number;
}

const CardCreateForm: FC<CardCreateFormProps> = ({setShowCreateForm, groupId}) => {
	const [value, setValue] = useState<string>('');
	const [text, setText] = useState<string>('');
	const dispatch = useAppDispatch();
	const textAreaId = useId();
	const { id } = useParams<{id?: string}>();


	const handleCloseClick = ():void => setShowCreateForm(false);

	const handleSaveClick = ():void => {
		if (text.length && value.length) {
			const card = createNewCard(value, text);
			dispatch(userSlice.actions.addCard({
				travelId: Number(id),
				groupId,
				card
			}))
		} else alert('Input is empty')
	}

	return (
		<div className={classes.form}>
			<input 
				type="text" 
				className={classes.form__input}
				placeholder='Enter card title...'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<span className={classes.form__separator}></span>
			<div className={classes.form__area}>
				<label htmlFor={textAreaId}>Write your plan:</label>
				<textarea 
					id={textAreaId}
					cols={30} 
					rows={5}
					maxLength={140}
					className={classes.form__textarea}
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>
			<div className={classes.form__actions}>
				<button
					onClick={handleSaveClick}
					className={classes.save}
				>&#x2714;</button>
				<button
					onClick={handleCloseClick}
					className={classes.close}
				>&#10005;</button>
			</div>
		</div>
	)
}

export default CardCreateForm;
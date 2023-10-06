import { FC, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import {createNewGroup} from 'utils/utils';
import classes from './group-create.module.css';

interface GroupCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const GroupCreateForm: FC<GroupCreateFormProps> = memo(({setShowCreateForm}) => {
	const [value, setValue] = useState<string>('');
	const { id } = useParams<{id? : string}>();
	const dispatch = useAppDispatch();

	const handleSaveClick = ():void => {
		if (value.length) {
			const group = createNewGroup(value);
			dispatch(userSlice.actions.addGroup({id: Number(id), group}));
			setShowCreateForm(false);
		} else alert('Empty input value');
	};

	const handleCancelClick = ():void => setShowCreateForm(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
		setValue(e.target.value);
	};

	return (
		<div className={classes.form}>
			<input 
				autoFocus
				className={classes.form__input}
				value={value}
				onChange={handleInputChange}
				type='text' 
				placeholder='Enter group name'
			/>
			<div className={classes.form__actions}>
				<button 
					onClick={handleSaveClick}
					className={classes.save}
				>&#x2714;</button>
				<button 
					onClick={handleCancelClick}
					className={classes.cancel}
				>&#10005;</button>
			</div>
		</div>
	);
});

export default GroupCreateForm;
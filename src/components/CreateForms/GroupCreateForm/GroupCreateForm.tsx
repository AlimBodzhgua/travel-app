import {FC, useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import {createNewGroup} from 'utils/utils';
import classes from './group-create.module.css';

interface GroupCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const GroupCreateForm: FC<GroupCreateFormProps> = ({setShowCreateForm}) => {
	const [value, setValue] = useState<string>('');
	const { id } = useParams<{id? : string}>();
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		inputRef.current?.focus();
	}, [])

	const handleSaveClick = () => {
		if (value.length) {
			const group = createNewGroup(value);
			dispatch(userSlice.actions.addGroup({id: Number(id), group}));
			setShowCreateForm(false);
		} else alert('Empty input value')
	}

	const handleCancelClick = () => {
		setShowCreateForm(false);
	}

	return (
		<div className={classes.form}>
			<input 
				className={classes.form__input}
				ref={inputRef}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type="text" 
				placeholder="group name..."
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
	)
}

export default GroupCreateForm;
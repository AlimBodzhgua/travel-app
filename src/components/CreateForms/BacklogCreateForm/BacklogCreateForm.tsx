import { FC, useState, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { userActions } from 'redux/reducers/userSlice';
import classes from './backlog-create.module.css';

interface BacklogCreateFormProps {
	setShowCreateForm?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BacklogCreateForm: FC<BacklogCreateFormProps> = memo(({setShowCreateForm}) => {
	const [value, setValue] = useState<string>('');
	const { id } = useParams<{id?: string}>();
	const dispatch = useAppDispatch();

	const handleCloseClick = () => setShowCreateForm?.(false);

	const handleSaveClick = () => {
		if (typeof id !== 'undefined') {
			if (value.length) {
				const backlog = {id: Date.now(), name: value};
				dispatch(userActions.addBacklog({id, backlog}));
				setShowCreateForm?.(false);
			} else alert('Input value is empty');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				>
					&#43;
				</button>
				<button 
					className={classes.close}
					onClick={handleCloseClick}
				>
					&#10005;
				</button>
			</div>
	</div>
	);
});
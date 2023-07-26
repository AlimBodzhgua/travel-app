import React, {FC, useState, useRef, useEffect} from 'react';
import classes from './backlog-create.module.css';

interface BacklogCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BacklogCreateForm: FC<BacklogCreateFormProps> = ({setShowCreateForm}) => {
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus();
	}, [])


	const handleSaveClick = () => {
		console.log('save');
	}

	const handleCloseClick = () => {
		setShowCreateForm(false);
	}


	return (
		<div className={classes.form}>
			<input 
				type="text"
				ref={inputRef}
				value={value}
				onChange={e => setValue(e.target.value)}
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
	)
}


export default BacklogCreateForm
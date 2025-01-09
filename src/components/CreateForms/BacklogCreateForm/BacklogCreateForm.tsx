import { FC, useState, memo, useEffect, useRef } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { userActions } from 'redux/slices/userSlice';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useInputHotkeys } from 'hooks/useInputHotkeys';

import classes from './backlog-create.module.css';

interface BacklogCreateFormProps {
	onClose: () => void;
}

export const BacklogCreateForm: FC<BacklogCreateFormProps> = memo(({ onClose }) => {
	const { id } = useParams<{ id?: string }>();
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();
	
	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	
	const onSave = () => {
		if (value.length) {
			const backlog = { id: crypto.randomUUID(), name: value };
			dispatch(userActions.addBacklog({ travelId: id!, backlog }));
			onClose();
		} else alert('Input value is empty');
	};
	
	const inputRef = useInputHotkeys({ onSave, onCancel: onClose });

	return (
		<div className={classes.form}>
			<Input
				autoFocus
				className={classes.input}
				value={value}
				onChange={onChangeValue}
				ref={inputRef}
				type='text'
				size='sm'
				addonAfter={
					<div className={classes.actions}>
						<Button
							className={classes.addBtn}
							onClick={onSave}
							theme='clear'
						>
							&#43;
						</Button>
						<Button
							className={classes.closeBtn}
							onClick={onClose}
							theme='clear'
						>
							&#10005;
						</Button>
					</div>
				}
			/>
	</div>
	);
});
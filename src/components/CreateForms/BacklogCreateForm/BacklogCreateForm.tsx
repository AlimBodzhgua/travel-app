import { FC, useState, memo, useEffect, useRef } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { userActions } from 'redux/slices/userSlice';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';

import classes from './backlog-create.module.css';

interface BacklogCreateFormProps {
	onClose: () => void;
}

export const BacklogCreateForm: FC<BacklogCreateFormProps> = memo(({ onClose }) => {
	const { id } = useParams<{ id?: string }>();
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onHotkeyPress = (e: KeyboardEvent) => {
		const isFocused = inputRef.current === document.activeElement;

		if (e.key === 'Enter' && isFocused) {
			onSave();
		} else if (e.key === 'Escape' && isFocused) {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onHotkeyPress);

		return () => window.removeEventListener('keydown', onHotkeyPress);
	}, [onHotkeyPress]);

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
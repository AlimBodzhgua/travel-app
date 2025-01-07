import { FC, useState, memo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { createNewGroup } from 'utils/utils';
import { Input } from 'components/UI/Input/Input';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';

import classes from './group-create.module.css';

interface GroupCreateFormProps {
	onCancel: () => void;
}

export const GroupCreateForm: FC<GroupCreateFormProps> = memo((props) => {
	const { onCancel } = props;
	const { id } = useParams<{id? : string}>();
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();

	const onHotkeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onSave();
		} else if (e.key === 'Escape') {
			onCancel();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onHotkeyPress);

		return () => window.removeEventListener('keydown', onHotkeyPress);
	}, []);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onSave = () => {
		if (value.length) {
			const group = createNewGroup(value);
			console.log(value);
			dispatch(userActions.addGroup({ id: Number(id), group }));
			onCancel();
		} else alert('Empty input value');
	};

	return (
		<div className={classes.form}>
			<Input
				value={value}
				onChange={onChangeValue}
				className={classes.input}
				autoFocus
				size='md'
				type='text'
				placeholder='Enter group name'
				addonAfter={
					<div className={classes.actions}>
						<Button
							onClick={onSave}
							className={classes.saveBtn}
							theme={ButtonTheme.CLEAR}
						>
							<SuccessIcon className={classes.icon} />
						</Button>
						<Button
							onClick={onCancel}
							className={classes.cancelBtn}
							theme={ButtonTheme.CLEAR}
						>
							&#10005;
						</Button>
					</div>
				}
			/>
		</div>
	);
});
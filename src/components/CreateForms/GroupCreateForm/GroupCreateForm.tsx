import { FC, useState, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { createNewGroup } from 'utils/utils';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useInputHotkeys } from 'hooks/useInputHotkeys';
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
	
	const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, [value]);
	
	const onSave = useCallback(() => {
		if (value.length) {
			const group = createNewGroup(value);
			dispatch(userActions.addGroup({ travelId: id!, group }));
			onCancel();
		} else alert('Empty input value');
	}, [onCancel, dispatch, value]);
	
	const inputRef = useInputHotkeys({ onSave, onCancel: onCancel });

	return (
		<div className={classes.form}>
			<Input
				value={value}
				onChange={onChangeValue}
				className={classes.input}
				ref={inputRef}
				autoFocus
				size='md'
				type='text'
				placeholder='Enter group name'
				addonAfter={
					<div className={classes.actions}>
						<Button
							onClick={onSave}
							className={classes.saveBtn}
							theme='clear'
						>
							<SuccessIcon className={classes.icon} />
						</Button>
						<Button
							onClick={onCancel}
							className={classes.cancelBtn}
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
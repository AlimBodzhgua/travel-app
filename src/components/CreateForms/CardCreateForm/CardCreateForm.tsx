import { FC, useState, useId, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { createNewCard } from 'utils/utils';
import { Divider } from 'components/UI/Divider/Divider';
import { Button } from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input/Input';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';

import classes from './card-create.module.css';

interface CardCreateFormProps {
	groupId: string;
	onClose: () => void
}

export const CardCreateForm: FC<CardCreateFormProps> = memo((props) => {
	const { onClose, groupId } = props;
	const { id } = useParams<{id?: string}>();
	const [title, setTitle] = useState<string>('');
	const [text, setText] = useState<string>('');
	const dispatch = useAppDispatch();
	const textAreaId = useId();

	const onSave = () => {
		if (text.length && title.length) {
			const card = createNewCard(title, text);
			dispatch(userActions.addCard({
				travelId: id!,
				groupId,
				card
			}));
			onClose();
		} else alert('Input is empty');
	};

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	return (
		<div className={classes.form}>
			<Input
				autoFocus
				value={title}
				className={classes.input}
				onChange={onChangeTitle}
				placeholder='Enter card title'
			/>
			<Divider orientation='vertical'size='120px'/>
			<div className={classes.textBlock}>
				<div className={classes.textHeader}>
					<label htmlFor={textAreaId}>Write your plan:</label>
					<div className={classes.actions}>
						<Button onClick={onSave} theme='clear' className={classes.saveBtn}>
							<SuccessIcon />
						</Button>
						<Button onClick={onClose} theme='clear' className={classes.closeBtn}>
							<CloseIcon />
						</Button>
					</div>
				</div>
				<textarea
					value={text}
					onChange={onChangeText}
					id={textAreaId}
					cols={30}
					rows={5}
					maxLength={250}
					className={classes.textArea}
				/>
			</div>
		</div>
	);
});
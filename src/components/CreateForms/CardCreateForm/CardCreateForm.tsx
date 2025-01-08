import { FC, useState, useId, memo } from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { createNewCard } from 'utils/utils';
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

	const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};

	const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	return (
		<div className={classes.form}>
			<textarea
				autoFocus
				value={title}
				className={classes.form__input}
				onChange={onChangeTitle}
				placeholder='Enter card title'
				rows={2}
				maxLength={32}
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
					onChange={onChangeText}
				/>
			</div>
			<div className={classes.form__actions}>
				<button onClick={onSave} className={classes.save}>
					&#x2714;
				</button>
				<button onClick={onClose} className={classes.close}>
					&#10005;
				</button>
			</div>
		</div>
	);
});
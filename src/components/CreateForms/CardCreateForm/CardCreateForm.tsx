import {
	FC,
	Dispatch,
	useState,
	useId,
	SetStateAction,
	memo,
} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { createNewCard } from 'utils/utils';
import classes from './card-create.module.css';

interface CardCreateFormProps {
	groupId: number;
	setShowCreateForm?: Dispatch<SetStateAction<boolean>>
}

export const CardCreateForm: FC<CardCreateFormProps> = memo(({setShowCreateForm, groupId}) => {
	const [title, setTitle] = useState<string>('');
	const [text, setText] = useState<string>('');
	const dispatch = useAppDispatch();
	const textAreaId = useId();
	const { id } = useParams<{id?: string}>();

	const handleCloseClick = () => setShowCreateForm?.(false);

	const handleSaveClick = () => {
		if (text.length && title.length) {
			const card = createNewCard(title, text);
			dispatch(userActions.addCard({
				travelId: Number(id),
				groupId,
				card
			}));
			setShowCreateForm?.(false);
		} else alert('Input is empty');
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	return (
		<div className={classes.form}>
			<textarea
				autoFocus
				value={title}
				className={classes.form__input}
				onChange={handleTitleChange}
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
					onChange={handleTextChange}
				/>
			</div>
			<div className={classes.form__actions}>
				<button
					onClick={handleSaveClick}
					className={classes.save}
				>&#x2714;</button>
				<button
					onClick={handleCloseClick}
					className={classes.close}
				>&#10005;</button>
			</div>
		</div>
	);
});
import { FC, useState, memo } from 'react';
import { stringToDayjsObject } from 'utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { userActions } from 'redux/slices/userSlice';
import { useAppDispatch } from 'hooks/redux';
import { SortableItem } from 'lib/components';
import { getTravelPage } from 'router/routes';
import { DateRangePicker } from 'components/UI/DateRangePicker/DateRangePicker';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useInputHotkeys } from 'hooks/useInputHotkeys';

import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit_white.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import type { ITravel } from 'types/types';
import type { Dayjs } from 'dayjs';

import classes from './TravelItem.module.css';

interface TravelItemProps {
	travel: ITravel;
}

export const TravelItem: FC<TravelItemProps> = memo((props) => {
	const { travel } = props;
	const [startDate, setStartDate] = useState<Dayjs>(stringToDayjsObject(travel.dateStart));
	const [endDate, setEndDate] = useState<Dayjs>(stringToDayjsObject(travel.dateEnd));
	const [editable, setEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>(travel.name);
	const location = useLocation();
	const dispatch = useAppDispatch();
	
	const onStartDateChange = (date: Dayjs) => {
		setStartDate(date);
	};
	
	const onEndDateChange = (date: Dayjs) => {
		setEndDate(date);
	};

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	
	const onSave = () => {
		if (startDate && endDate) {
			dispatch(userActions.editTravel({
				id: travel.id,
				name: value,
				dateStart: startDate.format('YYYY.MM.DD'),
				dateEnd: endDate.format('YYYY.MM.DD'),
			}));
		}
		setEditable(false);
	};

	const onToggleEdit = () => {
		setEditable(prev => !prev);
	};

	const inputRef = useInputHotkeys({ onSave, onCancel: onToggleEdit })

	const onDelete = () => {
		dispatch(userActions.deleteTravel(travel.id));
	};

	return (
		<SortableItem id={travel.id}>
			<li className={
				location.pathname === `/travels/${travel.id}` 
					? classes.TravelItemDetails
					: classes.TravelItem
				}
			>
				{editable ? (
					<Input 
						value={value}
						onChange={onChangeValue}
						className={classes.input}
						ref={inputRef}
						autoFocus
						type='text'
						placeholder='Enter travel title'
						addonAfter={
							<Button
								theme='clear'
								onClick={onSave}
								className={classes.saveBtn}
							>
								<SuccessIcon />
							</Button>
						}
					/>
				) : (
					<div className={classes.title}>
						<NavLink
							to={getTravelPage(travel.id)}
							className={
								location.pathname === `/travels/${travel.id}`
									? classes.linkDetails
									: classes.link
							}
						>
							{travel.name}
						</NavLink>
					</div>
				)}
				<DateRangePicker 
					startDate={startDate}
					onStartDateChange={onStartDateChange}
					endDate={endDate}
					onEndDateChange={onEndDateChange}
					labelStart='travel start date'
					labelEnd='travel end date'
					disabled={editable ? false : true}
				/>
				<div className={classes.actions}>
					<Button onClick={onToggleEdit} className={classes.editBtn}>
						<EditIcon className={classes.editIcon}/>
					</Button>
					<Button onClick={onDelete} className={classes.deleteBtn}>
						<DeleteIcon className={classes.deleteIcon}/>
					</Button>
				</div>
			</li>
		</SortableItem>
	);
});
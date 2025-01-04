import { FC, useState, memo } from 'react';
import { stringToDayjsObject } from 'utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { userActions } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'hooks/redux';
import { Dayjs } from 'dayjs';
import { SortableItem } from 'lib/components';
import { getTravelPage } from 'router/routes';
import { ITravel } from 'types/types';
import DateRangePicker from 'components/UI/DateRangePicker/DateRangePicker';
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

	const onDelete = () => {
		dispatch(userActions.deleteTravel(travel.id));
	};

	return (
		<SortableItem id={travel.id}>
			<li className={
				location.pathname === `/travels/${travel.id}` 
					? classes.list__item_details
					: classes.list__item
				}
			>
				{editable 
					?	<input 
							type='text' 
							autoFocus
							className={classes.item__input}
							placeholder={travel.name} 
							value={value}
							onChange={(e) => setValue(e.target.value)}
					  	/>
					: 	<div className={classes.item__title}>
							<NavLink 
								to={getTravelPage(travel.id)}
								className={location.pathname === `/travels/${travel.id}` 
									? classes.item__link_details
									: classes.item__link
								}
							>
								{travel.name}
							</NavLink>
					  	</div>
				}
				<DateRangePicker 
					startDate={startDate}
					onStartDateChange={onStartDateChange}
					endDate={endDate}
					onEndDateChange={onEndDateChange}
					labelStart='travel start date'
					labelEnd='travel end date'
					disabled={editable ? false : true}
				/>
				<div className={classes.item__actions}>
					{editable &&
						<button 
					  		onClick={onSave}
							className={classes.save}
						>
							&#x2714;
						</button>
					}
					<button 
						className={classes.edit} 
						onClick={onToggleEdit}
					>
						edit
					</button>
					<button 
						className={classes.delete} 
						onClick={onDelete}
					>
						delete
					</button>
				</div>
			</li>
		</SortableItem>
	);
});
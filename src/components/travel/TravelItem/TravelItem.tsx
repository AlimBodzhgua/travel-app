import { FC, useState, useEffect, memo } from 'react';
import { stringToDayjsObject } from 'utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { userSlice } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'hooks/redux';
import { Dayjs } from 'dayjs';
import { SortableItem } from 'components/SortableItem/SortableItem';
import DateRangePicker from 'components/UI/DateRangePicker/DateRangePicker';
import classes from './TravelItem.module.css';


interface TravelItemProps {
	id: number;
	name: string;
	dateStart: string;
	dateEnd: string;
}

export const TravelItem: FC<TravelItemProps> = memo((props) => {
	const { id, name, dateStart, dateEnd } = props;
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);
	const [editable, setEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		setStartDate(stringToDayjsObject(dateStart));
		setEndDate(stringToDayjsObject(dateEnd));
		setValue(name);
	}, []);

	const handleEditClick = ():void => setEditable(!editable);

	const handleDeleteClick = ():void => {
		dispatch(userSlice.actions.deleteTravel(id));
	};

	const handleSaveClick = ():void => {
		if (startDate && endDate) {
			dispatch(userSlice.actions.editTravel({
				id: id,
				name: value,
				dateStart: startDate.format('YYYY.MM.DD'),
				dateEnd: endDate.format('YYYY.MM.DD'),
			}));
		}
		setEditable(false);
	};

	return (
		<SortableItem id={id}>
			<li className={
				location.pathname === `/travels/${id}` 
					? classes.list__item_details
					: classes.list__item
				}
			>
				{editable 
					?	<input 
							type='text' 
							autoFocus
							className={classes.item__input}
							placeholder={name} 
							value={value}
							onChange={(e) => setValue(e.target.value)}
					  	/>
					: 	<div className={classes.item__title}>
							<NavLink 
								to={`http://localhost:3000/travels/${id}`}
								className={location.pathname === `/travels/${id}` 
									? classes.item__link_details
									: classes.item__link
								}
							>
								{name}
							</NavLink>
					  	</div>
				}
				<DateRangePicker 
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					labelStart='travel start date'
					labelEnd='travel end date'
					disabled={editable ? false : true}
				/>
				<div className={classes.item__actions}>
					{editable &&
						<button 
					  		onClick={handleSaveClick}
							className={classes.save}
						>
							&#x2714;
						</button>
					}
					<button 
						className={classes.edit} 
						onClick={handleEditClick}
					>
						edit
					</button>
					<button 
						className={classes.delete} 
						onClick={handleDeleteClick}
					>
						delete
					</button>
				</div>
			</li>
		</SortableItem>
	);
});
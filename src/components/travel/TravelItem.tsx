import {FC, useState, useEffect} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { stringToDayjsObject } from 'utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { userSlice } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'hooks/redux';
import {Dayjs} from 'dayjs';
import classes from './travel.module.css';

interface TravelItemProps {
	id: number;
	name: string;
	dateStart: string;
	dateEnd: string;
}

const TravelItem: FC<TravelItemProps> = ({id, name, dateStart, dateEnd}) => {
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);
	const [editable, setEditable] = useState<boolean>(false);
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		setStartDate(stringToDayjsObject(dateStart));
		setEndDate(stringToDayjsObject(dateEnd));
	}, [])

	const handleStartChange = (e: (Dayjs | null)) => {
		setStartDate(e);
	}

	const handleEndChange = (e: (Dayjs | null)) => {
		setEndDate(e);
	}

	const handleDeleteClick = () => {
		dispatch(userSlice.actions.deleteTravel(id));
	}

	const handleEditClick = () => {
		setEditable(!editable);
	}

	return (
		<li className={
			location.pathname === `/travels/${id}` 
				? classes.list__item_details
				: classes.list__item
		}>
			{editable 
				? <input 
					type="text" 
					className={classes.item__input}
					placeholder={name} 
				  />
				: <div className={classes.item__title}>
					<NavLink 
						to={`http://localhost:3000/travels/${id}`}
						className={location.pathname === `/travels/${id}` 
								? classes.item__link_details
								: classes.item__link
						}
					>{name}</NavLink>
				  </div>
			}
			<div className={classes.item__date}>
				<DatePicker
					label='travel start date'
					value={startDate}
					onChange={handleStartChange}
					disablePast={true}
					slotProps={{ 
						textField: { size: 'small'},
						inputAdornment: {position: 'end'}
					}}
					disabled={editable ? false : true}
				/>
				<span className={classes.date__separator}>-</span>
				<DatePicker
					label='travel end date'
					value={endDate}
					onChange={handleEndChange}
					disablePast={true}
					slotProps={{ 
						textField: { size: 'small' },
						inputAdornment: {position: 'end'}
					}}
					disabled={editable ? false : true}
				/>
			</div>
			<div className={classes.item__actions}>
				<button className={classes.button} onClick={handleEditClick}>edit</button>
				<button className={classes.button} onClick={handleDeleteClick}>delete</button>
			</div>
		</li>
	)
}


export default TravelItem;
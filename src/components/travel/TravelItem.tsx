import {FC, useState, useEffect} from 'react';
import { stringToDayjsObject } from 'utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { userSlice } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'hooks/redux';
import {Dayjs} from 'dayjs';
import classes from './travel.module.css';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';

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
				? <div className={classes.input__handler}>
					<input 
						type="text" 
						autoFocus
						className={classes.item__input}
						placeholder={name} 
				  	/>
				  	<button 
						className={classes.save}
					>&#x2714;</button>
				  </div>
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
				<button 
					className={classes.edit} 
					onClick={handleEditClick}
				>edit</button>
				<button 
					className={classes.delete} 
					onClick={handleDeleteClick}
				>delete
				</button>
			</div>
		</li>
	)
}


export default TravelItem;
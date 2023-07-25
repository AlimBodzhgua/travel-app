import {FC, useState, useEffect} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { stringToDayjsObject } from 'utils/utils';
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

	return (
		<li className={classes.list__item}>
			{editable 
				? <input 
					type="text" 
					className={classes.item__input} 
					placeholder={name} 
				  />
				: <div className={classes.item__title}>{name}</div>
			}
			<div className={classes.item__date}>
				<DatePicker
					label='select travel start date'
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
					label='select travel end date'
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
				<button className={classes.button} onClick={() => setEditable(!editable)}>edit</button>
				<button className={classes.button}>delete</button>
			</div>
		</li>
	)
}


export default TravelItem;
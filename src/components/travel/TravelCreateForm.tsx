import React, {FC, useState, useRef, useEffect} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs';

import classes from './travel.module.css';

interface TravelCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TravelCreateForm: FC<TravelCreateFormProps> = ({setShowCreateForm}) => {
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleStartChange = (e: Dayjs | null) => {
		setStartDate(e);
	}

	const handleEndChange = (e: Dayjs | null) => {
		setEndDate(e);
	}


	const handleClick = () => { 	
		console.log(startDate, endDate, value)
	}

	return (
		<li className={classes.list__item}>
			<input 
				type="text" 
				ref={inputRef}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={classes.item__input}
			/>
			<div className={classes.item__date}>
				<DatePicker
					label='select travel start date'
					onChange={handleStartChange}
					views={['day', 'month', 'year']}
					value={startDate}
					disablePast={false}
					slotProps={{ 
						textField: { size: 'small'},
					}}
				/>
				<span className={classes.date__separator}>-</span>
				<DatePicker
					label='select travel end date'
					onChange={handleEndChange}
					views={['day', 'month', 'year']}
					disablePast={false}
					slotProps={{ 
						textField: { size: 'small' },
					}}
				/>
			</div>
			<div className={classes.item__actions}>
				<button className={classes.button}>save</button>
			</div>
		</li>
	)
}


export default TravelCreateForm;
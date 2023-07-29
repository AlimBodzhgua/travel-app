import React, {FC} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs';
import classes from './date-range.module.css';

interface DateRangePickerProps {
	startDate: Dayjs | null;
	setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
	endDate: Dayjs | null;
	setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
	labelStart?: string;
	labelEnd?: string;
	disabled?: boolean;
}


const DateRangePicker:FC<DateRangePickerProps> = ({
	startDate, 
	setStartDate,
	endDate,
	setEndDate,
	labelStart,
	labelEnd,
	disabled = false
}) => {

	const handleStartChange = (e: (Dayjs | null)) => {
		setStartDate(e);
	}

	const handleEndChange = (e: (Dayjs | null)) => {
		setEndDate(e);
	}

	return (
		<div className={classes.date}>
			<DatePicker
				label={labelStart}
				value={startDate}
				onChange={handleStartChange}
				disablePast={true}
				slotProps={{ 
					textField: { size: 'small'},
					inputAdornment: {position: 'end'}
				}}
				disabled={disabled}
			/>
			<span className={classes.date__separator}>-</span>
			<DatePicker
				label={labelEnd}
				value={endDate}
				onChange={handleEndChange}
				disablePast={true}
				slotProps={{ 
					textField: { size: 'small' },
					inputAdornment: {position: 'end'}
				}}
				disabled={disabled}
			/>
		</div>
	)
}


export default DateRangePicker;
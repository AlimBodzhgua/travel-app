import { FC, memo } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs'

import classes from './date-range.module.css';

interface DateRangePickerProps {
	startDate?: Dayjs | null;
	onStartDateChange: (date: Dayjs) => void;
	endDate?: Dayjs | null;
	onEndDateChange: (date: Dayjs) => void;
	labelStart?: string;
	labelEnd?: string;
	disabled?: boolean;
}

export const DateRangePicker:FC<DateRangePickerProps> = memo(({
	startDate = dayjs(), 
	onStartDateChange,
	endDate = dayjs(),
	onEndDateChange,
	labelStart,
	labelEnd,
	disabled = false
}) => {

	const handleStartChange = (e: (Dayjs | null)) => {
		if (e) {
			onStartDateChange(e);
		}
	};

	const handleEndChange = (e: (Dayjs | null)) => {
		if (e) {
			onEndDateChange(e);
		}
	};

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
	);
});

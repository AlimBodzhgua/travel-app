import { FC, useState, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { createNewTravel } from 'utils/utils';
import { Button } from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input/Input';
import { DateRangePicker } from 'components/UI/DateRangePicker/DateRangePicker';
import { useInputHotkeys } from 'hooks/useInputHotkeys';
import dayjs from 'dayjs';

import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import type { Dayjs } from 'dayjs';

import classes from './travel-create.module.css';

interface TravelCreateFormProps {
	onCloseForm: () => void;
}

export const TravelCreateForm: FC<TravelCreateFormProps> = memo((props) => {
	const { onCloseForm } = props;
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
	const [value, setValue] = useState<string>('');
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
		if (startDate !== null && endDate !== null) {
			if (value.length) {
				const travel = createNewTravel(value, startDate, endDate);
				dispatch(userActions.addTravel(travel));
			} else alert('Input value can not be empty');
		}
		onCloseForm();
	};

	const inputRef = useInputHotkeys({ onSave, onCancel: onCloseForm });

	return (
		<div className={classes.form}>
			<Input
				className={classes.input}
				autoFocus
				type='text'
				value={value}
				onChange={onChangeValue}
				ref={inputRef}
			/>
			<DateRangePicker 
				startDate={startDate}
				onStartDateChange={onStartDateChange}
				endDate={endDate}
				onEndDateChange={onEndDateChange}
				labelStart='select start date'
				labelEnd='select end date'
			/>
			<div className={classes.actions}>
				<Button 
					className={classes.addBtn} 
					onClick={onSave}
				>
					<SuccessIcon className={classes.icon} />
				</Button>
				<Button 
					className={classes.cancelBtn} 
					onClick={onCloseForm}
				>
					<CloseIcon className={classes.icon}/>
				</Button>
			</div>
		</div>
	);
});
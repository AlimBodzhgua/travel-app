import { FC, useState, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { createNewTravel } from 'utils/utils';
import DateRangePicker from 'components/UI/DateRangePicker/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';

import classes from './travel-create.module.css';

interface TravelCreateFormProps {
	//setShowCreateForm?: React.Dispatch<React.SetStateAction<boolean>>;
	onCloseForm: () => void;
}

export const TravelCreateForm: FC<TravelCreateFormProps> = memo((props) => {
	const { onCloseForm } = props;
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();

	//const handleCancelClick = () => setShowCreateForm?.(false);

	const onStartDateChange = (date: Dayjs) => {
		setStartDate(date);
	};

	const onEndDateChange = (date: Dayjs) => {
		setEndDate(date);
	};

	const handleSaveClick = () => { 	
		if (startDate !== null && endDate !== null) {
			if (value.length) {
				const id: number = Date.now();
				const travel = createNewTravel(id, value, startDate, endDate);
				dispatch(userActions.addTravel(travel));
			} else alert('Input value can not be empty');
		}
		//setShowCreateForm?.(false);
		onCloseForm();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className={classes.form}>
			<input 
				autoFocus
				type='text' 
				value={value}
				onChange={handleInputChange}
				className={classes.form__input}
			/>
			<DateRangePicker 
				startDate={startDate}
				onStartDateChange={onStartDateChange}
				endDate={endDate}
				onEndDateChange={onEndDateChange}
				labelStart='select start date'
				labelEnd='select end date'
			/>
			<div className={classes.form__actions}>
				<button 
					className={classes.add} 
					onClick={handleSaveClick}
				>
					+
				</button>
				<button 
					className={classes.cancel} 
					onClick={onCloseForm}
				>
					&#10005;
				</button>
			</div>
		</div>
	);
});
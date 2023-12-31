import { FC, useState, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { createNewTravel } from 'utils/utils';
import DateRangePicker from 'components/UI/DateRangePicker/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';

import classes from './travel-create.module.css';

interface TravelCreateFormProps {
	setShowCreateForm?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TravelCreateForm: FC<TravelCreateFormProps> = memo(({setShowCreateForm}) => {
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();

	const handleCancelClick = ():void => setShowCreateForm?.(false);

	const handleSaveClick = () => { 	
		if (startDate !== null && endDate !== null) {
			if (value.length) {
				const id: number = Date.now();
				const travel = createNewTravel(id, value, startDate, endDate);
				dispatch(userActions.addTravel(travel));
			} else alert('Input value can not be empty');
		}
		setShowCreateForm?.(false);
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
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
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
					onClick={handleCancelClick}
				>
					&#10005;
				</button>
			</div>
		</div>
	);
});


export default TravelCreateForm;
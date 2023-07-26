import {FC, useState, useRef, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { userSlice } from 'redux/reducers/userSlice';
import { createNewTravel } from 'utils/utils';
import dayjs, { Dayjs } from 'dayjs';

import classes from './travel-create.module.css';

interface TravelCreateFormProps {
	setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TravelCreateForm: FC<TravelCreateFormProps> = ({setShowCreateForm}) => {
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
	const [value, setValue] = useState<string>('');

	const travels = useAppSelector(state => state.userReducer?.user?.travels);
	const dispatch = useAppDispatch();
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

	const handleSaveClick = () => { 	
		if (startDate !== null && endDate !== null) {
			const id: number = Date.now();
			const travel = createNewTravel(id, value, startDate, endDate);
			dispatch(userSlice.actions.addTravel(travel));
		}
		setShowCreateForm(false);
	}

	const handleCancelClick = () => {
		setShowCreateForm(false);
	}

	return (
		<form className={classes.form}>
			<input 
				type="text" 
				ref={inputRef}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={classes.form__input}
			/>
			<div className={classes.form__date}>
				<DatePicker
					label='select travel start date'
					onChange={handleStartChange}
					value={startDate}
					disablePast={true}
					slotProps={{ 
						textField: { size: 'small'},
					}}
				/>
				<span className={classes.date__separator}>-</span>
				<DatePicker
					label='select travel end date'
					onChange={handleEndChange}
					value={endDate}
					disablePast={true}
					slotProps={{ 
						textField: { size: 'small' },
					}}
				/>
			</div>
			<div className={classes.form__actions}>
				<button className={classes.button} onClick={handleSaveClick}>save</button>
				<button className={classes.button} onClick={handleCancelClick}>cancel</button>
			</div>
		</form>
	)
}


export default TravelCreateForm;
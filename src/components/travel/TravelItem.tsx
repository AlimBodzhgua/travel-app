import {FC, useState} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import classes from './travel.module.css';


const TravelItem: FC = () => {
	const [dateStart, setDateStart] = useState(new Date());
	const [dateEnd, setDateEnd] = useState(new Date());
	const [editable, setEditable] = useState<boolean>(false);

	return (
		<li className={classes.list__item}>
			{editable 
				? <input 
					type="text" 
					className={classes.item__input} 
					placeholder='Путешествие в Москву, Россия' 
				  />
				: <div className={classes.item__title}>Путешествие в Москву, Россия</div>
			}
			<div className={classes.item__date}>
				<DatePicker
					label='select travel start date'
					views={['day', 'month', 'year']}
					onChange={(date) => console.log(date)}
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
					views={['day', 'month', 'year']}
					onChange={(date) => console.log(date)}
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
import {FC} from 'react';
import classes from './auth.module.css';


const LoginForm: FC = () => {
	return (
		<form className={classes.form} action="">
			<input 
				type="email" 
				placeholder='Email'
				className={classes.input}
			/>
			<input 
				type="password" 
				placeholder='Password'
				className={classes.input}
			/>
			<button className={classes.btn}>login</button>
		</form>
	)
}

export default LoginForm;
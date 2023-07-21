import {FC} from 'react';
import {useAppDispatch} from 'hooks/redux';
import {loginUser} from 'redux/actions/userActions';
import {useForm, SubmitHandler} from 'react-hook-form'
import {IUserLogin} from 'types/types';
import classes from './auth.module.css';


interface IFormInput {
	email: string;
	password: string;
}

const LoginForm: FC = () => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit} = useForm<IFormInput>()

	const onSubmit:SubmitHandler<IUserLogin> = (e) => {
		dispatch(loginUser(e));
	}


	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<input 
				type="email" 
				placeholder='Email'
				className={classes.input}
				{...register('email', {
					required: {
						value: true,
						message: 'Email is a required field'
					}
				})}
			/>
			<input 
				type="password" 
				placeholder='Password'
				className={classes.input}
				{...register('password', {
					required: {
						value: true,
						message: 'Password is a required field'
					}
				})}
			/>
			<button type="submit" className={classes.btn}>login</button>
		</form>
	)
}

export default LoginForm;
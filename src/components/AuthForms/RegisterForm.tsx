import {FC} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { registerUser } from 'redux/actions/userActions';
import { IUser } from 'types/types'; 
import classes from './auth.module.css';

interface IFormInput {
	login: string;
	email: string;
	password: string;
}


const RegisterForm: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit, 
		formState: { errors }
	} = useForm<IFormInput>();


	const onSubmit:SubmitHandler<IFormInput> = (e) => {
		const user = {...e, travels: []} as IUser;
		dispatch(registerUser(user));
		navigate('/travels');
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<input 
				type='text'
				placeholder='Login'
				className={classes.input}
				{...register('login', {
					required: {
						value: true,
						message: 'Login is a required field',
					},
					minLength: {
						value: 6,
						message: 'Login at least 6 characters long',
					}
				})}
			/>
			{errors.login && 
				<div className={classes.error}>{errors.login.message}</div>
			}
			<input 
				type='email'
				placeholder='Email'
				className={classes.input}
				{...register('email', {
					required: {
						value: true,
						message: 'Email is a required field',
					}
				})}
			/>
			{errors.email && 
				<div className={classes.error}>{errors.email.message}</div>
			}
			<input 
				type='password'
				placeholder='Password'
				className={classes.input}
				{...register('password', {
					required: {
						value: true,
						message: 'Password is required field',
					},
					minLength: {
						value: 6,
						message: 'Password at least 6 characters long'
					}
				})}
			/>
			{errors.password && 
				<div className={classes.error}>{errors.password.message}</div>
			}
			<button type='submit' className={classes.btn}>register</button>
		</form>
	);
};

export default RegisterForm;
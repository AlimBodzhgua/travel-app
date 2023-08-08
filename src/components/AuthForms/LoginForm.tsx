import {FC} from 'react';
import {useAppDispatch} from 'hooks/redux';
import {useNavigate} from 'react-router-dom';
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
	const {
		register, 
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>()
	const navigate = useNavigate();

	const onSubmit:SubmitHandler<IUserLogin> = (e) => {
		dispatch(loginUser(e));
		navigate('/travels');
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
			{errors.email && 
				<div className={classes.error}>{errors.email.message}</div>
			}
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
			{errors.password && 
				<div className={classes.error}>{errors.password.message}</div>
			}
			<button type="submit" className={classes.btn}>login</button>
		</form>
	)
}

export default LoginForm;
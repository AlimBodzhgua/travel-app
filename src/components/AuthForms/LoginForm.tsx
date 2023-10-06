import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'redux/actions/userActions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { IUserLogin } from 'types/types';
import { Button, ButtonSize, ButtonTheme } from 'components/UI/Button/Button';
import classes from './auth.module.css';


interface IFormInput {
	email: string;
	password: string;
}

const LoginForm: FC = memo(() => {
	const { isLoading } = useAppSelector(state => state.userReducer);
	const dispatch = useAppDispatch();
	const {
		register, 
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>();
	const navigate = useNavigate();

	const onSubmit:SubmitHandler<IUserLogin> = (e) => {
		dispatch(loginUser(e)).then(({meta}) => {
			if (meta.requestStatus === 'fulfilled') {
				navigate('/travels');
			} else if (meta.requestStatus === 'rejected') {
				alert('Wrong password or email');
			}
		});
	};


	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<input 
				type='email' 
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
				type='password' 
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
			<Button
				type='submit'
				className={classes.btn}
				theme={ButtonTheme.BLUE}
				size={ButtonSize.SMALL}
			>
				{isLoading 
					? 	<>
							Loading
							<ThreeDots 
								height='22' 
								width='34' 
								radius='9'
								color='#f2f2f2' 
								ariaLabel='three-dots-loading'
								visible={true}
							/>
						</> 
					: 	<>login</>
				}
			</Button>
		</form>
	);
});

export default LoginForm;
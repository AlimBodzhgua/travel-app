import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'redux/actions/userActions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { IUserLogin } from 'types/types';
import { Button } from 'components/UI/Button/Button';
import { userActions } from 'redux/reducers/userSlice';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'components/UI/AppLink/AppLink';
import { RouteNames } from 'router/routes';
import classes from '../auth.module.css';

interface IFormInput {
	email: string;
	password: string;
}

export const LoginForm: FC = memo(() => {
	const { t } = useTranslation();
	const { isLoading } = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
	const {
		register, 
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>();
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			dispatch(userActions.clearError());
		};
	}, [dispatch]);


	const onSubmit: SubmitHandler<IUserLogin> = async (e) => {
		const { meta } = await dispatch(loginUser(e));
		
		if (meta.requestStatus === 'fulfilled') {
			navigate('/travels');
		} else if (meta.requestStatus === 'rejected') {
			alert(t('Wrong password or email'));
		}
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<input 
				type='email' 
				placeholder={t('Email')}
				className={classes.input}
				{...register('email', {
					required: {
						value: true,
						message: t('Email is required field')
					}
				})}
			/>
			{errors.email && 
				<div className={classes.error}>{errors.email.message}</div>
			}
			<input 
				type='password' 
				placeholder={t('Password')}
				className={classes.input}
				{...register('password', {
					required: {
						value: true,
						message: t('Password is required field')
					}
				})}
			/>
			{errors.password && 
				<div className={classes.error}>{errors.password.message}</div>
			}
			<div className={classes.redirectInfo}>
				<div className={classes.redirectText}>{t('Don\'t have an account?')}</div>
				<AppLink
					to={RouteNames.REGISTER}
					className={classes.redirectLink}
				>
					{t('Register')}
				</AppLink>
			</div>
			<Button
				type='submit'
				className={classes.btn}
				theme='blue'
				size='sm'
			>
				{isLoading 
					? 	<>
							{t('Loading')}
							<ThreeDots 
								height='22' 
								width='34' 
								radius='9'
								color='#f2f2f2' 
								ariaLabel='three-dots-loading'
								visible={true}
							/>
						</> 
					: 	t('sign in')
				}
			</Button>
		</form>
	);
});

import { FC, forwardRef, InputHTMLAttributes, memo, ReactNode, useState } from 'react';
import classnames from 'classnames';
import classes from './Input.module.css';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	size?: InputSize;
	addonBefore?: ReactNode;
	addonAfter?: ReactNode;
	className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		size = 'md',
		addonBefore,
		addonAfter,
		className,
		...inputProps
	} = props;
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const onToggleFocus = () => {
		setIsFocused((prev) => !prev);
	}

	return (
		<div className={
			classnames(
				classes.Input,
				classes[size],
				className,
				{[classes.focused]: isFocused},
			)
		}>
			{addonBefore && (
				<div className={classes.addon}>
					{addonBefore}
				</div>
			)}
			<input
				type='text'
				className={classes.InputField}
				onFocus={onToggleFocus}
				onBlur={onToggleFocus}
				ref={ref}
				{...inputProps}
			/>
			{addonAfter && (
				<div className={classes.addon}>
					{addonAfter}
				</div>
			)}
		</div>
	);
});
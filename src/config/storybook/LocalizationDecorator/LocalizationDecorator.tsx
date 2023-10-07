import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Decorator } from '@storybook/react';

export const LocalizationDecorator: Decorator = (Story) => {
	return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
			<Story />
		</LocalizationProvider>
	)
}
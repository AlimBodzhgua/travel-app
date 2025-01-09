import { BrowserRouter } from 'react-router-dom';
import { Decorator } from '@storybook/react';

export const BrowserDecorator: Decorator = (Story) => {
	return (
		<BrowserRouter>
			<Story />
		</BrowserRouter>
	);
};

import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { store } from 'redux/store';

export const StoreDecorator: Decorator = (Story) => {
	return (
		<Provider store={store}>
			<Story />
		</Provider>
	)
}
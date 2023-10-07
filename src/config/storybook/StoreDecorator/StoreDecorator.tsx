import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { createReduxStore } from 'redux/config/store';

const store = createReduxStore();

export const StoreDecorator: Decorator = (Story) => {
	return (
		<Provider store={store}>
			<Story />
		</Provider>
	)
}
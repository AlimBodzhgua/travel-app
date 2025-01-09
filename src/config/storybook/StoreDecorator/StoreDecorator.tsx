import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from 'redux/config/store';
import { StateSchema } from 'redux/config/StateSchema';

export const StoreDecorator = (state: DeepPartial<StateSchema>): Decorator => {
	const store = createReduxStore(state as StateSchema);

	return (Story) => {
		return (
			<Provider store={store}>
				<Story />
			</Provider>
		);
	};
};

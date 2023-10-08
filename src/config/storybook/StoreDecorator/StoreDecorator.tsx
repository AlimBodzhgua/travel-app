import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { createReduxStore } from 'redux/config/store';
import { StateSchema } from 'redux/config/StateSchema';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (state: DeepPartial<StateSchema>): Decorator => {
	const store = createReduxStore(state as StateSchema);

	return (Story) => {
		return (
			<Provider store={store}>
				<Story />
			</Provider>
		)
	}
}
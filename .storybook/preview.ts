import type { Preview } from '@storybook/react';
import { StyleDecorator } from '../src/config/storybook/StyleDecorator/StyleDecorator';
import { BrowserDecorator } from '../src/config/storybook/BrowserDecorator/BrowserDecorator';
import { LocalizationDecorator } from '../src/config/storybook/LocalizationDecorator/LocalizationDecorator';
import { StoreDecorator } from '../src/config/storybook/StoreDecorator/StoreDecorator';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		StyleDecorator,
		BrowserDecorator,
		LocalizationDecorator,
		StoreDecorator({ user: { authData: undefined } }),
	],
};

export default preview;

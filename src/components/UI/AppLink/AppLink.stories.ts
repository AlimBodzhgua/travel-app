import type { Meta, StoryObj } from '@storybook/react';

import { AppLink, AppLinkTheme, AppLinkSize } from './AppLink';

const meta = {
	title: 'UI/AppLink',
	component: AppLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {
		to: '/',
	},
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
	args: {
		children: 'home',
		theme: AppLinkTheme.CLEAR,
	},
};

export const Primary: Story = {
	args: {
		children: 'home',
		theme: AppLinkTheme.PRIMARY,
	},
};

export const PrimarySizeSmall: Story = {
	args: {
		children: 'home',
		theme: AppLinkTheme.PRIMARY,
		size: AppLinkSize.SMALL,
	},
};

export const PrimarySizeMedium: Story = {
	args: {
		children: 'home',
		theme: AppLinkTheme.PRIMARY,
		size: AppLinkSize.MEDIUM,
	},
};

export const PrimarySizeLarge: Story = {
	args: {
		children: 'home',
		theme: AppLinkTheme.PRIMARY,
		size: AppLinkSize.LARGE,
	},
};

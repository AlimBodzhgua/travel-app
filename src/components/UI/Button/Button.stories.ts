import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
	args: {
		children: 'submit',
		theme: 'clear',
	},
};

export const Red: Story = {
	args: {
		children: 'submit',
		theme: 'red',
	},
};

export const Blue: Story = {
	args: {
		children: 'submit',
		theme: 'blue',
	},
};

export const Primary: Story = {
	args: {
		children: 'submit',
		theme: 'primary',
	},
};

export const PrimarySquared: Story = {
	args: {
		children: 'submit',
		theme: 'primary',
		square: true,
	},
};

export const PrimarySizeSmall: Story = {
	args: {
		children: 'submit',
		theme: 'primary',
		size: 'sm',
	},
};

export const PrimarySizeMedium: Story = {
	args: {
		children: 'submit',
		theme: 'primary',
		size: 'md',
	},
};

export const PrimarySizeLarge: Story = {
	args: {
		children: 'submit',
		theme: 'primary',
		size: 'lg',
	},
};

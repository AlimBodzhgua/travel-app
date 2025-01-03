import type { Meta, StoryObj } from '@storybook/react';

import { Popup } from './Popup';

const meta = {
	title: 'Components/Popup',
	component: Popup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

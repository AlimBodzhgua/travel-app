import type { Meta, StoryObj } from '@storybook/react';

import { BacklogItem } from './BacklogItem';

const meta = {
	title: 'Components/items/BacklogItem',
	component: BacklogItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof BacklogItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		backlog: {
			id: 'd8c9e269-10c3-4c9c-adc9-a3144c36f375',
			name: 'backlog 1',
		},
	},
};

import type { Meta, StoryObj } from '@storybook/react';
import { RequestItem } from './RequestItem';

const meta = {
	title: 'Components/items/RequestItem',
	component: RequestItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof RequestItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyList: Story = {
	args: {
		request: {
			id: 1,
			login: 'user1',
			email: 'user1@mail.ru',
		},
	},
};

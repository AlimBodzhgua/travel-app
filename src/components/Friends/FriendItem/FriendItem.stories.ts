import type { Meta, StoryObj } from '@storybook/react';
import { FriendItem } from './FriendItem';

const meta = {
	title: 'Components/items/FriendItem',
	component: FriendItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FriendItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyList: Story = {
	args: {
		friend: {
			id: 1,
			login: 'friend1',
			email: 'friend1@mail.ru',
		},
	},
};

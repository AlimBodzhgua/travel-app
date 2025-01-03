import type { Meta, StoryObj } from '@storybook/react';
import { FriendList } from './FriendList';

const meta = {
	title: 'Components/lists/FriendList',
	component: FriendList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FriendList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		friends: [
			{
				id: 1,
				login: 'friend1',
				email: 'friend1@mail.ru',
			},
			{
				id: 2,
				login: 'friend2',
				email: 'friend2@mail.ru',
			},
		],
		className: 'withFullWidth',
	},
};

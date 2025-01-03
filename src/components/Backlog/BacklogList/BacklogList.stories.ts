import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'config/storybook/StoreDecorator/StoreDecorator';

import { BacklogList } from './BacklogList';

const meta = {
	title: 'Components/lists/BacklogList',
	component: BacklogList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		className: 'withFullWidth',
	},
} satisfies Meta<typeof BacklogList>;

export default meta;
type Story = StoryObj<typeof meta>;

const authData = {
	id: 1,
	login: '',
	email: '',
	friends: [],
	friendRequests: [],
	password: '',
	travels: [
		{
			id: 1696690304858,
			name: 'travel to Sochi',
			dateStart: '2023.10.07',
			dateEnd: '2023.10.07',
			groups: [],
			members: [],
			backlog: [
				{
					id: 1696689792596,
					name: 'backlog 1',
				},
				{
					id: 1696701669884,
					name: 'backlog 2',
				},
			],
		},
	],
};

export const EmptyList: Story = {
	args: {},
};

export const WithData: Story = {
	args: {},
	decorators: [StoreDecorator({ user: { authData: authData } })],
};
import type { Meta, StoryObj } from '@storybook/react';

import ProfilePage from './ProfilePage';

const meta = {
	title: 'Pages/ProfilePage',
	component: ProfilePage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {
		to: '/',
	},
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

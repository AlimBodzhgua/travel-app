import type { Meta, StoryObj } from '@storybook/react';

import TravelDetailsPage from './TravelDetailsPage';

const meta = {
	title: 'Pages/TravelDetailsPage',
	component: TravelDetailsPage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {
		to: '/',
	},
} satisfies Meta<typeof TravelDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

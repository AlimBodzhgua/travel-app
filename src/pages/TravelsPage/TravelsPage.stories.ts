import type { Meta, StoryObj } from '@storybook/react';

import TravelsPage from './TravelsPage';

const meta = {
	title: 'Pages/TravelsPage',
	component: TravelsPage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {
		to: '/',
	},
} satisfies Meta<typeof TravelsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

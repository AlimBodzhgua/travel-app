import type { Meta, StoryObj } from '@storybook/react';

import { TravelItem } from './TravelItem';

const meta = {
	title: 'Components/items/TravelItem',
	component: TravelItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TravelItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 1696690300138,
		name: 'travel to Moscow',
		dateStart: '2023.10.07',
		dateEnd: '2023.10.07',
	},
};

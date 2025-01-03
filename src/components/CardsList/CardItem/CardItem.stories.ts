import type { Meta, StoryObj } from '@storybook/react';

import { CardItem } from './CardItem';

const meta = {
	title: 'Components/items/CardItem',
	component: CardItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof CardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		card: {
			id: 1,
			title: 'card title',
			description: 'lorem ipsum dollar set amet',
		},
		groupId: 1,
		travelId: 1,
	},
};

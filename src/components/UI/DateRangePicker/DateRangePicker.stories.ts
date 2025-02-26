import type { Meta, StoryObj } from '@storybook/react';

import { DateRangePicker } from './DateRangePicker';

const meta = {
	title: 'UI/DateRangePicker',
	component: DateRangePicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

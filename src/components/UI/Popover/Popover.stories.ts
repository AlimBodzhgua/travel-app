import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './Popover';

const meta = {
	title: 'Components/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
// 	args: {},
// };

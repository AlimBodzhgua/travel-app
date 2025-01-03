import type { Meta, StoryObj } from '@storybook/react';
import { BacklogCreateForm } from './BacklogCreateForm';

const meta = {
	title: 'Forms/BacklogCreateForm',
	component: BacklogCreateForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof BacklogCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

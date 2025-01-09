import type { Meta, StoryObj } from '@storybook/react';

import { RegisterForm } from './RegisterForm';

const meta = {
	title: 'AuthForms/RegisterForm',
	component: RegisterForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

import type { Meta, StoryObj } from "@storybook/react";

import RegisterPage from "./RegisterPage";

const meta = {
    title: "Pages/RegisterPage",
    component: RegisterPage,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {
        to: '/',  
    }
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
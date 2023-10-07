import type { Meta, StoryObj } from "@storybook/react";

import LoginPage from "./LoginPage";

const meta = {
    title: "Pages/LoginPage",
    component: LoginPage,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {
        to: '/',  
    }
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
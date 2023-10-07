import type { Meta, StoryObj } from "@storybook/react";

import UsersPage from "./UsersPage";

const meta = {
    title: "Pages/UsersPage",
    component: UsersPage,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {
        to: '/',  
    }
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
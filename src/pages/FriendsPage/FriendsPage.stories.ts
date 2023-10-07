import type { Meta, StoryObj } from "@storybook/react";

import FriendsPage from "./FriendsPage";

const meta = {
    title: "Pages/FriendsPage",
    component: FriendsPage,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {
        to: '/',  
    }
} satisfies Meta<typeof FriendsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
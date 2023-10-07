import type { Meta, StoryObj } from "@storybook/react";

import Profile from "./Profile";

const meta = {
    title: "Components/Profile",
    component: Profile,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
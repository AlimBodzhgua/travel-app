import type { Meta, StoryObj } from "@storybook/react";

import GroupCreateForm from "./GroupCreateForm";

const meta = {
    title: "Forms/GroupCreateForm",
    component: GroupCreateForm,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
} satisfies Meta<typeof GroupCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
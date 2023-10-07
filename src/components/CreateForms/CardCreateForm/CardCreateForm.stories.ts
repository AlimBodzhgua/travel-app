import type { Meta, StoryObj } from "@storybook/react";

import CardCreateForm from "./CardCreateForm";

const meta = {
    title: "Forms/CardCreateForm",
    component: CardCreateForm,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
} satisfies Meta<typeof CardCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        groupId: 2,
    },
};
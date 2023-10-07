import type { Meta, StoryObj } from "@storybook/react";

import { GroupItem } from "./GroupItem";

const meta = {
    title: "Components/GroupItem",
    component: GroupItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
} satisfies Meta<typeof GroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/*export const Default: Story = {
    args: {},
};*/
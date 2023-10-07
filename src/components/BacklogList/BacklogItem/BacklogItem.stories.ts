import type { Meta, StoryObj } from "@storybook/react";

import { BacklogItem } from "./BacklogItem";

const meta = {
    title: "Components/BacklogItem",
    component: BacklogItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
} satisfies Meta<typeof BacklogItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/*export const Default: Story = {
    args: {},
};*/
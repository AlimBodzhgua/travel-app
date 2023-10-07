import type { Meta, StoryObj } from "@storybook/react";

import TravelCreateForm from "./TravelCreateForm";

const meta = {
    title: "Forms/TravelCreateForm",
    component: TravelCreateForm,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
} satisfies Meta<typeof TravelCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
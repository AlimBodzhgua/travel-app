import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonTheme, ButtonSize } from "./Button";

const meta = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.CLEAR,
    },
};

export const Red: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.RED,
    },
};

export const Blue: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.BLUE,
    },
};

export const Primary: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.PRIMARY
    },
};

export const PrimarySquared: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.PRIMARY,
        square: true,
    },
};

export const PrimarySizeSmall: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.PRIMARY,
        size: ButtonSize.SMALL,
    },
};

export const PrimarySizeMedium: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.PRIMARY,
        size: ButtonSize.MEDIUM,
    },
};

export const PrimarySizeLarge: Story = {
    args: {
        children: 'submit',
        theme: ButtonTheme.PRIMARY,
        size: ButtonSize.LARGE,
    },
};
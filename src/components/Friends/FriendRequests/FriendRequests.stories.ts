import type { Meta, StoryObj } from "@storybook/react";
import FriendRequests from "./FriendRequests";

const meta = {
    title: "Components/lists/FriendRequests",
    component: FriendRequests,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof FriendRequests>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        friendRequests: [
            {
                id: 1,
                login: 'friendRequest1',
                email: 'friend1@mail.ru',
            },
            {
                id: 2,
                login: 'friendRequest2',
                email: 'friend2@mail.ru',
            }
        ],
        className: 'withFullWidth',
    },
};
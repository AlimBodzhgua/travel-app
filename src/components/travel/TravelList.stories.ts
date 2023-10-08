import type { Meta, StoryObj } from "@storybook/react";

import TravelList from "./TravelList";

const meta = {
    title: "Components/lists/TravelList",
    component: TravelList,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TravelList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        travels: [
            {
                "id": 1696690300138,
                "name": "travel to Moscow",
                "dateStart": "2023.10.07",
                "dateEnd": "2023.10.07",
                "members": [],
                "backlog": [],
                "groups": []
            },
            {
                "id": 1696690300138,
                "name": "travel to Sochi",
                "dateStart": "2023.10.07",
                "dateEnd": "2023.10.07",
                "members": [],
                "backlog": [],
                "groups": []
            },
        ]
    },
};
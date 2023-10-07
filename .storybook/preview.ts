import type { Preview } from "@storybook/react";
import { StyleDecorator } from '../src/config/storybook/StyleDecorator/StyleDecorator';
import { BrowserDecorator } from '../src/config/storybook/BrowserDecorator/BrowserDecorator';
import { StoreDecorator } from '../src/config/storybook/StoreDecorator/StoreDecorator';
import { LocalizationDecorator } from '../src/config/storybook/LocalizationDecorator/LocalizationDecorator';


const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        StyleDecorator,
        BrowserDecorator,
        StoreDecorator,
        LocalizationDecorator,
    ]
};

export default preview;
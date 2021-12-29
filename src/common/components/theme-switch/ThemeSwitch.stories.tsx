import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeSwitch } from './ThemeSwitch';

export default {
  title: 'Components/ThemeSwitch',
  component: ThemeSwitch,
  args: {},
  decorators: [
    (Story) => (
      <div className="flex items-center justify-end h-16 px-4">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ThemeSwitch>;

const Template: ComponentStory<typeof ThemeSwitch> = (args) => (
  <ThemeSwitch {...args} />
);

export const Default = Template.bind({});
Default.args = {};

import { Menu } from '@headlessui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavMenuItem } from './NavMenuItem';

export default {
  title: 'Atoms/NavMenuItem',
  component: NavMenuItem,
  args: {},
  decorators: [
    (Story) => (
      <Menu as="div" className="py-8">
        <Story />
      </Menu>
    ),
  ],
} as ComponentMeta<typeof NavMenuItem>;

const Template: ComponentStory<typeof NavMenuItem> = ({
  children,
  ...args
}) => <NavMenuItem {...args}>{children}</NavMenuItem>;

export const Default = Template.bind({});
Default.args = {
  children: 'Item 1',
  current: false,
};

export const Current = Template.bind({});
Current.args = {
  ...Default.args,
  current: true,
};

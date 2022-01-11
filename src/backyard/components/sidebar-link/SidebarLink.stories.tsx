import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SidebarLink } from './SidebarLink';
import { ClipboardListIcon } from '@heroicons/react/outline';

export default {
  title: 'Backyard/SidebarLink',
  component: SidebarLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'darkmode',
      values: [
        {
          name: 'darkmode',
          value: '#1F2937',
        },
      ],
    },
  },
} as ComponentMeta<typeof SidebarLink>;

const Template: ComponentStory<typeof SidebarLink> = ({
  children,
  ...args
}) => <SidebarLink {...args}>{children}</SidebarLink>;

export const Default = Template.bind({});
Default.args = {
  children: 'Turniere',
  to: '/hinterhof/turniere',
  icon: ClipboardListIcon,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserIcon } from '@heroicons/react/outline';
import { NavButton } from './NavButton';

export default {
  title: 'Atoms/NavButton',
  component: NavButton,
  args: {},
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center h-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => (
  <NavButton {...args} />
);

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: <UserIcon className="h-6 w-6 m-1" />,
};

export const WithImage = Template.bind({});
WithImage.args = {
  children: (
    <img
      className="h-8 w-8 rounded-full"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    />
  ),
};

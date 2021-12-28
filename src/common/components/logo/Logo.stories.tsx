import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Logo } from './Logo';

export default {
  title: 'Atoms/Logo',
  component: Logo,
  args: {},
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = ({ ...args }) => (
  <Logo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  className: 'h-8',
};

export const Big = Template.bind({});
Big.args = {
  className: 'w-64',
};

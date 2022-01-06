import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SplashScreen } from './SplashScreen';

export default {
  title: 'Components/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SplashScreen>;

const Template: ComponentStory<typeof SplashScreen> = ({ ...args }) => (
  <SplashScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  show: false,
};

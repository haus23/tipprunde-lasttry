import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextField } from './TextField';

export default {
  title: 'Atoms/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <div className="dark:bg-gray-900 p-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Kennung',
  placeholder: 'Kurzer eindeutiger Schlüssel in Kleinbuchstaben',
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  label: 'Vorname',
  labelHidden: true,
  placeholder: 'Vorname',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'PLZ',
  placeHolder: 'Postleitzahl',
  errorMsg: 'Zwingend fünf Ziffern',
};

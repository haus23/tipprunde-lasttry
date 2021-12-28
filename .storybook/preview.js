import '../src/styles.css';

export const parameters = {
  darkMode: {
    classTarget: 'html',
    stylePreview: true,
  },
};

export const decorators = [
  (Story) => (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <Story />
    </div>
  ),
];

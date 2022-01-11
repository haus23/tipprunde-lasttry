import { ReactNode } from 'react';

export type ContentPanelProps = {
  title: ReactNode;
  children?: ReactNode;
};

export const ContentPanel = ({ title, children }: ContentPanelProps) => (
  <div>
    <div className="px-4 h-16 border-b border-gray-300 dark:border-gray-700 flex items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

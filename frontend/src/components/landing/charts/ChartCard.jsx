import React from 'react';

export default function ChartCard({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full h-full flex flex-col">
      <h3 className="text-2xl font-semibold mb-2 text-primary-600">{title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-shrink-0">{description}</p>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

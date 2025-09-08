import React from 'react';

const OverviewCards = ({ overviewCards }) => {
  if (!overviewCards || !overviewCards.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {overviewCards.map(({ icon, title, value, change, color }, i) => (
        <div
          key={i}
          className="card bg-slate-100 dark:bg-slate-950 rounded-lg shadow-sm transition-colors duration-300"
        >
          <div className="card-header flex items-center gap-3 p-4">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600`}
            >
              <span className="text-xl">{icon}</span>
            </div>
            <p className="card-title font-semibold text-slate-700 dark:text-slate-200">{title}</p>
          </div>
          <div className="card-body px-4 pb-4">
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
            <span
              className={`inline-flex items-center gap-1 rounded-full border border-blue-500 px-3 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600 mt-1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
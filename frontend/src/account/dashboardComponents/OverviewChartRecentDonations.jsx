import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const OverviewChartRecentDonations = ({
  overviewData,
  recentSalesData,
  theme,
}) => {
  if (!overviewData || !recentSalesData) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
      <div className="card col-span-1 md:col-span-2 lg:col-span-4">
        <div className="card-header">
          <p className="card-title text-lg font-semibold text-slate-700 dark:text-slate-200">Overview</p>
        </div>
        <div className="card-body p-0">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={overviewData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip cursor={false} formatter={(value) => `₹${value}`} />
              <XAxis
                dataKey="name"
                strokeWidth={0}
                stroke={theme === 'light' ? '#475569' : '#94a3b8'}
                tickMargin={6}
              />
              <YAxis
                dataKey="total"
                strokeWidth={0}
                stroke={theme === 'light' ? '#475569' : '#94a3b8'}
                tickFormatter={(value) => `₹${value}`}
                tickMargin={6}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card col-span-1 md:col-span-2 lg:col-span-3 scroll-smooth  ">
        <div className="card-header">
          <p className="card-title text-lg font-semibold text-slate-700 dark:text-slate-200">Recent Donations</p>
        </div>
        <div className="card-body h-[300px] overflow-auto [scrollbar-width:_thin] p-0">
          {recentSalesData.map((donation) => (
            <div
              key={donation.id}
              className="flex items-center justify-between gap-x-4 py-2 pr-2 border-b border-slate-200 dark:border-slate-700 last:border-0"
            >
              <div className="flex items-center gap-x-4">
                <img
                  src={donation.image}
                  alt={donation.name}
                  className="w-10 h-10 flex-shrink-0 rounded-full object-cover"
                />
                <div className="flex flex-col gap-y-1">
                  <p className="font-medium text-slate-900 dark:text-slate-50">{donation.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{donation.email}</p>
                </div>
              </div>
              <p className="font-medium text-slate-900 dark:text-slate-50">₹ {donation.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewChartRecentDonations;

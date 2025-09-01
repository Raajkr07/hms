import React, { useState } from 'react';
import ChartCard from './ChartCard';
import { charts } from '../../../data/Data';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

export default function ThreeChartCarousel() {
  const [activeChart, setActiveChart] = useState(2);

  const getChartStyle = (id) => {
    if (id === activeChart) {
      return 'z-30 scale-105 opacity-100 border-4 border-blue-500 shadow-lg animate-pulse';
    }
    return 'z-20 scale-95 opacity-70 grayscale blur-[1.5px] hover:scale-100 hover:opacity-90 hover:blur-0 cursor-pointer';
  };

  return (
    <section className="w-full py-16 flex justify-center items-center">
      <div
        className="
          w-full max-w-[1400px] px-4 sm:px-6 mx-auto 
          flex flex-col md:flex-row justify-center gap-6 md:gap-8 
          overflow-x-auto md:overflow-visible
          scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
        "
      >
        {charts.map(({ id, title, description, data }) => (
          <div
            key={id}
            className={`
              transition-all duration-500 ease-in-out relative flex-shrink-0 
              w-full max-w-sm md:max-w-[430px]
              ${getChartStyle(id)}
            `}
            onClick={() => id !== activeChart && setActiveChart(id)}
          >
            <ChartCard title={title} description={description}>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="donations" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        ))}
      </div>
    </section>
  );
}

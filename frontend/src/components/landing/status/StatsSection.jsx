import { statsData } from '../../../data/Data';
import StatsCard from './StatsCard';

export default function StatsSection() {
  return (
    <section className="mb-13 px-6 w-full mx-auto overflow-hidden min-h-[255px]">
      <div className="flex animate-slideLeft gap-6 will-change-transform min-w-max pt-[5px] pb-[5px]">
        {[...statsData, ...statsData].map(({ icon, label, value, color }, index) => (
          <StatsCard
            key={label + index}
            icon={icon}
            label={label}
            value={value}
            color={color}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slideLeft {
          animation: slideLeft linear infinite;
          animation-duration: 40s;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

import { statsData } from '../../../data/Data';
import StatsCard from './StatsCard';


export default function StatsSection() {
  return (
    <section className="mb-14 px-6 w-full  mx-auto overflow-hidden">
      <div className="flex animate-slideLeft gap-6 will-change-transform min-w-max">
        {statsData.map(({ icon, label, value, color }, index) => (
          <StatsCard key={label + index} icon={icon} label={label} value={value} color={color} />
        ))}
        {statsData.map(({ icon, label, value, color }, index) => (
          <StatsCard key={'duplicate-' + label + index} icon={icon} label={label} value={value} color={color} />
        ))}
      </div>
    </section>
  );
}


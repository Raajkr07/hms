import React, { useState } from 'react';
import Header from '../../../components/header/Header';
import Sidebar from '../UserSidebar';
import Footer from '../../../components/footer/SocialFooter';
import { Star } from 'lucide-react';
import { medicalStores, ngos, hospitals, clinics } from '../data/LocationData';

const LocationCard = ({ place }) => (
  <a
    href={place.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 mb-4 rounded-lg border border-gray-300 hover:shadow-md transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 no-underline"
  >
    <h3 className="text-lg font-semibold mb-1 text-blue-600 dark:text-blue-400 no-underline">{place.name}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{place.address}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">📞 {place.phone}</p>
    <p className="flex items-center gap-1 text-yellow-500 mb-1">
      <Star size={16} /> {place.rating.toFixed(1)}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Hours today: {place.hoursToday}</p>
    <p className="text-xs text-gray-400 dark:text-gray-500">Categories: {place.categories.join(', ')}</p>
  </a>
);

const categories = [
  { key: 'medicalStores', label: 'Medical Stores' },
  { key: 'ngos', label: 'NGOs' },
  { key: 'hospitals', label: 'Hospitals' },
  { key: 'clinics', label: 'Doctor Clinics' },
];

const LocationPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isSidebarOpen = !sidebarCollapsed || sidebarHovered;

  const [selectedCategory, setSelectedCategory] = useState('medicalStores');

  const dataMap = {
    medicalStores,
    ngos,
    hospitals,
    clinics,
  };

  return (
    <div className="min-h-screen flex flex-col bg-bodybg text-bodytext transition-colors duration-300">
      <Header />

      {/* Flex container for sidebar and main */}
      <div className="flex flex-1 pt-[70px]">
        <aside
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          style={{ width: sidebarCollapsed ? 64 : 256, transition: 'width 0.3s ease' }}
          className="border-r border-gray-200 bg-sidebarbg text-sidebartext"
        >
          <Sidebar collapsed={!isSidebarOpen} />
        </aside>

        {/* Main content container */}
        <main className="flex-grow p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 no-underline text-yellow-400">Nearby Locations - Darbhanga</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400 max-w-2xl no-underline">
            Find nearby{' '}
            <strong>Medical Stores</strong>, <strong>Hospitals</strong>, <strong>NGOs</strong>, and{' '}
            <strong>Doctor Clinics</strong> to assist you quicker and better.
          </p>

          {/* Category toggle buttons */}
          <div className="mb-6 flex justify-center gap-4 flex-wrap">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-semibold border-2 focus:outline-none transition-border ${
                  selectedCategory === key
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-transparent bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800'
                }`}
                aria-pressed={selectedCategory === key}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Locations List */}
          <section>
            {dataMap[selectedCategory].length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No locations available.</p>
            ) : (
              dataMap[selectedCategory].map((place) => <LocationCard key={place.id} place={place} />)
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LocationPage;

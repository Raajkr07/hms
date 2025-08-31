import React, { useState } from 'react';
import Header from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const roles = [
  {
    name: 'User',
    responsibilities: [
      'Find local medicine availability and donation locations',
      'Contribute unused medicines for community benefit',
      'Donate funds directly to trusted NGOs and welfare partners',
      'Track ongoing prescriptions and receive disposal alerts',
    ],
    color: 'text-primary-500',
  },
  {
    name: 'Doctor',
    responsibilities: [
      'Verify patient details and securely manage prescriptions',
      'Monitor medicine collections and distribution records',
      'Report wastage patterns and propose strategic improvements',
      'Collaborate with teams for reliable and safe deliveries',
    ],
    color: 'text-primary-500',
  },
  {
    name: 'Admin',
    responsibilities: [
      'Authenticate doctors and partners to maintain system trust',
      'Coordinate with NGOs, companies, and all users',
      'Manage logistics for efficient medicine pickup and delivery',
      'Plan operations, analyze data, and guarantee safe disposal',
    ],
    color: 'text-primary-500',
  },
];

const HowItWorksPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <div className="dark:bg-[#0A0915] min-h-screen flex flex-col">
      <Header sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
      <main className="flex-1 pt-[75px] px-4 pb-20">
        <section className="max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-blue-100 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-xl p-8 md:p-14 my-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary-600 dark:text-primary-400 mb-10 tracking-wide">
            How HopeMeds Works
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-center text-neutral-700 dark:text-neutral-300 text-lg md:text-xl">
            HopeMeds is a collaborative medicine wastage management platform connecting individuals, medical professionals, and administrators. We empower communities to donate unused medicines, support NGOs, and ensure safe and transparent logistics for responsible disposal and redistribution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
            {roles.map((role) => (
              <div
                key={role.name}
                className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-7 flex flex-col h-full min-h-[260px] lg:min-h-[320px]"
              >
                <h2 className={`text-xl font-bold mb-4 ${role.color}`}>{role.name}</h2>
                <ul className="list-disc ml-5 space-y-3 text-neutral-700 dark:text-neutral-300 text-base">
                  {role.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 md:p-10 mb-8 mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-5 text-center">Workflow & Impact</h3>
            <ol className="list-decimal ml-6 md:ml-12 space-y-5 text-neutral-700 dark:text-neutral-300 text-base">
              <li>
                Users register, locate, and contribute unused medicines or donate funds. All medicine entries are verified before redistribution.
              </li>
              <li>
                Doctors review, validate, and manage prescriptions. They help monitor wastage, ensure the safety of contributions, and propose system improvements.
              </li>
              <li>
                Admins verify and onboard doctors and NGOs, plan bulk logistics for pickups, and analyze all system data. Admins ensure compliance and coordinate communication across parties for safe delivery.
              </li>
              <li>
                Partner NGOs and companies help store, redistribute, and responsibly dispose of medicines, maximizing safety and reach.
              </li>
            </ol>
            <p className="mt-7 text-center text-neutral-600 dark:text-neutral-400 md:text-lg">
              HopeMeds provides secure authentication, role-based features, detailed tracking, and real-time insights to reduce wastage, lower costs, and improve health outcomes for the entire community. Built to be scalable and easy to deploy on cloud for wide accessibility.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;

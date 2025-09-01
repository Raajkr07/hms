import React, { useState } from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const safetyInfo = {
  male: {
    label: 'Male',
    subgroups: {
      child: {
        title: 'Safety Precautions for Boys (Child)',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              "Always follow pediatric dosing instructions carefully. Never give adult medicines or dosages to children unless prescribed. Keep medicines out of children's reach and use child-proof containers.",
          },
          {
            heading: 'Storage',
            content:
              'Store medicines in a cool, dry place away from direct sunlight. Avoid storing in bathrooms or places with humidity to preserve medicine effectiveness.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Only donate medicines specifically intended for children, unused, unopened, and within the expiration date. Inform about any special storage requirements or sensitivities.',
          },
        ],
      },
      teenage: {
        title: 'Safety Precautions for Teenage Males',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Follow doctor’s instructions carefully and avoid self-medicating. Be aware of medicine interactions with activities like sports or alcohol.',
          },
          {
            heading: 'Storage',
            content:
              'Keep medicines in a secure place out of reach of younger children and maintain consistent storage conditions.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Donate medicines unopened, unused, and within expiry. Make sure they are appropriate for teenage male use.',
          },
        ],
      },
      adult: {
        title: 'Safety Precautions for Adult Males',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Always follow dosing guidelines and consult your doctor for conditions specific to men. Avoid alcohol or other substances that may interact negatively with medicines.',
          },
          {
            heading: 'Storage',
            content:
              'Store medicines securely, away from children or unauthorized persons. Keep medicines away from heat sources and moisture.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Ensure medicines intended for male health are unopened, within expiry, and properly labeled before donating.',
          },
        ],
      },
      senior: {
        title: 'Safety Precautions for Senior Males',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Keep a clear schedule for medicines and consult healthcare providers about potential interactions. Use pill organizers to avoid missed or double doses.',
          },
          {
            heading: 'Storage',
            content:
              'Store medicines in an easily accessible, dry, and safe place. Avoid excessive heat or humidity and monitor expiration dates frequently.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Donate medicines only when they are unopened, unexpired, and with clear labels. Indicate any special handling or storage instructions.',
          },
        ],
      },
    },
  },

  female: {
    label: 'Female',
    subgroups: {
      child: {
        title: 'Safety Precautions for Girls (Child)',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              "Always follow pediatric dosing instructions carefully. Never give adult medicines or dosages to children unless prescribed. Keep medicines out of children's reach and use child-proof containers.",
          },
          {
            heading: 'Storage',
            content:
              'Store medicines in a cool, dry place away from direct sunlight. Avoid storing in bathrooms or places with humidity to preserve medicine effectiveness.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Only donate medicines specifically intended for children, unused, unopened, and within the expiration date. Inform about any special storage requirements or sensitivities.',
          },
        ],
      },
      teenage: {
        title: 'Safety Precautions for Teenage Females',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Follow doctor’s instructions carefully and avoid self-medicating. Be aware of medicine interactions with activities like sports or alcohol.',
          },
          {
            heading: 'Storage',
            content:
              'Keep medicines in a secure place out of reach of younger children and maintain consistent storage conditions.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Donate medicines unopened, unused, and within expiry. Make sure they are appropriate for teenage female use.',
          },
        ],
      },
      adult: {
        title: 'Safety Precautions for Adult Females',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Consult your healthcare provider for medicines specific to women’s health, including during pregnancy or breastfeeding. Follow instructions carefully.',
          },
          {
            heading: 'Storage',
            content:
              'Keep medicines in a cool, dry place protected from direct light and moisture.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Donate medicines meant for female health that are unopened, unexpired, and include detailed labeling and storage info.',
          },
        ],
      },
      senior: {
        title: 'Safety Precautions for Senior Females',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Keep a clear schedule for medicines and consult healthcare providers about potential interactions. Use pill organizers to avoid missed or double doses.',
          },
          {
            heading: 'Storage',
            content:
              'Store medicines in an easily accessible, dry, and safe place. Avoid excessive heat or humidity and monitor expiration dates frequently.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Donate medicines only when they are unopened, unexpired, and with clear labels. Indicate any special handling or storage instructions.',
          },
        ],
      },
    },
  },

  others: {
    label: 'Others',
    subgroups: {
      general: {
        title: 'General Safety Precautions',
        sections: [
          {
            heading: 'Proper Medicine Use',
            content:
              'Use medicines as prescribed by your healthcare provider. Do not share medicines with others and avoid self-medicating.',
          },
          {
            heading: 'Storage',
            content:
              'Store medicines in a consistent, cool, dry location, away from children and pets. Check expiry dates regularly and dispose of expired or unused medicines safely.',
          },
          {
            heading: 'Donation Guidelines',
            content:
              'Donate only medicines that are unopened, unexpired, and safe for redistribution. Include clear information about medicine type, dosage, and storage.',
          },
        ],
      },
    },
  },
};

const SafetyPage = () => {
  const [selectedGender, setSelectedGender] = useState(null); // male, female, others
  const [selectedSubgroup, setSelectedSubgroup] = useState(null);
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSubgroup =
    selectedGender && selectedSubgroup
      ? safetyInfo[selectedGender].subgroups[selectedSubgroup]
      : null;

  const subgroupsList = selectedGender
    ? Object.entries(safetyInfo[selectedGender].subgroups)
    : [];

  return (
    <>
      <LandingHeader onLogoClick={handleLogoClick} />
      <main
        role="main"
        className="max-w-5xl mx-auto p-6 mt-[80px] mb-16"
        style={{ fontFamily: 'merriweather, serif' }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Medicine Safety Precautions
        </h1>

        {/* Select Gender */}
        <section className="mb-8 flex justify-center gap-6 flex-wrap">
          {Object.entries(safetyInfo).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedGender(key);
                setSelectedSubgroup(null);
              }}
              className={`px-6 py-3 rounded-md font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                selectedGender === key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </section>

        {selectedGender && (
          <section className="mb-12 flex justify-center gap-4 flex-wrap">
            {subgroupsList.map(([key, subgroup]) => (
              <button
                key={key}
                onClick={() => setSelectedSubgroup(key)}
                className={`px-5 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 transition ${
                  selectedSubgroup === key
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </section>
        )}

        {/* Select age */}
        {currentSubgroup && (
          <article className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-inner max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
              {currentSubgroup.title}
            </h2>
            {currentSubgroup.sections.map(({ heading, content }, idx) => (
              <section key={idx} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {heading}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>
              </section>
            ))}
          </article>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SafetyPage;

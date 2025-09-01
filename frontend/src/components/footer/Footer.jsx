import React from 'react';
import LogoButton from '../header/LogoButton';
import { HeartbeatLine } from '../HeartBeatLine';
import {
  Twitter, Linkedin, Github, Mail, Heart,
} from 'lucide-react';

const footerLinks = [
  {
    title: "Project",
    links: [
      { label: "About HopeMeds", href: "/about" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "Impact & Results", href: "/impact" },
      { label: "Donate Medicines", href: "/donate" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "Contact Team", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Medicine Safety", href: "/safety" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Partner NGOs", href: "/partners" },
      { label: "Volunteer Program", href: "/volunteers" },
      { label: "Terms & Policies", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="
        w-full
        h-[420px]
        bg-white dark:bg-gray-900
        border-t border-gray-200 dark:border-gray-800
        mt-auto select-none
        flex flex-col justify-between
      "
      style={{ fontFamily: 'merriweather, serif' }}
    >
       <HeartbeatLine />
      <div className="flex-1">
        {/* Grid */}
        <div className="
          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          h-full
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-12
          items-start
          pt-12
        ">
          {/* Logo and About */}
          <div aria-labelledby="footer-brand">
            <div className="flex items-center mb-4">
              <LogoButton />
              <span className="sr-only">Go to home</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xs mb-6">
              Empowering communities to reduce medicine wastage and improve healthcare accessibility through innovative redistribution solutions.
            </p>
            {/* Social */}
            <nav className="flex space-x-2">
              <a
                href="https://twitter.com/hope_meds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-colors duration-200 focus-visible:underline focus:underline focus:outline-none active:underline underline-offset-4 relative"
                tabIndex={0}
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/hopemeds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with us on LinkedIn"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200 focus-visible:underline focus:underline focus:outline-none active:underline underline-offset-4 relative"
                tabIndex={0}
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/Raajkr07/hms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our projects on GitHub"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 focus-visible:underline focus:underline focus:outline-none active:underline underline-offset-4 relative"
                tabIndex={0}
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:rk999900001@gmail.com"
                aria-label="Send us an email"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white transition-colors duration-200 focus-visible:underline focus:underline focus:outline-none active:underline underline-offset-4 relative"
                tabIndex={0}
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
          {/* Navigation Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} aria-labelledby={`footer-section-${section.title}`}>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4 pl-0 ml-0 list-none">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="
                      block text-gray-600 dark:text-gray-300
  hover:underline hover:text-emerald-600 dark:hover:text-emerald-400
  transition-colors duration-150 text-sm no-underline
  focus-visible:underline focus:underline focus:outline-none active:underline
  underline-offset-4 relative
"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom bar */}
      <div className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left w-full md:w-auto" style={{ fontFamily: 'merriweather, serif' }}>
            &copy; {currentYear} HopeMeds.
          </p>
          <nav className="flex space-x-5 text-gray-600 dark:text-gray-400">
            <a href="/accessibility" className="hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:underline focus:underline focus:outline-none active:underline underline-offset-4 relative">
              Accessibility
            </a>
            <a href="/sitemap" className="hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:underline focus:underline focus:outline-none active:underline underline-offset-4 relative">
              Sitemap
            </a>
            <span className="flex items-center" style={{ fontFamily: 'merriweather, serif' }}>
              Made with
              <Heart className="mx-1 w-4 h-4 text-red-500" />
              for healthcare
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
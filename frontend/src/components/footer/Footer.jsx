import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700 dark:text-gray-300">
        <div>
          <h4 className="font-bold mb-4 text-primary-600">HopeMeds</h4>
          <p>© 2025 HopeMeds. Fighting medicine wastage together.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Resources</h5>
          <ul className="space-y-2">
            <li><Link to="/documentation" className="hover:text-primary-500">Documentation</Link></li>
            <li><a href="#privacy" className="hover:text-primary-500">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-primary-500">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Support</h5>
          <ul className="space-y-2">
            <li><a href="#contact" className="hover:text-primary-500">Contact</a></li>
            <li><a href="/faq" className="hover:text-primary-500">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Connect</h5>
          <ul className="space-y-2">
            <li><a href="https://twitter.com/hope_meds" target="_blank" rel="noreferrer" className="hover:text-primary-500">Twitter</a></li>
            <li><a href="https://linkedin.com/company/hopemeds" target="_blank" rel="noreferrer" className="hover:text-primary-500">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { Shield, Heart, Zap } from 'lucide-react';
import { DollarSign, Award } from 'lucide-react';

export const medicineDonationPlans = [
  {
    name: "Starter Pack",
    quantity: 5,
    icon: Heart,
    color: "from-blue-500 to-cyan-500",
    benefits: [
      "Redistribute 5 medicine packages",
      "Help 2-3 families monthly",
      "Basic impact reports",
      "Community recognition",
    ],
    impact: "Supports medicine needs for 1 chronic patient for 1 month",
  },
  {
    name: "Community Saver",
    quantity: 25,
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    benefits: [
      "Redistribute 25 medicine packages",
      "Help 10-12 families monthly",
      "Detailed impact analytics",
      "Priority donor support",
      "Tax benefit certificate",
    ],
    impact: "Covers medicines for 5 patients with chronic conditions",
    popular: true,
  },
  {
    name: "Change Maker",
    quantity: 100,
    icon: Award,
    color: "from-purple-500 to-pink-500",
    benefits: [
      "Redistribute 100+ medicine packages",
      "Help 40-50 families monthly",
      "Comprehensive impact dashboard",
      "Direct beneficiary connect",
      "Quarterly impact calls",
      "Special donor events access",
    ],
    impact: "Enables a small medicine bank serving 20+ families regularly",
  },
  {
    name: "Revolution",
    quantity: 250,
    icon: Zap,
    color: "from-orange-500 to-red-500",
    benefits: [
      "Redistribute 250+ medicine packages",
      "Help 100+ families monthly",
      "Real-time impact tracking",
      "Personal impact coordinator",
      "Monthly beneficiary stories",
      "Partnership opportunities",
      "Brand visibility options",
    ],
    impact: "Power a community medicine center serving entire neighborhoods",
  },
];

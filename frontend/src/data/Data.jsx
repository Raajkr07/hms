import React from 'react';
import { Shield, Heart, Stethoscope, User, Users, Award, Bell, MessageCircle, UserCheck, Globe, Zap, DollarSign } from 'lucide-react';
import a from '../assets/imagequeue1.jpg';
import b from '../assets/imagequeue2.jpg';
import c from '../assets/imagequeue3.jpg';
import d from '../assets/imagequeue4.jpg';
import e from '../assets/imagequeue5.jpg';
import f from '../assets/imagequeue6.jpg';

export const statsData = [
  { icon: <Shield size={20} />, label: 'Community', value: '25,489', color: 'bg-purple-500' },
  { icon: <Heart size={20} />, label: 'Medicines Donated', value: '12,345', color: 'bg-blue-500' },
  { icon: <Stethoscope size={20} />, label: 'Verified Donations', value: '9,813', color: 'bg-green-500' },
  { icon: <Shield size={20} />, label: 'Partner NGOs', value: '67', color: 'bg-purple-500' },
  { icon: <User size={20} />, label: 'Active Volunteers', value: '893', color: 'bg-indigo-500' },
  { icon: <Users size={20} />, label: 'Total Beneficiaries', value: '15,200', color: 'bg-yellow-500' },
  { icon: <Award size={20} />, label: 'Awards Won', value: '14', color: 'bg-pink-500' },
  { icon: <Bell size={20} />, label: 'Alerts Sent', value: '4,560', color: 'bg-red-500' },
  { icon: <MessageCircle size={20} />, label: 'Feedback Messages', value: '1,234', color: 'bg-teal-500' },
  { icon: <Users size={20} />, label: 'Lives Impacted', value: '18,320', color: 'bg-yellow-500' },
  { icon: <UserCheck size={20} />, label: 'Doctors Approved', value: '150', color: 'bg-green-500' },
  { icon: <Globe size={20} />, label: 'Communities Served', value: '40', color: 'bg-indigo-500' },
];

export const lineChartData = [
  { month: 'Jan', donations: 400 },
  { month: 'Feb', donations: 650 },
  { month: 'Mar', donations: 700 },
  { month: 'Apr', donations: 850 },
  { month: 'May', donations: 900 },
  { month: 'Jun', donations: 1100 },
  { month: 'Jul', donations: 1300 },
  { month: 'Aug', donations: 650 },
  { month: 'Sep', donations: 620 },
  { month: 'Oct', donations: 720 },
  { month: 'Nov', donations: 800 },
  { month: 'Dec', donations: 750 },
];

export const charts = [
  { id: 1, title: 'Monthly Medicine Donations', description: 'Monthly donation trends', data: lineChartData },
  { id: 2, title: 'Quarterly Medicine Donations', description: 'Quarterly donation trends', data: lineChartData },
  { id: 3, title: 'Yearly Medicine Donations', description: 'Yearly donation summary', data: lineChartData },
];

export const images = [
  { src: a, alt: 'Medicine Donation Event', caption: 'Community medicine donation drive.' },
  { src: b, alt: 'Doctors verifying medicine quality', caption: 'Medical professionals verifying donated medicines.' },
  { src: c, alt: 'NGO partners', caption: 'Our trusted NGO partners.' },
  { src: d, alt: 'NGO partners', caption: 'Our trusted NGO partners.' },
  { src: e, alt: 'Donation Box', caption: 'Our trusted NGO partners.' },
  { src: f, alt: 'capsule', caption: 'Our trusted NGO partners.' },
];

export const testimonialsData = [
  {
    quote: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    author: "Raj Kumar",
    role: "Student",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    rating: 5,
  },
  {
    quote: "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.",
    author: "Binod Kumar",
    role: "Student",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    rating: 5,
  },
  {
    quote: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.",
    author: "Om Singh",
    role: "Student",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
    rating: 5,
  },
];

export const problemSolutions = [
  {
      problem: "Medicine Expiry Waste",
      stat: "40% medicines expire unused",
      solution: "AI-powered expiry tracking and redistribution network",
      impact: "Reduced waste by 65% in pilot areas"
    },
    {
      problem: "Unequal Access",
      stat: "68% rural population lacks medicine access",
      solution: "Hyperlocal distribution through verified networks",
      impact: "Improved access for 2.3M+ people"
    },
    {
      problem: "Cost Barriers",
      stat: "₹12,000 average monthly medicine cost",
      solution: "Free redistribution with doctor validation",
      impact: "₹45Cr+ worth medicines redistributed"
    }
];

export const pricingPlans = [
  {
      name: "Hope Starter",
      amount: 500,
      icon: Heart,
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "5 medicine packages redistributed",
        "Helps 2-3 families monthly",
        "Basic impact reports",
        "Community recognition"
      ],
      impact: "Covers medicine needs for 1 chronic patient for 1 month"
    },
    {
      name: "Life Saver",
      amount: 2500,
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      benefits: [
        "25 medicine packages redistributed",
        "Helps 10-12 families monthly",
        "Detailed impact analytics",
        "Priority donor support",
        "Tax benefit certificate"
      ],
      impact: "Covers medicine needs for 5 patients with chronic conditions",
      popular: true
    },
    {
      name: "Change Maker",
      amount: 10000,
      icon: Award,
      color: "from-purple-500 to-pink-500",
      benefits: [
        "100+ medicine packages redistributed",
        "Helps 40-50 families monthly",
        "Comprehensive impact dashboard",
        "Direct beneficiary connect",
        "Quarterly impact calls",
        "Special donor events access"
      ],
      impact: "Establishes a small medicine bank serving 20+ families regularly"
    },
    {
      name: "Revolution",
      amount: 25000,
      icon: Zap,
      color: "from-orange-500 to-red-500",
      benefits: [
        "250+ medicine packages redistributed",
        "Helps 100+ families monthly",
        "Real-time impact tracking",
        "Personal impact coordinator",
        "Monthly beneficiary stories",
        "Partnership opportunities",
        "Brand visibility options"
      ],
      impact: "Powers a community medicine center serving entire neighborhoods"
    }
];

export const impactMetrics = [
  { icon: Heart, value: "2.3M+", label: "Lives Impacted", color: "text-red-500" },
  { icon: Users, value: "150K+", label: "Active Donors", color: "text-blue-500" },
  { icon: DollarSign, value: "₹45Cr+", label: "Medicine Value Saved", color: "text-green-500" },
  { icon: Globe, value: "28", label: "States Covered", color: "text-purple-500" }
];

export const wastegeStats = [
  { 
    country: "Global", 
    waste: "$100B+", 
    percentage: "30-40%", 
    population: "7.8B",
    description: "Annual pharmaceutical waste globally"
  },
  { 
    country: "United States", 
    waste: "$5.8B", 
    percentage: "35%", 
    population: "331M",
    description: "Unused prescription medications yearly"
  },
  { 
    country: "India", 
    waste: "$2.1B", 
    percentage: "25-30%", 
    population: "1.4B",
    description: "Medicine wastage due to poor distribution"
  },
  { 
    country: "United Kingdom", 
    waste: "$400M", 
    percentage: "32%", 
    population: "67M",
    description: "NHS medicine waste annually"
  },
  { 
    country: "Germany", 
    waste: "$1.2B", 
    percentage: "28%", 
    population: "83M",
    description: "Pharmaceutical waste per year"
  },
  { 
    country: "Brazil", 
    waste: "$800M", 
    percentage: "40%", 
    population: "215M",
    description: "Medicine expiry and access issues"
  }
];

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

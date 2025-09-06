import { Zap, DollarSign, Award } from 'lucide-react';
import { Shield, Heart, Stethoscope, User, Users, Bell, MessageCircle, UserCheck, Globe, } from 'lucide-react';

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
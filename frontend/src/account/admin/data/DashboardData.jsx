import {
  Activity,
  Users,
  UserPlus,
  DollarSign,
  Package,
  MapPin,
  Handshake,
  CreditCard,
  BarChart3,
  Settings,
  Home,
  CheckCircle,
} from 'lucide-react';

export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'doctors', label: 'Doctors', icon: UserPlus },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'donations', label: 'Donations', icon: DollarSign },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'requests', label: 'Requests & Matches', icon: Handshake },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'partners', label: 'Partners', icon: Activity },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const statsData = [
  {
    title: 'Total Doctors',
    value: '1,55',
    change: '+12.5%',
    trend: 'up',
    icon: UserPlus,
    color: 'blue',
    period: 'vs last month'
  },
  {
    title: 'Active Users',
    value: '25,632',
    change: '+18.2%',
    trend: 'up',
    icon: Users,
    color: 'green',
    period: 'vs last month'
  },
  {
    title: 'Total Donations',
    value: '$2.4M',
    change: '+8.7%',
    trend: 'up',
    icon: DollarSign,
    color: 'purple',
    period: 'this quarter'
  },
  {
    title: 'Success Rate',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: CheckCircle,
    color: 'emerald',
    period: 'vs last period'
  }
];

export const recentActivity = [
  {
    id: 1,
    type: 'doctor',
    title: 'New Doctor Registered',
    description: 'Dr. Sarah Johnson joined as Cardiologist',
    time: '2 min ago',
    status: 'success',
    avatar: 'SJ'
  },
  {
    id: 2,
    type: 'donation',
    title: 'Large Donation Received',
    description: '$50,000 donated by MedCorp Foundation',
    time: '15 min ago',
    status: 'success',
    avatar: 'MC'
  },
  {
    id: 3,
    type: 'request',
    title: 'Urgent Blood Request',
    description: 'O- blood type needed at City Hospital',
    time: '1 hour ago',
    status: 'urgent',
    avatar: 'CH'
  },
  {
    id: 4,
    type: 'inventory',
    title: 'Low Stock Alert',
    description: 'Surgical masks below minimum threshold',
    time: '3 hours ago',
    status: 'warning',
    avatar: 'SM'
  }
];
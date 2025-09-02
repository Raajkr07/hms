import React from 'react';
import { Shield, Heart, Stethoscope, User, Users, Award, Bell, MessageCircle, UserCheck, Globe } from 'lucide-react';
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

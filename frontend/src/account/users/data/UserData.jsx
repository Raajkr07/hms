import { Star, PencilLine, Trash } from 'lucide-react';
import image1 from '../../../assets/user-avatar.png';
import medicineImage from '../data/medicine.png';

export const overviewCards = [
  {
    icon: '💸',
    title: 'Total Donation',
    value: '₹ 25,154',
    change: '35%',
    color: 'blue',
  },
  {
    icon: '📦',
    title: 'Total Orders',
    value: '6',
    change: '22%',
    color: 'blue',
  },
  {
    icon: '📅',
    title: 'Next Appointment',
    value: '25-10-2025',
    color: 'blue',
  },
  {
    icon: '💼',
    title: 'Active Prescriptions',
    value: '4',
    change: '9%',
    color: 'blue',
  },
];

export const overviewData = [
  { name: 'Jan', total: 400 },
  { name: 'Feb', total: 300 },
  { name: 'Mar', total: 200 },
  { name: 'Apr', total: 280 },
  { name: 'May', total: 200 },
  { name: 'Jun', total: 250 },
  { name: 'Jul', total: 350 },
];

export const recentDonationData = [
  {
    id: '1',
    name: 'Binod Kumar',
    email: 'binod@example.com',
    total: '200',
    image: image1,
  },
  {
    id: '2',
    name: 'Raj kumar',
    email: 'rajkumar07.dev@gmail.com',
    total: '500',
    image: image1,
  },
  {
    id: '3',
    name: 'Om singh',
    email: 'om@example.com',
    total: '300',
    image: image1,
  },
  {
    id: '4',
    name: 'Dinesh kumar',
    email: 'dinu@example.com',
    total: '450',
    image: image1,
  },
  {
    id: '5',
    name: 'Rahul kumar',
    email: 'rahul@example.com',
    total: '300',
    image: image1,
  },
  {
    id: '6',
    name: 'Mohan Kumar',
    email: 'mohan@example.com',
    total: '250',
    image: image1,
  },
  {
    id: '7',
    name: 'Eshan kumar',
    email: 'esha@example.com',
    total: '150',
    image: image1,
  },
  
];

export const topProducts = [
  {
    number: 1,
    name: 'Medicine One',
    description: 'Best selling product',
    price: 1450,
    status: 'Delivered',
    rating: 4.5,
    image: medicineImage,
  },
  {
    number: 2,
    name: 'Medicine Two',
    description: 'New arrival',
    price: 1180,
    status: 'Delivered',
    rating: 4.0,
    image: medicineImage,
  },
  {
    number: 3,
    name: 'Medicine Three',
    description: 'Limited stock available',
    price: 980,
    status: 'Shipped',
    rating: '',
    image: medicineImage,
  },
  {
    number: 4,
    name: 'Medicine Four',
    description: 'Popular choice',
    price: 1120,
    status: 'Delivered',
    rating: 4.7,
    image: medicineImage,
  },
  {
    number: 5,
    name: 'Medicine Five',
    description: 'Highly recommended',
    price: 1340,
    status: 'Processing',
    rating: '',
    image: medicineImage,
  },
  {
    number: 6,
    name: 'Medicine Six',
    description: 'Customer favorite',
    price: 1290,
    status: 'Shipped',
    rating: '',
    image: medicineImage,
  },
  {
    number: 7,
    name: 'Medicine Seven',
    description: 'Top rated',
    price: 1100,
    status: 'Delivered',
    rating: 4.8,
    image: medicineImage,
  },
  {
    number: 8,
    name: 'Medicine Eight',
    description: 'Staff pick',
    price: 1050,
    status: 'Cancelled',
    rating: '',
    image: medicineImage,
  },
  {
    number: 9,
    name: 'Medicine Nine',
    description: 'New stock arrived',
    price: 1195,
    status: 'Delivered',
    rating: 4.0,
    image: medicineImage,
  },
];


export { Star, PencilLine, Trash };
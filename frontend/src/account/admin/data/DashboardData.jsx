import { Star, PencilLine, Trash } from 'lucide-react';

export const overviewCards = [
  {
    icon: '📦',
    title: 'Total Products',
    value: '25,154',
    change: '25%',
    color: 'blue',
  },
  {
    icon: '💲',
    title: 'Total Paid Orders',
    value: '₹16,000',
    change: '12%',
    color: 'blue',
  },
  {
    icon: '👥',
    title: 'Total Customers',
    value: '15,400',
    change: '15%',
    color: 'blue',
  },
  {
    icon: '💳',
    title: 'Sales',
    value: '12,340',
    change: '19%',
    color: 'blue',
  },
];

export const overviewData = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 3000 },
  { name: 'Mar', total: 2000 },
  { name: 'Apr', total: 2780 },
  { name: 'May', total: 1890 },
  { name: 'Jun', total: 2390 },
  { name: 'Jul', total: 3490 },
];

export const recentSalesData = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    total: '230',
    image: '/images/users/alice.jpg',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    total: '520',
    image: '/images/users/bob.jpg',
  },
  // Add more sales data as needed...
];

export const topProducts = [
  {
    number: 1,
    name: 'Product One',
    description: 'Best selling product',
    price: 120,
    status: 'In stock',
    rating: 4.5,
    image: '/images/products/product1.jpg',
  },
  {
    number: 2,
    name: 'Product Two',
    description: 'New arrival',
    price: 95,
    status: 'Low stock',
    rating: 4.0,
    image: '/images/products/product2.jpg',
  },
  // Add more products as needed...
];

export { Star, PencilLine, Trash };
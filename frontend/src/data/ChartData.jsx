export const monthlyData = [
  { month: 'Jan', donations: 1956 },
  { month: 'Feb', donations: 2189 },
  { month: 'Mar', donations: 2256 },
  { month: 'Apr', donations: 2355 },
  { month: 'May', donations: 2486 },
  { month: 'Jun', donations: 2370 },
  { month: 'Jul', donations: 1900 },
  { month: 'Aug', donations: 1919 },
  { month: 'Sep', donations: 2600 },
  { month: 'Oct', donations: 2400 },
  { month: 'Nov', donations: 2156 },
  { month: 'Dec', donations: 2607 },
];

export const quarterlyData = [
  { quarter: 'Q1', donations: 8756 },
  { quarter: 'Q2', donations: 8675 },
  { quarter: 'Q3', donations: 9405 },
  { quarter: 'Q4', donations: 9914},
];

export const yearlyData = [
  { year: 2017, donations: 8100 },
  { year: 2018, donations: 9400 },
  { year: 2019, donations: 15605 },
  { year: 2020, donations: 25486 },
  { year: 2021, donations: 29758 },
  { year: 2022, donations: 32012 },
  { year: 2023, donations: 35750 },
  { year: 2024, donations: 36750 },
];

export const charts = [
  {
    id: 1,
    title: 'Monthly Donations (2024)',
    description: 'Spreading Hope Month by Month',
    data: monthlyData,
    xKey: 'month',
  },
  {
    id: 2,
    title: 'Quarterly Donations (2024)',
    description: 'Spreading Hope Quater by Quater',
    data: quarterlyData,
    xKey: 'quarter',
  },
  {
    id: 3,
    title: 'Yearly Donations',
    description: 'Spreading Hope Year on Year',
    data: yearlyData,
    xKey: 'year',
  },
];

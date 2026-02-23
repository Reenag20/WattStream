import type { Consumer, Bill, Complaint } from '@/lib/types';

export const consumers: Consumer[] = [
  {
    id: '1',
    consumerId: 'C-1001',
    name: 'Rajesh Kumar',
    address: '12, Shakti Nagar, Near Metro Station, Delhi - 110007',
    meterNumber: 'M-12345',
    tariff: 'Domestic',
    status: 'Active',
    email: 'rajesh.kumar@example.in',
    phone: '+91 98765 43210',
    joinedDate: '2022-01-15',
  },
  {
    id: '2',
    consumerId: 'C-1002',
    name: 'Priya Sharma',
    address: 'A-405, Green Meadows, Hiranandani, Powai, Mumbai - 400076',
    meterNumber: 'M-67890',
    tariff: 'Commercial',
    status: 'Active',
    email: 'priya.sharma@outlook.in',
    phone: '+91 87654 32109',
    joinedDate: '2021-11-20',
  },
  {
    id: '3',
    consumerId: 'C-1003',
    name: 'Bharat Heavy Electricals',
    address: 'Plot No. 45, Industrial Estate, Guindy, Chennai - 600032',
    meterNumber: 'M-54321',
    tariff: 'Industrial',
    status: 'Active',
    email: 'operations@bhel-corp.in',
    phone: '044-2234-5678',
    joinedDate: '2020-05-10',
  },
  {
    id: '4',
    consumerId: 'C-1004',
    name: 'Amit Patel',
    address: '23, Narayan Niwas, Navrangpura, Ahmedabad - 380009',
    meterNumber: 'M-13579',
    tariff: 'Domestic',
    status: 'Disconnected',
    email: 'amit.patel@gmail.com',
    phone: '+91 76543 21098',
    joinedDate: '2023-02-28',
  },
];

export const bills: Bill[] = [
  { id: 'b1', consumerId: '1', period: 'Jan 2024', reading: 1200, units: 150, amount: 750.0, dueDate: '2024-02-15', status: 'Paid' },
  { id: 'b2', consumerId: '1', period: 'Feb 2024', reading: 1380, units: 180, amount: 900.0, dueDate: '2024-03-15', status: 'Paid' },
  { id: 'b3', consumerId: '1', period: 'Mar 2024', reading: 1550, units: 170, amount: 850.0, dueDate: '2024-04-15', status: 'Pending' },
  { id: 'b4', consumerId: '2', period: 'Mar 2024', reading: 8500, units: 1200, amount: 9600.0, dueDate: '2024-04-20', status: 'Overdue' },
  { id: 'b5', consumerId: '3', period: 'Mar 2024', reading: 55000, units: 15000, amount: 150000.0, dueDate: '2024-04-25', status: 'Pending' },
];

export const complaints: Complaint[] = [
  { id: 'cmp1', consumerId: '2', consumerName: 'Priya Sharma', issue: 'Frequent voltage fluctuations during peak hours.', date: '2024-03-28', status: 'In Progress' },
  { id: 'cmp2', consumerId: '4', consumerName: 'Amit Patel', issue: 'Requested reconnection after full payment.', date: '2024-03-10', status: 'Resolved' },
  { id: 'cmp3', consumerId: '1', consumerName: 'Rajesh Kumar', issue: 'Electronic meter display is blurred.', date: '2024-04-02', status: 'Registered' },
];

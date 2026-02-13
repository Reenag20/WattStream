import type { Consumer, Bill, Complaint } from '@/lib/types';

export const consumers: Consumer[] = [
  {
    id: '1',
    consumerId: 'C-1001',
    name: 'John Doe',
    address: '123 Power Lane, Electro City, 12345',
    meterNumber: 'M-12345',
    tariff: 'Domestic',
    status: 'Active',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    joinedDate: '2022-01-15',
  },
  {
    id: '2',
    consumerId: 'C-1002',
    name: 'Jane Smith',
    address: '456 Voltage Ave, Sparkville, 67890',
    meterNumber: 'M-67890',
    tariff: 'Commercial',
    status: 'Active',
    email: 'jane.smith@example.com',
    phone: '234-567-8901',
    joinedDate: '2021-11-20',
  },
  {
    id: '3',
    consumerId: 'C-1003',
    name: 'Industrial Corp',
    address: '789 Circuit Rd, Industry Park, 54321',
    meterNumber: 'M-54321',
    tariff: 'Industrial',
    status: 'Active',
    email: 'contact@industrialcorp.com',
    phone: '345-678-9012',
    joinedDate: '2020-05-10',
  },
  {
    id: '4',
    consumerId: 'C-1004',
    name: 'Bob Johnson',
    address: '101 Fuse St, Resistor Town, 13579',
    meterNumber: 'M-13579',
    tariff: 'Domestic',
    status: 'Disconnected',
    email: 'bob.johnson@example.com',
    phone: '456-789-0123',
    joinedDate: '2023-02-28',
  },
];

export const bills: Bill[] = [
  { id: 'b1', consumerId: '1', period: 'Jan 2024', reading: 1200, units: 150, amount: 75.0, dueDate: '2024-02-15', status: 'Paid' },
  { id: 'b2', consumerId: '1', period: 'Feb 2024', reading: 1380, units: 180, amount: 90.0, dueDate: '2024-03-15', status: 'Paid' },
  { id: 'b3', consumerId: '1', period: 'Mar 2024', reading: 1550, units: 170, amount: 85.0, dueDate: '2024-04-15', status: 'Pending' },
  { id: 'b4', consumerId: '2', period: 'Mar 2024', reading: 8500, units: 1200, amount: 960.0, dueDate: '2024-04-20', status: 'Overdue' },
  { id: 'b5', consumerId: '3', period: 'Mar 2024', reading: 55000, units: 15000, amount: 15000.0, dueDate: '2024-04-25', status: 'Pending' },
];

export const complaints: Complaint[] = [
  { id: 'cmp1', consumerId: '2', consumerName: 'Jane Smith', issue: 'Frequent power outages in the evening.', date: '2024-03-28', status: 'In Progress' },
  { id: 'cmp2', consumerId: '4', consumerName: 'Bob Johnson', issue: 'Billing discrepancy for February.', date: '2024-03-10', status: 'Resolved' },
  { id: 'cmp3', consumerId: '1', consumerName: 'John Doe', issue: 'Meter reading seems incorrect.', date: '2024-04-02', status: 'Registered' },
];

export type Tariff = 'Domestic' | 'Commercial' | 'Industrial';

export type ConnectionStatus = 'Active' | 'Disconnected';

export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';

export type ComplaintStatus = 'Registered' | 'In Progress' | 'Resolved';

export interface Consumer {
  id: string;
  consumerId: string;
  name: string;
  address: string;
  meterNumber: string;
  tariff: Tariff;
  status: ConnectionStatus;
  email: string;
  phone: string;
  joinedDate: string;
}

export interface Bill {
  id: string;
  consumerId: string;
  period: string;
  reading: number;
  units: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

export interface Complaint {
  id: string;
  consumerId: string;
  consumerName: string;
  issue: string;
  date: string;
  status: ComplaintStatus;
}

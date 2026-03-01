import { User, Complaint, Bill, Announcement } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@apt.com', role: 'ADMIN' },
  { id: '2', name: 'John Doe', email: 'john@apt.com', role: 'RESIDENT', flatNumber: 'A-101' },
  { id: '3', name: 'Jane Smith', email: 'jane@apt.com', role: 'RESIDENT', flatNumber: 'B-202' },
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'c1',
    residentId: '2',
    residentName: 'John Doe',
    flatNumber: 'A-101',
    title: 'Leaking Pipe',
    description: 'The kitchen pipe is leaking since morning.',
    status: 'OPEN',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'c2',
    residentId: '3',
    residentName: 'Jane Smith',
    flatNumber: 'B-202',
    title: 'Elevator Not Working',
    description: 'Block B elevator is stuck on the 4th floor.',
    status: 'IN_PROGRESS',
    createdAt: '2024-03-01T11:30:00Z',
  },
];

export const MOCK_BILLS: Bill[] = [
  {
    id: 'b1',
    residentId: '2',
    residentName: 'John Doe',
    title: 'March Rent',
    amount: 1200,
    dueDate: '2024-03-10',
    status: 'PENDING',
    type: 'RENT',
  },
  {
    id: 'b2',
    residentId: '3',
    residentName: 'Jane Smith',
    title: 'Electricity Bill',
    amount: 150,
    dueDate: '2024-03-15',
    status: 'PAID',
    type: 'UTILITY',
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Water Supply Maintenance',
    content: 'Water supply will be suspended on Sunday from 10 AM to 2 PM for tank cleaning.',
    date: '2024-03-02',
    priority: 'HIGH',
  },
  {
    id: 'a2',
    title: 'Community Yoga Session',
    content: 'Join us for a community yoga session this Saturday at 7 AM in the park.',
    date: '2024-03-05',
    priority: 'LOW',
  },
];

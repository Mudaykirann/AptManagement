export type Role = 'ADMIN' | 'RESIDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  flatNumber?: string;
}

export type ComplaintStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface Complaint {
  id: string;
  residentId: string;
  residentName: string;
  flatNumber: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
}

export interface Bill {
  id: string;
  residentId: string;
  residentName: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING';
  type: 'RENT' | 'UTILITY' | 'MAINTENANCE';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

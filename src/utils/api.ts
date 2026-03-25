import axios from 'axios';
import type { User, Complaint, ComplaintStatus, Bill, Announcement } from '../types';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Need this to send httpOnly cookies
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('apt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for refresh token rotation
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === '/auth/login' || originalRequest.url === '/auth/refresh') {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        
        localStorage.setItem('apt_token', data.accessToken);
        localStorage.setItem('apt_user', JSON.stringify(data.user)); // Update user info just in case
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token died. Force logout.
        localStorage.removeItem('apt_token');
        localStorage.removeItem('apt_user');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// Auth
export async function loginUser(email: string, password: string, role: string): Promise<{ accessToken: string; user: User }> {
  const { data } = await api.post('/auth/login', { email, password, role });
  return data;
}

export async function signupUser(userData: { name: string, email: string, password: string, flatNumber: string }): Promise<{ accessToken: string; user: User }> {
  const { data } = await api.post('/auth/signup', userData);
  return data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}

// Users
export async function fetchUsers(role?: string): Promise<User[]> {
  const params = role ? { role } : {};
  const { data } = await api.get('/users', { params });
  return data;
}

export async function createUser(userData: any): Promise<User> {
  const { data } = await api.post('/users', userData);
  return data;
}

export async function updateUser(id: string, userData: any): Promise<User> {
  const { data } = await api.patch(`/users/${id}`, userData);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}

// Complaints
export async function fetchComplaints(residentId?: string): Promise<Complaint[]> {
  const params = residentId ? { residentId } : {};
  const { data } = await api.get('/complaints', { params });
  return data;
}

export async function createComplaint(title: string, description: string): Promise<Complaint> {
  const { data } = await api.post('/complaints', { title, description });
  return data;
}

export async function updateComplaintStatus(id: string, status: ComplaintStatus): Promise<Complaint> {
  const { data } = await api.patch(`/complaints/${id}`, { status });
  return data;
}

// Bills
export async function fetchBills(residentId?: string): Promise<Bill[]> {
  const params = residentId ? { residentId } : {};
  const { data } = await api.get('/bills', { params });
  return data;
}

export async function createBill(bill: {
  residentId: string;
  title: string;
  amount: number;
  dueDate: string;
  type: Bill['type'];
}): Promise<Bill> {
  const { data } = await api.post('/bills', bill);
  return data;
}

export async function payBill(id: string): Promise<Bill> {
  const { data } = await api.patch(`/bills/${id}/pay`);
  return data;
}

export async function deleteBill(id: string): Promise<void> {
  await api.delete(`/bills/${id}`);
}

// Announcements
export async function fetchAnnouncements(): Promise<Announcement[]> {
  const { data } = await api.get('/announcements');
  return data;
}

export async function createAnnouncement(announcement: {
  title: string;
  content: string;
  priority: Announcement['priority'];
}): Promise<Announcement> {
  const { data } = await api.post('/announcements', announcement);
  return data;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await api.delete(`/announcements/${id}`);
}

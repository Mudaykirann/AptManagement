import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Resident Pages
import ResidentDashboard from './pages/resident/ResidentDashboard';
import ResidentProfile from './pages/resident/ResidentProfile';
import ResidentComplaints from './pages/resident/ResidentComplaints';
import ResidentBills from './pages/resident/ResidentBills';
import ResidentAnnouncements from './pages/resident/ResidentAnnouncements';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageUsers from './pages/admin/AdminManageUsers';
import AdminManageComplaints from './pages/admin/AdminManageComplaints';
import AdminManageBills from './pages/admin/AdminManageBills';
import AdminManageAnnouncements from './pages/admin/AdminManageAnnouncements';

export default function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right" 
        containerStyle={{ zIndex: 999999 }}
        toastOptions={{ 
          className: 'text-sm font-bold text-slate-900 rounded-xl shadow-xl border border-slate-100',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#0f172a',
          }
        }} 
      />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Resident Routes */}
          <Route path="/resident" element={<Layout />}>
            <Route index element={<ResidentDashboard />} />
            <Route path="profile" element={<ResidentProfile />} />
            <Route path="complaints" element={<ResidentComplaints />} />
            <Route path="bills" element={<ResidentBills />} />
            <Route path="announcements" element={<ResidentAnnouncements />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminManageUsers />} />
            <Route path="complaints" element={<AdminManageComplaints />} />
            <Route path="bills" element={<AdminManageBills />} />
            <Route path="announcements" element={<AdminManageAnnouncements />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

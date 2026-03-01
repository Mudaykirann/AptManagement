import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';

// Resident Pages
import ResidentDashboard from './pages/resident/ResidentDashboard';
import ResidentComplaints from './pages/resident/ResidentComplaints';
import ResidentBills from './pages/resident/ResidentBills';
import ResidentAnnouncements from './pages/resident/ResidentAnnouncements';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageComplaints from './pages/admin/AdminManageComplaints';
import AdminManageBills from './pages/admin/AdminManageBills';
import AdminManageAnnouncements from './pages/admin/AdminManageAnnouncements';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Resident Routes */}
          <Route path="/resident" element={<Layout />}>
            <Route index element={<ResidentDashboard />} />
            <Route path="complaints" element={<ResidentComplaints />} />
            <Route path="bills" element={<ResidentBills />} />
            <Route path="announcements" element={<ResidentAnnouncements />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="complaints" element={<AdminManageComplaints />} />
            <Route path="bills" element={<AdminManageBills />} />
            <Route path="announcements" element={<AdminManageAnnouncements />} />
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

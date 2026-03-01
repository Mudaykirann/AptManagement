import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CreditCard, 
  Bell, 
  User as UserIcon, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/complaints', icon: MessageSquare, label: 'Manage Complaints' },
    { to: '/admin/bills', icon: CreditCard, label: 'Manage Bills' },
    { to: '/admin/announcements', icon: Bell, label: 'Announcements' },
  ];

  const residentLinks = [
    { to: '/resident', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/resident/complaints', icon: MessageSquare, label: 'Complaints' },
    { to: '/resident/bills', icon: CreditCard, label: 'Bills' },
    { to: '/resident/announcements', icon: Bell, label: 'Announcements' },
  ];

  const links = user?.role === 'ADMIN' ? adminLinks : residentLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-emerald-400">AptManage</h1>
            <button onClick={onClose} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                  isActive ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400"
                )}
                onClick={() => onClose()}
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                {user?.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

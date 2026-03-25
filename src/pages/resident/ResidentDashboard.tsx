import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchComplaints, fetchBills, fetchAnnouncements } from '../../utils/api';
import StatCard from '../../components/StatCard';
import { MessageSquare, CreditCard, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Complaint, Bill, Announcement } from '../../types';

const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [c, b, a] = await Promise.all([
          fetchComplaints(),
          fetchBills(),
          fetchAnnouncements(),
        ]);
        setComplaints(c);
        setBills(b);
        setAnnouncements(a);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const openComplaints = complaints.filter(c => c.status !== 'RESOLVED').length;
  const pendingBills = bills.filter(b => b.status === 'PENDING').length;
  const totalPendingAmount = bills
    .filter(b => b.status === 'PENDING')
    .reduce((sum, b) => sum + b.amount, 0);

  const latestAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome to your resident portal, {user?.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Open Complaints" 
          value={openComplaints} 
          icon={MessageSquare}
          iconClassName="bg-amber-50 text-amber-600"
        />
        <StatCard 
          title="Pending Bills" 
          value={pendingBills} 
          icon={CreditCard}
          iconClassName="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Total Outstanding" 
          value={`$${totalPendingAmount}`} 
          icon={CreditCard}
          iconClassName="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Announcements */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="text-emerald-500" size={20} />
              Latest Announcements
            </h2>
            <Link to="/resident/announcements" className="text-sm font-semibold text-emerald-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {latestAnnouncements.map(ann => (
              <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    ann.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {ann.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400">{ann.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{ann.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="text-amber-500" size={20} />
              My Complaints
            </h2>
            <Link to="/resident/complaints" className="text-sm font-semibold text-emerald-600 hover:underline flex items-center gap-1">
              Track issues <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {complaints.length > 0 ? (
              complaints.slice(0, 3).map(comp => (
                <div key={comp.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{comp.title}</h3>
                    <p className="text-xs text-slate-500">{new Date(comp.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                    comp.status === 'OPEN' ? 'bg-amber-100 text-amber-600' : 
                    comp.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {comp.status.replace('_', ' ')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-slate-400 text-sm">No complaints raised yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;

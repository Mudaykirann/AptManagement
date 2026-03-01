import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_COMPLAINTS, MOCK_BILLS, MOCK_USERS } from '../../utils/mockData';
import StatCard from '../../components/StatCard';
import { Users, MessageSquare, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const totalResidents = MOCK_USERS.filter(u => u.role === 'RESIDENT').length;
  const openComplaints = MOCK_COMPLAINTS.filter(c => c.status !== 'RESOLVED').length;
  const pendingPayments = MOCK_BILLS.filter(b => b.status === 'PENDING').length;
  const totalOutstanding = MOCK_BILLS
    .filter(b => b.status === 'PENDING')
    .reduce((sum, b) => sum + b.amount, 0);

  const recentComplaints = MOCK_COMPLAINTS.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Overview of community operations and resident requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Residents" 
          value={totalResidents} 
          icon={Users}
          iconClassName="bg-blue-50 text-blue-600"
          trend={{ value: '12%', isPositive: true }}
        />
        <StatCard 
          title="Open Complaints" 
          value={openComplaints} 
          icon={MessageSquare}
          iconClassName="bg-amber-50 text-amber-600"
          trend={{ value: '5%', isPositive: false }}
        />
        <StatCard 
          title="Pending Payments" 
          value={pendingPayments} 
          icon={CreditCard}
          iconClassName="bg-red-50 text-red-600"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${totalOutstanding}`} 
          icon={TrendingUp}
          iconClassName="bg-emerald-50 text-emerald-600"
          trend={{ value: '8%', isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Complaints */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Complaints</h2>
            <Link to="/admin/complaints" className="text-sm font-semibold text-emerald-600 hover:underline flex items-center gap-1">
              Manage all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resident</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentComplaints.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {comp.residentName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{comp.residentName}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider">{comp.flatNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{comp.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                        comp.status === 'OPEN' ? 'bg-amber-100 text-amber-600' : 
                        comp.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {comp.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/admin/bills" className="block p-4 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors group">
              <h3 className="font-bold text-emerald-900 group-hover:text-emerald-950">Generate Bills</h3>
              <p className="text-xs text-emerald-600 mt-1">Create monthly maintenance or utility bills for residents.</p>
            </Link>
            <Link to="/admin/announcements" className="block p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors group">
              <h3 className="font-bold text-blue-900 group-hover:text-blue-950">Post Announcement</h3>
              <p className="text-xs text-blue-600 mt-1">Broadcast important updates to all community members.</p>
            </Link>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-60 cursor-not-allowed">
              <h3 className="font-bold text-slate-900">Add Resident</h3>
              <p className="text-xs text-slate-500 mt-1">Register new flat owners or tenants in the system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

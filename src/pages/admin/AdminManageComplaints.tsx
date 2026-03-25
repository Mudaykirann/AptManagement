import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchComplaints, updateComplaintStatus as apiUpdateStatus } from '../../utils/api';
import { Complaint, ComplaintStatus } from '../../types';
import { Search, Filter, MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const AdminManageComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (err) {
        console.error('Failed to load complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateStatus = async (id: string, status: ComplaintStatus) => {
    try {
      const updated = await apiUpdateStatus(id, status);
      setComplaints(complaints.map(c => c.id === id ? updated : c));
      toast.success(`Complaint marked as ${status.replace('_', ' ')}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error('Failed to update complaint status.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Complaints</h1>
        <p className="text-slate-500">Review and update status of resident complaints.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by resident or issue..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resident</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaints.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                        {comp.residentName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{comp.residentName}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">{comp.flatNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-bold text-slate-900">{comp.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{comp.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5 w-fit ${
                      comp.status === 'OPEN' ? 'bg-amber-100 text-amber-600' : 
                      comp.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {comp.status === 'OPEN' && <AlertCircle size={12} />}
                      {comp.status === 'IN_PROGRESS' && <Clock size={12} />}
                      {comp.status === 'RESOLVED' && <CheckCircle2 size={12} />}
                      {comp.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {comp.status === 'OPEN' && (
                        <button 
                          onClick={() => updateStatus(comp.id, 'IN_PROGRESS')}
                          className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Start Work
                        </button>
                      )}
                      {comp.status === 'IN_PROGRESS' && (
                        <button 
                          onClick={() => updateStatus(comp.id, 'RESOLVED')}
                          className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                      {comp.status === 'RESOLVED' && (
                        <span className="text-xs font-medium text-slate-400 italic">No actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManageComplaints;

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchBills, createBill as apiCreateBill, deleteBill as apiDeleteBill, fetchUsers } from '../../utils/api';
import { Bill, User } from '../../types';
import { Plus, Search, CreditCard, Trash2, Edit2 } from 'lucide-react';

const AdminManageBills: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [residents, setResidents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBill, setNewBill] = useState({
    residentId: '',
    title: '',
    amount: '',
    dueDate: '',
    type: 'MAINTENANCE' as Bill['type']
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [b, u] = await Promise.all([
          fetchBills(),
          fetchUsers('RESIDENT'),
        ]);
        setBills(b);
        setResidents(u);
      } catch (err) {
        console.error('Failed to load bills:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddBill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bill = await apiCreateBill({
        residentId: newBill.residentId,
        title: newBill.title,
        amount: Number(newBill.amount),
        dueDate: newBill.dueDate,
        type: newBill.type,
      });
      setBills([bill, ...bills]);
      setIsModalOpen(false);
      setNewBill({ residentId: '', title: '', amount: '', dueDate: '', type: 'MAINTENANCE' });
      toast.success('Bill generated successfully!');
    } catch (err) {
      console.error('Failed to create bill:', err);
      toast.error('Failed to create bill. Please try again.');
    }
  };

  const handleDeleteBill = async (id: string) => {
    try {
      await apiDeleteBill(id);
      setBills(bills.filter(b => b.id !== id));
    } catch (err) {
      console.error('Failed to delete bill:', err);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Bills</h1>
          <p className="text-slate-500">Create and track resident payments.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
        >
          <Plus size={20} />
          Generate Bill
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by resident or bill title..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resident</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bill Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{bill.residentName}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">ID: {bill.residentId.slice(0,8)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{bill.title}</p>
                        <p className="text-xs text-slate-500">Due: {bill.dueDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">${bill.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                      bill.status === 'PAID' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteBill(bill.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Bill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Generate New Bill</h2>
            <form onSubmit={handleAddBill} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Resident</label>
                <select 
                  required
                  value={newBill.residentId}
                  onChange={(e) => setNewBill({ ...newBill, residentId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Select Resident</option>
                  {residents.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.flatNumber})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Bill Title</label>
                <input 
                  type="text" 
                  required
                  value={newBill.title}
                  onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
                  placeholder="e.g., Maintenance March 2024"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Amount ($)</label>
                  <input 
                    type="number" 
                    required
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Due Date</label>
                  <input 
                    type="date" 
                    required
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
                >
                  Create Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageBills;

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_BILLS } from '../../utils/mockData';
import { CreditCard, Download, ExternalLink } from 'lucide-react';
import { Bill } from '../../types';

const ResidentBills: React.FC = () => {
  const { user } = useAuth();
  const bills = MOCK_BILLS.filter(b => b.residentId === user?.id);

  const handleDownload = (bill: Bill) => {
    const content = `
AptManage - Receipt
-------------------
Bill ID: ${bill.id}
Title: ${bill.title}
Amount: $${bill.amount}
Type: ${bill.type}
Due Date: ${bill.dueDate}
Status: ${bill.status}
Resident: ${bill.residentName}
Date Generated: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${bill.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bills & Payments</h1>
        <p className="text-slate-500">View and pay your utility and maintenance bills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div key={bill.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${
                bill.type === 'RENT' ? 'bg-emerald-50 text-emerald-600' : 
                bill.type === 'UTILITY' ? 'bg-blue-50 text-blue-600' : 
                'bg-amber-50 text-amber-600'
              }`}>
                <CreditCard size={24} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                  bill.status === 'PAID' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}>
                  {bill.status}
                </span>
                {bill.status === 'PAID' && (
                  <button 
                    onClick={() => handleDownload(bill)}
                    className="text-emerald-600 hover:bg-emerald-50 p-1 rounded-md transition-colors"
                    title="Download Receipt"
                  >
                    <Download size={14} />
                  </button>
                )}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{bill.title}</h3>
            <p className="text-sm text-slate-500 mb-4">Due on {bill.dueDate}</p>
            
            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Amount</p>
                <p className="text-xl font-bold text-slate-900">${bill.amount}</p>
              </div>
              {bill.status === 'PENDING' ? (
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                  Pay Now
                </button>
              ) : (
                <button 
                  onClick={() => handleDownload(bill)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-all"
                  title="Download Receipt"
                >
                  <Download size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Payment History</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md">Access all your past transactions and download receipts for your records.</p>
          <button className="flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
            View full history <ExternalLink size={16} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </div>
    </div>
  );
};

export default ResidentBills;

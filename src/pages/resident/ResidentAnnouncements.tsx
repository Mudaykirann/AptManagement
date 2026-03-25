import React, { useState, useEffect } from 'react';
import { fetchAnnouncements } from '../../utils/api';
import { Announcement } from '../../types';
import { Bell, Calendar, Info } from 'lucide-react';

const ResidentAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to load announcements:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
        <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
        <p className="text-slate-500">Stay updated with the latest news from the management.</p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-6">
            <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${
              ann.priority === 'HIGH' ? 'bg-red-50 text-red-600' : 
              ann.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : 
              'bg-blue-50 text-blue-600'
            }`}>
              {ann.priority === 'HIGH' ? <Bell size={24} /> : <Info size={24} />}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900">{ann.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Calendar size={14} />
                  {ann.date}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">{ann.content}</p>
              
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  ann.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 
                  ann.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {ann.priority} Priority
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResidentAnnouncements;

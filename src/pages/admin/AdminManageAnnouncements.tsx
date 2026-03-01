import React, { useState } from 'react';
import { MOCK_ANNOUNCEMENTS } from '../../utils/mockData';
import { Announcement } from '../../types';
import { Plus, Bell, Trash2, Edit2, Calendar } from 'lucide-react';

const AdminManageAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    priority: 'LOW' as Announcement['priority']
  });

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const announcement: Announcement = {
      id: `a${Date.now()}`,
      title: newAnn.title,
      content: newAnn.content,
      date: new Date().toISOString().split('T')[0],
      priority: newAnn.priority,
    };

    setAnnouncements([announcement, ...announcements]);
    setIsModalOpen(false);
    setNewAnn({ title: '', content: '', priority: 'LOW' });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Announcements</h1>
          <p className="text-slate-500">Broadcast news and updates to all residents.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
        >
          <Plus size={20} />
          New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 group">
            <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${
              ann.priority === 'HIGH' ? 'bg-red-50 text-red-600' : 
              ann.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : 
              'bg-blue-50 text-blue-600'
            }`}>
              <Bell size={24} />
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
              
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  ann.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 
                  ann.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {ann.priority} Priority
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Post New Announcement</h2>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Title</label>
                <input 
                  type="text" 
                  required
                  value={newAnn.title}
                  onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                  placeholder="e.g., Scheduled Maintenance"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Content</label>
                <textarea 
                  required
                  rows={4}
                  value={newAnn.content}
                  onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                  placeholder="Write the announcement details..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['LOW', 'MEDIUM', 'HIGH'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewAnn({ ...newAnn, priority: p })}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        newAnn.priority === p 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
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
                  Post Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageAnnouncements;

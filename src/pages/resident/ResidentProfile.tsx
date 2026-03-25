import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { updateUser as apiUpdateUser } from '../../utils/api';
import { User, Mail, Home, Users, UploadCloud, FileText, Plus, Trash2, Camera } from 'lucide-react';

export default function ResidentProfile() {
  const { user, login } = useAuth(); // We'll manually update local state via AuthContext's user if needed, or window.location.reload

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    flatNumber: user?.flatNumber || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // UI-Only States
  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: 'Jane Doe', relation: 'Spouse', age: 34 },
    { id: '2', name: 'Jimmy Doe', relation: 'Child', age: 10 }
  ]);
  const [newMember, setNewMember] = useState({ name: '', relation: '', age: '' });
  const [showMemberForm, setShowMemberForm] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUpdating(true);
    try {
      const updatedUser = await apiUpdateUser(user.id, formData);
      // We must update localStorage so navbar reflects the new name without refreshing
      localStorage.setItem('apt_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully! Refresh to see changes globally.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.relation || !newMember.age) return;
    
    setFamilyMembers([...familyMembers, { 
      id: Math.random().toString(), 
      name: newMember.name, 
      relation: newMember.relation, 
      age: parseInt(newMember.age) 
    }]);
    setNewMember({ name: '', relation: '', age: '' });
    setShowMemberForm(false);
    toast.success('Family member added (UI Only)');
  };

  const removeMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
    toast.success('Member removed (UI Only)');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500">Manage your personal details, family members, and documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Info & Avatar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex flex-col items-center justify-center text-3xl font-bold mb-4 relative group cursor-pointer border-4 border-white shadow-lg shadow-emerald-100">
              {user?.name.charAt(0).toUpperCase()}
              <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
            <p className="text-sm font-medium text-emerald-600 mb-1">{user?.role}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
              <Home size={14} /> {user?.flatNumber}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-emerald-500" />
              Personal Details
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Flat Number</label>
                <input 
                  type="text" 
                  value={formData.flatNumber}
                  onChange={(e) => setFormData({...formData, flatNumber: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <button 
                type="submit" 
                disabled={isUpdating}
                className="w-full py-3 mt-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-70"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Family & Documents */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Family Members */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users size={20} className="text-emerald-500" />
                Family Members
              </h3>
              <button 
                onClick={() => setShowMemberForm(!showMemberForm)}
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                {showMemberForm ? 'Cancel' : <><Plus size={16}/> Add Member</>}
              </button>
            </div>

            {showMemberForm && (
              <form onSubmit={handleAddMember} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                  <input required type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500" placeholder="Member Name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Relation</label>
                  <input required type="text" value={newMember.relation} onChange={e => setNewMember({...newMember, relation: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500" placeholder="e.g. Spouse" />
                </div>
                <button type="submit" className="w-full py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors">
                  Save
                </button>
              </form>
            )}

            <div className="space-y-3">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{member.name}</h4>
                      <p className="text-xs text-slate-500">{member.relation}</p>
                    </div>
                  </div>
                  <button onClick={() => removeMember(member.id)} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Upload */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-emerald-500" />
              My Documents
            </h3>
            <p className="text-sm text-slate-500 mb-6">Securely upload and manage your sensitive apartment-related documents.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Document Card: ID Proof */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 hover:border-emerald-300 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">ID Proof</h4>
                <p className="text-xs text-slate-500">Aadhar, PAN, or Passport</p>
                <button className="mt-4 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-lg w-full" onClick={() => toast('Upload UI Clicked!', { icon: '📄' })}>
                  Upload File
                </button>
              </div>

              {/* Document Card: Rent Agreement */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 hover:border-emerald-300 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Rent Agreement</h4>
                <p className="text-xs text-slate-500">PDF copy of lease</p>
                <div className="mt-4 flex items-center justify-between px-3 py-1.5 bg-slate-100 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600 truncate flex-1 text-left">Lease_2024.pdf</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">VERIFIED</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

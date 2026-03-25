import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchUsers, createUser as apiCreateUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from '../../utils/api';
import { User } from '../../types';
import { Plus, Search, User as UserIcon, Trash2, Edit2, Mail, Home, Shield } from 'lucide-react';

const AdminManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'RESIDENT' as User['role'],
    flatNumber: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({ name: '', email: '', password: '', role: 'RESIDENT', flatNumber: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setIsEditMode(true);
    setEditingId(u.id);
    setFormData({ 
      name: u.name, 
      email: u.email, 
      password: '', // Kept empty for edit
      role: u.role, 
      flatNumber: u.flatNumber || '' 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && editingId) {
        // Update user
        const updateData: any = {
          name: formData.name,
          email: formData.email,
        };
        if (formData.flatNumber) updateData.flatNumber = formData.flatNumber;
        
        const updatedUser = await apiUpdateUser(editingId, updateData);
        setUsers(users.map(u => u.id === editingId ? updatedUser : u));
        toast.success(`User updated successfully`);
      } else {
        // Create user
        const newUser = await apiCreateUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          flatNumber: formData.flatNumber || undefined
        });
        setUsers([newUser, ...users]);
        toast.success(`${formData.role} created successfully`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to save user:', err);
      toast.error(err.response?.data?.error || 'Failed to save user');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to completely remove ${name} and all their related data?`)) return;
    
    try {
      await apiDeleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    } catch (err: any) {
      console.error('Failed to delete user:', err);
      toast.error(err.response?.data?.error || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.flatNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
          <p className="text-slate-500">Add, edit, and remove community residents and staff.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or flat number..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((u) => (
          <div key={u.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-xl font-bold group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                {u.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => openEditModal(u)}
                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(u.id, u.name)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{u.name}</h3>
            
            <span className={`inline-flex mb-4 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider items-center gap-1 ${
              u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {u.role === 'ADMIN' ? <Shield size={12} /> : <UserIcon size={12} />}
              {u.role}
            </span>

            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Home size={16} className="text-slate-400" />
                <span>{u.flatNumber || 'Config: N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-medium">No users found matching your search.</p>
        </div>
      )}

      {/* Unified Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {isEditMode ? 'Edit User Details' : 'Register New User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isEditMode && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Account Type</label>
                  <select 
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="RESIDENT">Resident</option>
                    <option value="ADMIN">System Admin</option>
                  </select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {formData.role === 'RESIDENT' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Flat/Apartment Number</label>
                  <input 
                    type="text"
                    required
                    value={formData.flatNumber}
                    onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })}
                    placeholder="e.g., A-101"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              )}

              {!isEditMode && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Initial Password</label>
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Set temporary password"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              )}

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
                  {isEditMode ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsers;

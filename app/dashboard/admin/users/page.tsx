'use client';

import RoleGuard from '../../../components/RoleGuard';
import { useState, useMemo } from 'react';
import { FaUserPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'PROPERTY_OWNER' | 'CUSTOMER';
  email: string;
  status: 'Active' | 'Inactive';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Alice Admin',
      role: 'ADMIN',
      email: 'alice@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Bob Manager',
      role: 'MANAGER',
      email: 'bob@example.com',
      status: 'Active',
    },
  ]);

  const [form, setForm] = useState<User>({
    id: 0,
    name: '',
    role: 'MANAGER',
    email: '',
    status: 'Active',
  });

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleSave = () => {
    if (!form.name || !form.email) return alert('Name and Email required');

    if (form.id) {
      setUsers((prev) => prev.map((u) => (u.id === form.id ? form : u)));
    } else {
      setUsers((prev) => [...prev, { ...form, id: prev.length + 1 }]);
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    if (id === 1) return alert('Admin account cannot be deleted');

    if (confirm('Delete user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const resetForm = () => {
    setForm({
      id: 0,
      name: '',
      role: 'MANAGER',
      email: '',
      status: 'Active',
    });

    setShowModal(false);
  };

  return (
    <RoleGuard allow={['ADMIN']}>
      <div className="p-8 min-h-screen bg-slate-50 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
              <FaUserPlus className="text-blue-600" />
              User Management
            </h1>

            <p className="text-sm text-slate-500">Manage system users access and roles</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-3 text-slate-400 text-sm" />

          <input
            className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm bg-white"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-center">Role</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 border rounded-lg text-xs">{u.role}</span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${
                        u.status === 'Active'
                          ? 'text-emerald-600 border-emerald-300 bg-emerald-50'
                          : 'text-rose-600 border-rose-300 bg-rose-50'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => {
                        setForm(u);
                        setShowModal(true);
                      }}
                      className="text-blue-600"
                    >
                      <FaEdit />
                    </button>

                    <button onClick={() => handleDelete(u.id)} className="text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">{form.id ? 'Update User' : 'Create User'}</h2>

              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg text-sm"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg text-sm"
              />

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as User['role'] })}
                className="w-full px-4 py-2 border rounded-lg text-sm"
              >
                <option>ADMIN</option>
                <option>MANAGER</option>
                <option>TECHNICIAN</option>
                <option>PROPERTY_OWNER</option>
                <option>CUSTOMER</option>
              </select>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as 'Active' | 'Inactive',
                  })
                }
                className="w-full px-4 py-2 border rounded-lg text-sm"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={resetForm} className="px-4 py-2 border rounded-lg text-sm">
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Save User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}

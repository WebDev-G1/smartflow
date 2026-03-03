'use client';

import { useState } from 'react';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Inactive';
};

const initialCustomers: Customer[] = [
  {
    id: 'CUS-001',
    name: 'Meera Silva',
    email: 'meera@gmail.com',
    phone: '0771234567',
    location: 'Colombo',
    status: 'Active',
  },
  {
    id: 'CUS-002',
    name: 'Nuwan Perera',
    email: 'nuwan@gmail.com',
    phone: '0719876543',
    location: 'Galle',
    status: 'Inactive',
  },
  {
    id: 'CUS-003',
    name: 'Kasun Fernando',
    email: 'kasun@gmail.com',
    phone: '0755555555',
    location: 'Kandy',
    status: 'Active',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const saveUpdate = () => {
    if (!editingCustomer) return;
    setCustomers((prev) => prev.map((c) => (c.id === editingCustomer.id ? editingCustomer : c)));
    setEditingCustomer(null);
  };

  const deleteCustomer = (id: string) => {
    if (confirm('Delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="p-8 min-h-full bg-gradient-to-br from-slate-50 to-slate-100 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500 text-sm">Manage your registered customers</p>
        </div>

        <div className="w-72">
          <input
            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm"
            placeholder="Search by name, email or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white  shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left"> Home Address</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-400">
                  No customers found
                </td>
              </tr>
            )}

            {paginated.map((c) => (
              <tr key={c.id} className="border-t hover:bg-slate-50 transition">
                <td className="px-6 py-4 flex items-center gap-4">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow">
                    {getInitials(c.name)}
                  </div>

                  <div>
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.email}</div>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {`+1 ${c.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}`}
                </td>
                <td className="px-6 py-4 text-slate-600">{c.location}</td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                      c.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => setEditingCustomer(c)}
                    className="px-4 py-2 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCustomer(c.id)}
                    className="px-4 py-2 text-xs rounded-md bg-rose-600 text-white hover:bg-rose-700 transition shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-500">
          Page {page} of {totalPages || 1}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg border bg-white shadow-sm text-sm disabled:opacity-40 hover:bg-slate-100"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg border bg-white shadow-sm text-sm disabled:opacity-40 hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* SIMPLE MODERN MODAL */}
      {editingCustomer && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setEditingCustomer(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white  shadow-lg p-6 space-y-6"
          >
            {/* Header */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Edit Customer</h2>
              <p className="text-sm text-slate-500">Update customer details</p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={editingCustomer.name}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={editingCustomer.email}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    email: e.target.value,
                  })
                }
              />

              <div className="flex">
                <span className="flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-sm text-slate-600">
                  +1
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2.5 rounded-r-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editingCustomer.phone}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      phone: e.target.value.replace(/\D/g, ''),
                    })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={editingCustomer.location}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    location: e.target.value,
                  })
                }
              />

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={editingCustomer.status}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    status: e.target.value as 'Active' | 'Inactive',
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingCustomer(null)}
                className="px-4 py-2 text-sm  border border-slate-300 hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveUpdate}
                className="px-4 py-2 text-sm  bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

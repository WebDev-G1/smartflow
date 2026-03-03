'use client';

import RoleGuard from '../../components/RoleGuard';
import { useState, useMemo } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus } from 'react-icons/fa';

type Vendor = {
  id: string;
  name: string;
  email: string;
  service: string;
  agreement?: string;
  status: 'Active' | 'Inactive';
};

const initialVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'CleanPro',
    email: 'cleanpro@gmail.com',
    service: 'Cleaning',
    agreement: 'cleanpro.pdf',
    status: 'Active',
  },
  {
    id: 'v2',
    name: 'FixItNow',
    email: 'fixit@gmail.com',
    service: 'Repairs',
    agreement: 'fixit.pdf',
    status: 'Active',
  },
];

export default function VendorsDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<any>(null);

  const filtered = useMemo(() => {
    return vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [vendors, search]);

  const saveVendor = (vendor: Vendor) => {
    if (modal?.type === 'add') {
      setVendors([...vendors, vendor]);
    } else {
      setVendors(vendors.map((v) => (v.id === vendor.id ? vendor : v)));
    }
    setModal(null);
  };

  const deleteVendor = (id: string) => {
    if (confirm('Delete vendor?')) {
      setVendors(vendors.filter((v) => v.id !== id));
    }
  };

  return (
    <RoleGuard allow={['ADMIN', 'MANAGER']}>
      <div className="p-8 bg-slate-50 min-h-screen space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Vendors</h1>
            <p className="text-sm text-slate-500">Manage vendor agreements and details</p>
          </div>

          <button
            onClick={() => setModal({ type: 'add' })}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Vendor
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search vendor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        />

        {/* TABLE */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-3 text-left">Vendor</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Agreement</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-t hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">{v.name}</td>

                  <td className="px-6 py-4 text-slate-600 text-sm">{v.email}</td>

                  <td className="px-6 py-4 text-slate-600 text-sm">{v.service}</td>

                  <td className="px-6 py-4 text-blue-600 text-xs underline cursor-pointer">
                    {v.agreement || 'No file'}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        v.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() => setModal({ type: 'view', vendor: v })}
                      className="text-slate-600 hover:text-blue-600"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => setModal({ type: 'edit', vendor: v })}
                      className="text-blue-600"
                    >
                      <FaEdit />
                    </button>

                    <button onClick={() => deleteVendor(v.id)} className="text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modal && (
          <VendorModal
            type={modal.type}
            vendor={modal.vendor}
            onClose={() => setModal(null)}
            onSave={saveVendor}
          />
        )}
      </div>
    </RoleGuard>
  );
}

//////////////////////////////////////////////////////
// MODAL SIMPLE MODERN STYLE
//////////////////////////////////////////////////////

function VendorModal({ type, vendor, onClose, onSave }: any) {
  const [name, setName] = useState(vendor?.name || '');
  const [email, setEmail] = useState(vendor?.email || '');
  const [service, setService] = useState(vendor?.service || 'Cleaning');
  const [status, setStatus] = useState(vendor?.status || 'Active');
  const [agreement, setAgreement] = useState(vendor?.agreement || '');

  const isView = type === 'view';

  const handleSubmit = () => {
    const id = vendor?.id || `v${Date.now()}`;

    onSave({
      id,
      name,
      email,
      service,
      status,
      agreement,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold capitalize">{type} Vendor</h2>

        <div className="space-y-4 text-sm">
          {isView ? (
            <>
              <p>Name : {name}</p>
              <p>Email : {email}</p>
              <p>Service : {service}</p>
              <p>Agreement : {agreement || 'No file'}</p>
              <p>Status : {status}</p>
            </>
          ) : (
            <>
              <input
                placeholder="Vendor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <input
                placeholder="Vendor Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option>Cleaning</option>
                <option>Repairs</option>
                <option>Maintenance</option>
                <option>Security</option>
              </select>

              <input
                type="file"
                onChange={(e: any) => setAgreement(e.target.files?.[0]?.name || '')}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm">
            Close
          </button>

          {!isView && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

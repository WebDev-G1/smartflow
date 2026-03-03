'use client';

import { useState, useMemo } from 'react';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSave,
  FaUpload,
  FaTimes,
  FaUserAlt,
  FaBriefcase,
  FaCog,
} from 'react-icons/fa';
import RoleGuard from '../../../components/RoleGuard';

// --- Types ---
type Job = {
  id: string;
  vendor: string;
  task: string;
  property: string;
  assignedDate: string;
  dueDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
};

// --- Dummy Data ---
const initialJobs: Job[] = [
  {
    id: 'j1',
    vendor: 'CleanPro',
    task: 'Monthly Cleaning',
    property: 'Sunset Apartments',
    assignedDate: '2026-01-20',
    dueDate: '2026-01-25',
    status: 'Scheduled',
    priority: 'High',
  },
  {
    id: 'j2',
    vendor: 'FixItNow',
    task: 'AC Repair',
    property: 'Skyline Tower',
    assignedDate: '2026-01-18',
    dueDate: '2026-01-22',
    status: 'In Progress',
    priority: 'Medium',
  },
];

export default function VendorSettings() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'settings'>('jobs');

  return (
    <RoleGuard allow={['MANAGER', 'ADMIN']}>
      <div className="p-4 md:p-8 space-y-6 bg-neutral-50 min-h-screen font-inter">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-neutral-900">Vendor Administration</h1>

          {/* Tab Switcher */}
          <div className="flex bg-neutral-200 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'jobs' ? 'bg-white shadow-sm text-blue-600' : 'text-neutral-600 hover:text-neutral-900'}`}
            >
              <FaBriefcase /> Jobs
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'settings' ? 'bg-white shadow-sm text-blue-600' : 'text-neutral-600 hover:text-neutral-900'}`}
            >
              <FaCog /> Settings
            </button>
          </div>
        </div>

        <hr className="border-neutral-200" />

        {activeTab === 'jobs' ? <VendorJobsTab /> : <VendorSettingsTab />}
      </div>
    </RoleGuard>
  );
}

// --- Sub-Component: Jobs Tab ---
function VendorJobsTab() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | Job['status']>('All');
  const [modal, setModal] = useState<{ type: 'view' | 'edit'; job: Job } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => (filterStatus === 'All' ? true : j.status === filterStatus))
      .filter(
        (j) =>
          j.vendor.toLowerCase().includes(search.toLowerCase()) ||
          j.task.toLowerCase().includes(search.toLowerCase())
      );
  }, [jobs, search, filterStatus]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredJobs.slice(start, start + perPage);
  }, [filteredJobs, currentPage]);

  const deleteJob = (id: string) => {
    if (confirm('Are you sure to delete this job?')) setJobs(jobs.filter((j) => j.id !== id));
  };

  const saveJob = (job: Job) => {
    setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
    setModal(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Vendor or Task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>All</option>
          <option>Scheduled</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600 font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Vendor</th>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Property</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {paginatedJobs.map((j) => (
              <tr key={j.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3 font-medium">{j.vendor}</td>
                <td className="px-4 py-3 text-neutral-600">{j.task}</td>
                <td className="px-4 py-3 text-neutral-600">{j.property}</td>
                <td className="px-4 py-3 text-neutral-600">{j.dueDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${
                      j.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : j.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {j.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => setModal({ type: 'view', job: j })}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setModal({ type: 'edit', job: j })}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteJob(j.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <JobModal
          job={modal.job}
          type={modal.type}
          onClose={() => setModal(null)}
          onSave={saveJob}
        />
      )}
    </div>
  );
}

// --- Sub-Component: Settings Tab ---
function VendorSettingsTab() {
  const [vendorName, setVendorName] = useState('CleanPro Services');
  const [email, setEmail] = useState('contact@cleanpro.com');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [servicesList, setServicesList] = useState([{ name: 'Cleaning', rate: 50 }]);

  const handleServiceChange = (index: number, key: 'name' | 'rate', value: any) => {
    const updated = [...servicesList];
    (updated[index] as any)[key] = value;
    setServicesList(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">General Information</h2>
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden border">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" />
              ) : (
                <FaUserAlt className="text-2xl text-neutral-400" />
              )}
            </div>
            <label className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer text-sm font-medium transition-colors">
              Change Photo
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && setPreviewUrl(URL.createObjectURL(e.target.files[0]))
                }
              />
            </label>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase">
                Vendor Name
              </label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full border-b py-1 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b py-1 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Business Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Services & Billing</h2>
          <div className="space-y-3">
            {servicesList.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => handleServiceChange(i, 'name', e.target.value)}
                  className="flex-1 border rounded px-3 py-1 text-sm"
                  placeholder="Service"
                />
                <input
                  type="number"
                  value={s.rate}
                  onChange={(e) => handleServiceChange(i, 'rate', e.target.value)}
                  className="w-20 border rounded px-3 py-1 text-sm"
                  placeholder="Rate"
                />
              </div>
            ))}
            <button
              onClick={() => setServicesList([...servicesList, { name: '', rate: 0 }])}
              className="text-sm text-blue-600 font-medium"
            >
              + Add Service
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => alert('Saved!')}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
        >
          <FaSave /> Save All Changes
        </button>
      </div>
    </div>
  );
}

// --- Helper Modal ---
function JobModal({ job, type, onClose, onSave }: any) {
  const [status, setStatus] = useState(job.status);
  const [priority, setPriority] = useState(job.priority);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">
          {type === 'view' ? 'Job Inspection' : 'Update Job'}
        </h2>
        <div className="space-y-3 text-sm">
          <p>
            <strong>Property:</strong> {job.property}
          </p>
          <p>
            <strong>Vendor:</strong> {job.vendor}
          </p>
          <p>
            <strong>Task:</strong> {job.task}
          </p>
          {type === 'edit' && (
            <div className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1">STATUS</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-neutral-600 font-medium">
            Cancel
          </button>
          {type === 'edit' && (
            <button
              onClick={() => onSave({ ...job, status, priority })}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

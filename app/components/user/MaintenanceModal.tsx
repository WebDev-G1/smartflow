'use client';
import { FaTimes, FaTools, FaHistory } from 'react-icons/fa';

export default function MaintenanceModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl shadow-2xl overflow-hidden border-t-4 border-[#eab308]">
        <div className="p-6 bg-gray-50 flex justify-between items-center border-b">
          <h2 className="font-black text-[#1e3a8a] uppercase text-sm tracking-widest flex items-center gap-2">
            <FaTools className="text-[#eab308]" /> Maintenance Center
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600">
            <FaTimes />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">
              Issue Description
            </label>
            <textarea
              className="w-full border-2 border-gray-100 p-4 text-xs font-bold focus:border-[#1e3a8a] outline-none h-32"
              placeholder="e.g. Kitchen sink is leaking..."
            ></textarea>
          </div>

          <button className="w-full bg-[#1e3a8a] text-white py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#eab308] hover:text-[#1e3a8a] transition-all">
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

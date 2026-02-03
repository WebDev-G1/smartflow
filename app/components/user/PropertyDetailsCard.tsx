'use client';
import React from 'react';
import {
  FaFileContract,
  FaHome,
  FaBolt,
  FaWater,
  FaWifi,
  FaMapMarkedAlt,
  FaLock,
} from 'react-icons/fa';

const PropertyDetailsCard = ({ userData, onViewMap }) => {
  return (
    <div className="bg-white p-8 shadow-sm space-y-6 border-2 border-gray-100 h-full flex flex-col">
      <h3 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest border-b pb-4 mb-2">
        Property Information
      </h3>

      <div className="space-y-4 flex-grow">
        <DetailItem
          icon={<FaMapMarkedAlt />}
          label="Physical Address"
          value={`${userData.property}, ${userData.unit}`}
        />
        <DetailItem icon={<FaHome />} label="Floor / Zone" value="4th Floor - East Wing" />
        <DetailItem icon={<FaFileContract />} label="Lease Status" value="Active (12 Months)" />

        {/* SMART STATUS SECTION */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-sm">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
              Smart Unit Status
            </p>
            <span className="text-[8px] text-green-600 font-black uppercase">Online</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[#1e3a8a]">
              <FaLock size={10} className="text-green-500" />
              <span className="text-[10px] font-black">Door Secured</span>
            </div>
            <p className="text-[10px] font-black text-[#1e3a8a]">Temp: 72°F</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-50">
        <p className="text-[9px] font-black text-gray-400 uppercase mb-3 tracking-widest text-center">
          Utilities Included
        </p>
        <div className="flex gap-4 justify-center mb-6">
          <UtilityBadge icon={<FaBolt />} active={true} title="Power" />
          <UtilityBadge icon={<FaWater />} active={true} title="Water" />
          <UtilityBadge icon={<FaWifi />} active={false} title="Fiber" />
        </div>

        <button
          onClick={onViewMap}
          className="w-full text-center py-3 text-[9px] font-black text-[#1e3a8a] uppercase border-2 border-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          View Building Map
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="text-[#eab308] w-5">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{label}</p>
      <p className="text-xs font-bold text-[#1e3a8a] uppercase leading-tight">{value}</p>
    </div>
  </div>
);

const UtilityBadge = ({ icon, active, title }) => (
  <div
    title={title}
    className={`p-2.5 rounded-sm border transition-all ${active ? 'bg-blue-50 border-blue-100 text-[#1e3a8a]' : 'bg-gray-50 border-gray-100 text-gray-300'}`}
  >
    {icon}
  </div>
);

export default PropertyDetailsCard;

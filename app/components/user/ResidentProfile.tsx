'use client';
import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import UpdateProfileModal from '../user/UpdateProfileModal';

const ResidentProfile = ({ userData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentName, setCurrentName] = useState(userData.name);

  return (
    <div className="bg-white p-8 border-2 border-gray-100 shadow-sm sticky top-24">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-300 border-2 border-gray-50">
          <FaUserCircle size={80} />
        </div>
        <h2 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tighter">
          {currentName}
        </h2>
        <p className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest mt-1">
          Resident • {userData.unit}
        </p>
      </div>

      <div className="space-y-5 border-t border-gray-50 pt-6">
        <ProfileItem icon={<FaEnvelope />} label="Email Address" value={userData.email} />
        <ProfileItem icon={<FaPhoneAlt />} label="Phone Number" value={userData.phone} />
        <ProfileItem icon={<FaMapMarkerAlt />} label="Property" value={userData.property} />
      </div>

      <div className="mt-8 bg-[#1e3a8a] p-5 text-white border-l-4 border-[#FFB800]">
        <p className="text-[9px] font-black uppercase opacity-70">Monthly Rent Payment</p>
        <p className="text-2xl font-black">${userData.balance.toFixed(2)}</p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-6 py-3 border-2 border-[#1e3a8a] text-[#1e3a8a] text-[10px] font-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white transition-all active:scale-95"
      >
        Update Profile
      </button>

      {/* POPUP MODAL */}
      {isModalOpen && (
        <UpdateProfileModal
          userData={userData}
          onClose={() => setIsModalOpen(false)}
          onSave={(updated) => {
            console.log(updated);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

const ProfileItem = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-4">
    <div className="text-gray-300 w-5">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{label}</p>
      <p className="text-[11px] font-bold text-[#1e3a8a]">{value}</p>
    </div>
  </div>
);

export default ResidentProfile;

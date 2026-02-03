'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResidentProfile from '../components/user/ResidentProfile'; // New Import
import PaymentModal from '../components/user/PaymentModal';
import MaintenanceModal from '../components/user/MaintenanceModal';
import PaymentHistory from '../components/user/PaymentHistory';
import PropertyDetailsCard from '../components/user/PropertyDetailsCard';

import {
  FaPlus,
  FaExclamationTriangle,
  FaTimes,
  FaBoxOpen,
  FaChartLine,
  FaShieldAlt,
} from 'react-icons/fa';

const UserDashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [userData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-1234',
    property: 'Sunset Apartments',
    unit: 'Unit 402',
    rentDue: 'Feb 01, 2026',
    balance: 1200.0,
    leaseEnd: 'Dec 31, 2026',
    parking: 'P-104 (Level 2)',
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ResidentProfile userData={userData} />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatusBadge
                icon={<FaBoxOpen />}
                label="Packages"
                value="2 Waiting"
                color="text-gray-900 bg-gray-50 border-gray-200"
                iconColor="text-[#FFB800]"
              />
              <StatusBadge
                icon={<FaChartLine />}
                label="Utilities"
                value="On Track"
                color="text-[#1E3A8A] bg-white border-gray-200 shadow-sm"
                iconColor="text-[#1E3A8A]"
              />
              <StatusBadge
                icon={<FaShieldAlt />}
                label="Security"
                value="System Armed"
                color="text-white bg-[#1E3A8A] border-[#1E3A8A]"
                iconColor="text-[#FFB800]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-[#1e3a8a] font-black text-[10px] uppercase tracking-[0.2em]">
                Quick Management
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 shadow-xl border-t-4 border-[#FFB800]">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Rent Payment
                  </p>
                  <h3 className="text-lg font-black text-[#1e3a8a] uppercase mb-4">
                    Due: {userData.rentDue}
                  </h3>
                  <button
                    onClick={() => setActiveModal('payment')}
                    className="w-full bg-[#1e3a8a] text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-[#1e3a8a] transition-all shadow-lg active:scale-95"
                  >
                    Pay Rent Now
                  </button>
                </div>

                <div className="bg-white p-6 shadow-xl border-t-4 border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Service Request
                  </p>
                  <h3 className="text-lg font-black text-[#1e3a8a] uppercase mb-4">
                    1 Active Ticket
                  </h3>
                  <button
                    onClick={() => setActiveModal('maintenance')}
                    className="w-full border-2 border-[#1e3a8a] text-[#1e3a8a] py-3.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <FaPlus size={10} /> New Request
                  </button>
                </div>
              </div>
            </div>

            <PaymentHistory onViewAll={() => setActiveModal('history')} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PropertyDetailsCard userData={userData} onViewMap={() => setActiveModal('map')} />
              <div className="bg-[#1e3a8a] p-8 text-white relative overflow-hidden flex flex-col justify-center min-h-[200px]">
                <FaExclamationTriangle className="absolute -right-4 -bottom-4 text-white/5 text-8xl" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB800] mb-2">
                  Emergency Hotline
                </p>
                <p className="text-sm font-bold leading-tight mb-6">
                  Immediate assistance for fire, medical, or lockout emergencies.
                </p>
                <button className="bg-white text-[#1e3a8a] px-8 py-3 text-[10px] font-black uppercase hover:bg-[#FFB800] transition-colors relative z-10 shadow-lg">
                  Call Now: (555) 911-0000
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL SYSTEM */}
      {activeModal === 'payment' && (
        <PaymentModal isOpen={true} userData={userData} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'maintenance' && (
        <MaintenanceModal isOpen={true} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'history' && <HistoryModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'map' && <MapModal onClose={() => setActiveModal(null)} />}

      <Footer />
    </div>
  );
};

// Remaining StatusBadge Helper
const StatusBadge = ({
  icon,
  label,
  value,
  color,
  iconColor,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
  iconColor?: string;
}) => (
  <div
    className={`p-4 border rounded-sm flex items-center gap-3 ${color} transition-transform hover:scale-[1.02] cursor-default`}
  >
    <div className={`text-xl ${iconColor || 'opacity-80'}`}>{icon}</div>
    <div>
      <p className="text-[8px] font-black uppercase opacity-70 tracking-tighter">{label}</p>
      <p className="text-[11px] font-black uppercase leading-none">{value}</p>
    </div>
  </div>
);

const HistoryModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border-t-4 border-[#FFB800] relative">
      <div className="p-6 border-b flex justify-between items-center bg-gray-50">
        <h2 className="font-black text-[#1e3a8a] uppercase tracking-widest text-sm">
          Transaction Ledger
        </h2>
        <button onClick={onClose} className="text-[#1e3a8a] hover:text-[#FFB800] transition-colors">
          <FaTimes size={20} />
        </button>
      </div>
      <div className="p-6 overflow-y-auto bg-white">
        <PaymentHistory hideViewAll={true} />
      </div>
    </div>
  </div>
);

const MapModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-3xl shadow-2xl overflow-hidden border-t-8 border-[#FFB800]">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">
          Building Site Plan
        </h2>
        <button
          onClick={onClose}
          className="text-[#1e3a8a] font-black text-[10px] uppercase hover:text-[#FFB800]"
        >
          Close Map
        </button>
      </div>
      <div className="p-12 bg-gray-50 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 font-bold uppercase text-[10px]">
          Building Map Visual Here
        </div>
      </div>
    </div>
  </div>
);

export default UserDashboard;

'use client';

import React, { useState, useEffect } from 'react';
import {
  FaCreditCard,
  FaUniversity,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaCopy,
  FaUpload,
} from 'react-icons/fa';

interface UserData {
  balance: number;
  unit: string;
  property: string;
  rentDue: string;
  name?: string;
  email?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

type Step = 'registration' | 'selection' | 'stripe' | 'bank' | 'success';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, userData }) => {
  const [step, setStep] = useState<Step>('registration');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buyerData, setBuyerData] = useState({
    name: userData.name || '',
    email: userData.email || '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('registration');
      setIsLoading(false);
    }
  }, [isOpen]);

  const simulateSubmit = (nextStep: Step) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 1800);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('registration');
    onClose();
  };

  const stepIndex: Record<Step, number> = {
    registration: 0,
    selection: 1,
    stripe: 2,
    bank: 2,
    success: 3,
  };
  const currentProgress = (stepIndex[step] / 3) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm transition-all font-sans">
      <div className="bg-white w-full max-w-lg rounded-t-xl md:rounded-sm shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 md:zoom-in duration-300 max-h-[95vh] flex flex-col">
        {/* PROGRESS BAR */}
        <div className="h-1 bg-gray-100 w-full shrink-0">
          <div
            className="h-full bg-[#FFB800] transition-all duration-500"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* HEADER */}
        <div className="bg-[#1E3A8A] p-5 md:p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-black uppercase tracking-widest text-sm md:text-lg leading-tight">
              {step === 'success' ? 'Confirmed' : 'Payment Portal'}
            </h3>
            <p className="text-[9px] md:text-[10px] opacity-70 uppercase font-bold">
              {userData.unit} • {userData.property}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-[#FFB800] p-2 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* BUYER BAR */}
        {step !== 'registration' && step !== 'success' && (
          <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center animate-in slide-in-from-top duration-300">
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-black text-[#1E3A8A] uppercase">
                <FaUser size={10} /> {buyerData.name}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                <FaEnvelope size={10} /> {buyerData.email}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 overflow-y-auto">
          {/* REGISTRATION */}
          {step === 'registration' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('selection');
              }}
              className="space-y-6"
            >
              <div className="border-b-2 border-gray-100 pb-3">
                <h3 className="text-lg md:text-xl font-black text-[#1E3A8A] uppercase tracking-tighter">
                  Registration
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                  Verify your details
                </p>
              </div>
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  required
                  value={buyerData.name}
                  onChange={(e: any) => setBuyerData({ ...buyerData, name: e.target.value })}
                />
                <InputField
                  label="Email Address"
                  type="email"
                  required
                  value={buyerData.email}
                  onChange={(e: any) => setBuyerData({ ...buyerData, email: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFB800] text-white py-4 font-black uppercase text-[11px] tracking-widest shadow-lg flex items-center justify-center gap-2"
              >
                Continue <FaChevronRight size={10} />
              </button>
            </form>
          )}

          {/* SELECTION */}
          {step === 'selection' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 gap-3">
                <PaymentOption
                  icon={<FaCreditCard />}
                  title="Stripe Checkout"
                  subtitle="Card Payment"
                  onClick={() => setStep('stripe')}
                />
                <PaymentOption
                  icon={<FaUniversity />}
                  title="Direct Transfer"
                  subtitle="Bank Wire"
                  onClick={() => setStep('bank')}
                />
              </div>
              <div className="bg-[#1E3A8A] p-5 text-white flex justify-between items-center rounded-sm">
                <div>
                  <p className="text-[8px] font-bold uppercase opacity-60">Amount Due</p>
                  <p className="text-xl font-black">${userData.balance.toLocaleString()}</p>
                </div>
                <p className="text-xs font-black uppercase">{userData.rentDue}</p>
              </div>
            </div>
          )}

          {/*STRIPE  */}
          {step === 'stripe' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-[#F0F7FF] py-12 px-6 border border-[#E0EFFF] rounded-sm text-center">
                <FaCreditCard className="mx-auto text-4xl text-[#1E3A8A] mb-4" />
                <h4 className="font-black uppercase text-lg text-black tracking-tight">
                  Pay With Stripe
                </h4>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  Secure checkout for ${userData.balance.toLocaleString()}.
                </p>
              </div>

              <button
                onClick={() => simulateSubmit('success')}
                disabled={isLoading}
                className="w-full bg-[#1E3A8A] text-white py-5 font-black uppercase text-xs tracking-[0.15em] shadow-lg active:scale-[0.98] transition-all flex justify-center items-center"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Proceed To Checkout'}
              </button>
            </div>
          )}

          {/*  BANK TRANSFER */}
          {step === 'bank' && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-gray-50 p-5 border-2 border-dashed border-gray-200 font-mono text-[11px] space-y-2">
                <BankRow label="Bank" value="US FEDERAL TRUST" />
                <BankRow
                  label="Account"
                  value="9876543210"
                  onCopy={() => navigator.clipboard.writeText('9876543210')}
                />
                <div className="bg-blue-50 p-2 border-l-4 border-[#1E3A8A] mt-2">
                  <span className="text-[8px] font-black uppercase text-gray-400 block">
                    Reference
                  </span>
                  <span className="font-black text-[#1E3A8A]">
                    RENT-{userData.unit.replace(/\s+/g, '')}
                  </span>
                </div>
              </div>
              <label
                className={`w-full h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${selectedFile ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-200 text-gray-400'}`}
              >
                <FaUpload />
                <span className="text-[9px] font-black uppercase mt-2">
                  {selectedFile ? selectedFile.name : 'Upload Receipt'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e: any) => setSelectedFile(e.target.files[0])}
                />
              </label>
              <button
                onClick={() => simulateSubmit('success')}
                disabled={isLoading || !selectedFile}
                className="w-full bg-[#1E3A8A] text-white py-4 font-black uppercase text-[10px] tracking-widest disabled:opacity-50"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Confirm Transfer'}
              </button>
            </div>
          )}

          {/* SUCCESS */}
          {step === 'success' && (
            <div className="py-10 text-center space-y-6 animate-in zoom-in duration-500">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
              <h4 className="text-2xl font-black uppercase text-[#1E3A8A]">Success</h4>
              <button
                onClick={handleClose}
                className="bg-[#1E3A8A] text-white px-12 py-4 font-black uppercase text-[10px] tracking-widest"
              >
                Done
              </button>
            </div>
          )}

          {/* NAVIGATION FOOTER */}
          {step !== 'registration' && step !== 'success' && !isLoading && (
            <button
              onClick={() => setStep('selection')}
              className="mt-8 text-[10px] font-black uppercase text-gray-400 hover:text-[#1E3A8A] flex items-center gap-1 mx-auto transition-colors"
            >
              ← Change Method
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest">{label}</label>
    <input
      {...props}
      className="w-full border-2 border-gray-100 p-4 text-xs font-bold uppercase focus:border-[#1E3A8A] outline-none bg-gray-50 rounded-sm"
    />
  </div>
);

const BankRow = ({ label, value, onCopy }: any) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-1">
    <span className="text-gray-400 uppercase text-[9px] font-sans">{label}:</span>
    <div className="flex items-center gap-2">
      <span className="text-gray-800 font-bold">{value}</span>
      {onCopy && (
        <button onClick={onCopy} className="text-gray-300 hover:text-[#1E3A8A]">
          <FaCopy size={10} />
        </button>
      )}
    </div>
  </div>
);

const PaymentOption = ({ icon, title, subtitle, onClick }: any) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between p-5 border-2 border-gray-50 hover:border-[#FFB800] transition-all group rounded-sm w-full text-left"
  >
    <div className="flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <div>
        <span className="block font-black uppercase text-[11px] text-[#1E3A8A]">{title}</span>
        <span className="block text-[9px] text-gray-400 font-bold uppercase">{subtitle}</span>
      </div>
    </div>
    <FaChevronRight size={12} className="text-gray-300 group-hover:text-[#1E3A8A]" />
  </button>
);

export default PaymentModal;

'use client';
import React, { useState } from 'react';
import {
  FaCreditCard,
  FaUniversity,
  FaShieldAlt,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaLock,
} from 'react-icons/fa';

const PaymentModal = ({ userData, onClose }) => {
  const [step, setStep] = useState('selection');
  const [isLoading, setIsLoading] = useState(false);

  const simulateSubmit = (nextStep) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 1500);
  };

  const stepIndex = { selection: 1, stripe: 2, bank: 2, success: 3 };
  const currentProgress = (stepIndex[step] / 3) * 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#1e3a8a]/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg shadow-2xl overflow-hidden flex flex-col border-t-8 border-[#1e3a8a]">
        {/* PROGRESS BAR */}
        <div className="h-1 bg-gray-100 w-full">
          <div
            className="h-full bg-[#eab308] transition-all duration-500"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-black uppercase tracking-widest text-[#1e3a8a] text-sm">
              {step === 'success' ? 'Payment Confirmed' : 'Rent Payment Portal'}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
              Unit: {userData.unit} • Balance: ${userData.balance.toFixed(2)}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition-colors">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="p-8">
          {/* SELECTION */}
          {step === 'selection' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">
                Choose Payment Method
              </p>
              <PaymentOption
                icon={<FaCreditCard />}
                title="Stripe Checkout"
                subtitle="Credit/Debit Card (Instant)"
                onClick={() => setStep('stripe')}
              />
              <PaymentOption
                icon={<FaUniversity />}
                title="Bank Transfer"
                subtitle="ACH / Wire Transfer"
                onClick={() => setStep('bank')}
              />
            </div>
          )}

          {/* STRIPE CHECKOUT BRIDGE */}
          {step === 'stripe' && (
            <div className="text-center py-4 space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-50 p-8 border border-blue-100 rounded-sm">
                <FaCreditCard className="mx-auto text-4xl text-[#1e3a8a] mb-4" />
                <h4 className="font-black uppercase text-sm text-[#1e3a8a]">
                  Secure Stripe Gateway
                </h4>
                <p className="text-[10px] text-gray-500 mt-2 leading-relaxed uppercase font-bold">
                  You are about to pay{' '}
                  <span className="text-[#1e3a8a]">${userData.balance.toFixed(2)}</span> via
                  encrypted card processing.
                </p>
              </div>
              <button
                onClick={() => simulateSubmit('success')}
                disabled={isLoading}
                className="w-full bg-[#6366f1] text-white py-4 font-black uppercase text-[11px] tracking-[0.2em] flex justify-center items-center gap-3 shadow-xl active:scale-95 transition-all"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    Complete Stripe Payment <FaLock size={10} />
                  </>
                )}
              </button>
              <button
                onClick={() => setStep('selection')}
                className="text-[9px] font-black text-gray-400 uppercase tracking-widest"
              >
                ← Go Back
              </button>
            </div>
          )}

          {/* BANK DETAILS */}
          {step === 'bank' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-gray-50 p-5 border-2 border-dashed border-gray-200 text-[11px] font-mono text-[#1e3a8a]">
                <p className="mb-2">
                  <span className="text-gray-400 font-sans uppercase text-[9px]">Bank:</span>{' '}
                  Federal Trust NY
                </p>
                <p className="mb-2">
                  <span className="text-gray-400 font-sans uppercase text-[9px]">Account:</span>{' '}
                  **** 8910
                </p>
                <p>
                  <span className="text-gray-400 font-sans uppercase text-[9px]">Reference:</span>{' '}
                  RENT-{userData.unit.replace(' ', '')}
                </p>
              </div>
              <button
                onClick={() => simulateSubmit('success')}
                className="w-full bg-[#1e3a8a] text-white py-4 font-black uppercase text-[10px] tracking-widest"
              >
                Confirm Bank Transfer
              </button>
              <button
                onClick={() => setStep('selection')}
                className="w-full text-[9px] font-black text-gray-400 uppercase tracking-widest"
              >
                ← Go Back
              </button>
            </div>
          )}

          {/* SUCCESS */}
          {step === 'success' && (
            <div className="py-10 text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <FaCheckCircle className="text-green-500 text-5xl" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-[#1e3a8a]">Payment Successful</h4>
                <p className="text-gray-400 text-[10px] font-bold uppercase mt-2">
                  A digital receipt has been sent to your email.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#eab308] text-[#1e3a8a] px-12 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-[#1e3a8a] hover:text-white transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentOption = ({ icon, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between p-5 border-2 border-gray-50 hover:border-[#eab308] active:bg-blue-50 transition-all group rounded-sm w-full text-left"
  >
    <div className="flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <span className="block font-black uppercase text-[11px] tracking-tight text-[#1e3a8a]">
          {title}
        </span>
        <span className="block text-[9px] text-gray-400 font-bold uppercase">{subtitle}</span>
      </div>
    </div>
    <FaChevronRight className="text-gray-300 group-hover:text-[#eab308] transition-transform" />
  </button>
);

export default PaymentModal;

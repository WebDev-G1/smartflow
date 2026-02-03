'use client';
import React from 'react';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';

const PaymentHistory = ({ onViewAll, isFullView }) => {
  const history = [
    { id: 1, date: 'JAN 01, 2026', desc: 'JANUARY RENT', amount: 1200.0, status: 'PAID' },
    { id: 2, date: 'DEC 01, 2025', desc: 'DECEMBER RENT', amount: 1200.0, status: 'PAID' },
    { id: 3, date: 'NOV 01, 2025', desc: 'NOVEMBER RENT', amount: 1200.0, status: 'PAID' },
  ];

  return (
    <div
      className={`bg-white shadow-sm border border-gray-100 overflow-hidden ${isFullView ? 'border-none shadow-none' : ''}`}
    >
      {!isFullView && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">
            Monthly Payment History
          </h3>
          <button
            onClick={onViewAll}
            className="text-[9px] font-black text-[#1e3a8a] uppercase border-b-2 border-[#eab308] hover:text-[#eab308] transition-all"
          >
            View All
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400">Date</th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400">
                Description
              </th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400">Amount</th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-[11px] font-bold">
            {history.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4 text-gray-500 uppercase">{item.date}</td>
                <td className="px-6 py-4 text-[#1e3a8a] uppercase">{item.desc}</td>
                <td className="px-6 py-4 text-[#1e3a8a] font-black">${item.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <span className="text-green-600 bg-green-50 px-2 py-0.5 text-[9px] font-black uppercase border border-green-100 flex items-center gap-1">
                    <FaCheckCircle size={8} /> {item.status}
                  </span>
                  <button className="text-gray-300 group-hover:text-[#eab308] transition-colors">
                    <FaDownload size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

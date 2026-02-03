'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaSave, FaCamera, FaUserCircle } from 'react-icons/fa';

const UpdateProfileModal = ({ userData, onClose, onSave }: any) => {
  const [name, setName] = useState(userData?.name || '');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted || !userData) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const modalHTML = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white w-full max-w-[440px] shadow-[0_35px_100px_-15px_rgba(0,0,0,0.6)] overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
        <div className="bg-[#1e3a8a] border-t-4 border-[#eab308] p-5 flex justify-between items-center">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
            Account Settings
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-all">
            <FaTimes size={18} />
          </button>
        </div>

        <form
          className="p-8 space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ name, profileImage: previewImage || userData.image });
            onClose();
          }}
        >
          <div className="flex flex-col items-center mb-2">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 rounded-full border-4 border-gray-50 shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {previewImage || userData.image ? (
                  <img
                    src={previewImage || userData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-gray-200 text-7xl" />
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-[#eab308] p-2 rounded-full shadow-md border-2 border-white text-[#1e3a8a]">
                <FaCamera size={12} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* NAME  */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black text-[#eab308] uppercase tracking-widest z-10">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-gray-100 p-4 text-[11px] font-bold text-[#1e3a8a] uppercase outline-none focus:border-[#1e3a8a] transition-all"
              />
            </div>

            {/*  PHONE */}
            <div className="relative opacity-60">
              <label className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">
                Verified Phone (Locked)
              </label>
              <div className="w-full bg-gray-50 border border-gray-100 p-4 text-[11px] font-bold text-gray-400">
                {userData.phone}
              </div>
            </div>

            {/*  EMAIL */}
            <div className="relative opacity-60">
              <label className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">
                System Email (Locked)
              </label>
              <div className="w-full bg-gray-100 border border-gray-100 p-4 text-[11px] font-bold text-gray-400">
                {userData.email}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 transition-all tracking-widest"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#1e3a8a] text-white py-4 px-10 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#152a61] transition-all shadow-xl active:scale-95"
            >
              <FaSave size={12} /> Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalHTML, document.body);
};

export default UpdateProfileModal;

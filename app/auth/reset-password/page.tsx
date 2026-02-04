'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaLock,
  FaCheckCircle,
  FaShieldAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsChanged(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-blue-900 shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
            SMART<span className="text-yellow-400">FLOW</span>
          </Link>

          <nav className="flex gap-6 text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link
              href="/auth/login"
              className="hover:text-yellow-400 transition-colors font-bold text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-4xl bg-white rounded border border-zinc-200 shadow-sm overflow-hidden md:flex">
          {/* FORM COLUMN */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            {!isChanged ? (
              <>
                <h2 className="text-2xl font-bold text-zinc-900 uppercase mb-2">
                  Create New Password
                </h2>
                <p className="text-zinc-500 text-sm mb-8">
                  Your identity has been verified. Please choose a strong new password.
                </p>

                <form onSubmit={handleUpdate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
                      New Password
                    </label>
                    <div className="relative group">
                      <FaLock className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="password"
                        required
                        className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <FaLock className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="password"
                        required
                        className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-[0.98]"
                  >
                    Update Password
                  </button>
                </form>
              </>
            ) : (
              /* SUCCESS VIEW */
              <div className="text-center py-10">
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-zinc-900 uppercase mb-2">
                  Password Updated
                </h2>
                <p className="text-zinc-500 text-sm mb-8">
                  Your account security has been restored. You can now log in with your new
                  password.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-block bg-blue-900 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md"
                >
                  Login Now
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex w-1/2 bg-blue-900 p-12 text-white flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FaShieldAlt size={200} />
            </div>
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Security <br />
                <span className="text-yellow-400">FIRST</span>
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                SmartFlow uses military-grade encryption to protect your credentials. Changing your
                password regularly keeps your property data safe.
              </p>
              <ul className="text-xs space-y-3 text-blue-200">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Mix letters, numbers, and symbols.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Avoid using names or birthdays.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Never share your login details.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-100 mt-auto border-t border-zinc-300">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-8 py-6 border-b border-zinc-300">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 text-white font-bold px-3 py-1.5 rounded text-sm uppercase tracking-wider">
              SmartFlow
            </div>
            <span className="text-zinc-700 font-bold text-sm hidden sm:inline">
              Personal Property Management System®
            </span>
          </div>

          <div className="flex space-x-5 text-zinc-600">
            <a href="#" className="hover:text-blue-900 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-900 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-900 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="bg-blue-950 text-zinc-300 text-xs px-8 py-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white hover:underline">
              About Us
            </Link>
            <Link href="#" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white hover:underline">
              Support
            </Link>
          </div>
          <div className="font-medium">
            &copy; {new Date().getFullYear()} SmartFlow Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

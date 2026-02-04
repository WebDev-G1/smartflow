'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaArrowLeft,
  FaCheckCircle,
} from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('Reset link sent to:', email);
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* HEADER p */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-blue-900 shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
            SMART<span className="text-yellow-400">FLOW</span>
          </Link>

          <nav className="flex gap-6 text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-yellow-400 transition-colors text-white">
              Home
            </Link>
            <Link href="/auth/login" className="hover:text-yellow-400 transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 py-12">
        {/* INFO BANNER */}
        <div className="mb-8 w-full max-w-4xl rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-800 flex items-center gap-3">
          <span className="flex-shrink-0 bg-blue-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            i
          </span>
          <strong>Security:</strong> If an account exists for this email, you will receive a reset
          link shortly.
        </div>

        {/* FORGOT PASSWORD CARD */}
        <div className="w-full max-w-4xl overflow-hidden rounded border bg-white shadow-sm md:flex border-zinc-200">
          {/* FORM */}
          <div className="w-full p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            {!isSubmitted ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 uppercase">Reset Password</h2>
                  <p className="text-zinc-500 text-sm mt-1">
                    Enter your registered email address to recover your account access.
                  </p>
                </div>

                <form onSubmit={handleResetRequest} className="space-y-6">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <FaEnvelope className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                      <input
                        type="email"
                        className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                        placeholder="your-email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-900 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? 'Sending Request...' : 'Send Recovery Link'}
                  </button>

                  <div className="text-center">
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-blue-900 transition-colors"
                    >
                      <FaArrowLeft className="text-xs" /> Back to Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className="text-center py-8">
                <div className="mb-4 flex justify-center">
                  <FaCheckCircle className="text-6xl text-green-500 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 uppercase">Email Sent</h2>
                <p className="text-zinc-500 text-sm mt-3 mb-8">
                  Instructions to reset your password have been sent to: <br />
                  <span className="font-semibold text-zinc-800">{email}</span>
                </p>
                <Link
                  href="/auth/login"
                  className="inline-block rounded-lg bg-blue-900 px-8 py-3 text-sm font-bold text-white hover:bg-blue-800 transition-all"
                >
                  Return to Login
                </Link>
              </div>
            )}
          </div>

          {/* INFO PANEL */}
          <div className="w-full bg-blue-900 p-12 text-white md:w-1/2 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold">
                Account <br />
                <span className="text-yellow-400">RECOVERY</span>
              </h2>
              <p className="mb-8 text-blue-100 leading-relaxed text-sm">
                Lost your access? Don't worry. Our secure recovery system helps you reclaim your
                SmartFlow dashboard quickly and safely.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400 font-bold">✓</span> Secure Verification Link
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400 font-bold">✓</span> Identity Protection
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400 font-bold">✓</span> 24/7 Access Recovery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER  */}
      <footer className="bg-zinc-100 border-t border-zinc-300">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-8 py-6 border-b border-zinc-300">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 text-white font-bold px-3 py-1.5 rounded text-sm uppercase tracking-wider">
              SmartFlow
            </div>
            <span className="text-zinc-700 font-bold text-sm hidden sm:inline text-nowrap">
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

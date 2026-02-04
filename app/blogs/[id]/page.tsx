'use client';

import { useParams, useRouter } from 'next/navigation';
import { blogPosts } from '../../data/blogs';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaRegBookmark,
} from 'react-icons/fa';

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Logic
  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const post = blogPosts.find((p) => p.id === Number(id));
  const relatedPosts = blogPosts.filter((p) => p.id !== Number(id)).slice(0, 3);

  if (!post)
    return <div className="p-20 text-center font-black text-[#F0655B]">ANALYSIS NOT FOUND</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#F0655B] selection:text-white">
      <Header />

      {/* HERO HEADER */}
      <header className="pt-30 pb-10 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#F0655B] mb-12 mt-3 transition-all"
          >
            <FaChevronLeft size={10} /> Back to Hub
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="bg-[#F0655B] text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-blue-900 leading-[0.9] tracking-tighter uppercase">
                {post.title}
              </h1>
            </div>
            <div className="flex items-center gap-6 text-zinc-500 text-[11px] font-bold uppercase pb-2">
              <span className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=Joseph+Edwards&background=1e3a8a&color=fff`}
                  className="w-10 h-10 rounded-full"
                  alt="Author"
                />
                <span className="text-blue-900 font-black">Joseph Edwards</span>
              </span>
              <span className="flex items-center gap-2 border-l border-zinc-200 pl-6">
                <FaCalendarAlt className="text-[#F0655B]" /> {post.date}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* COLUMN LAYOUT */}
      <main className="max-w-[1400px] mx-auto px-6 py-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* SHARES & TOC */}
          <aside className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-32 space-y-12">
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 transform -rotate-90 origin-left mb-8">
                  Share Analysis
                </p>
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="w-12 h-12  border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
              <div className="pt-8 border-t border-zinc-100">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#F0655B]">
                  <FaRegBookmark /> Save Article
                </button>
              </div>
            </div>
          </aside>

          {/* MASSIVE CONTENT */}
          <div className="lg:col-span-7">
            <article className="prose prose-zinc max-w-none">
              <p className="text-3xl font-bold text-blue-900/40 italic leading-tight mb-16 tracking-tight border-l-4 border-[#F0655B] pl-8">
                {post.excerpt}
              </p>

              <div className="mb-20 shadow-2xl overflow-hidden rounded-sm">
                <img
                  src={post.image}
                  className="w-full object-cover hover:scale-105 transition-transform duration-1000"
                  alt="Main"
                />
              </div>

              <div className="text-zinc-700 text-lg leading-[2] space-y-12 whitespace-pre-line font-medium first-letter:text-7xl first-letter:font-black first-letter:text-blue-900 first-letter:mr-3 first-letter:float-left">
                {post.content}
              </div>

              {/* GALLERY COMPONENT */}
              <div className="mt-32 grid grid-cols-2 gap-4">
                {post.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden group ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt="Gallery"
                    />
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* INSIGHTS & CTA */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="bg-blue-900 p-8 rounded-sm text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-[#F0655B]">
                  Market Alert
                </h4>
                <p className="text-sm leading-relaxed mb-8 opacity-80">
                  Download the full 2026 Property Intelligence report for deeper data sets.
                </p>
                <button className="w-full py-4 bg-[#F0655B] text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-blue-900 transition-all">
                  Get PDF Report <FaArrowRight />
                </button>
              </div>

              <div className="p-8 border border-zinc-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-900 mb-6">
                  Quick Navigation
                </h4>
                <nav className="flex flex-col gap-4 text-[11px] font-bold text-zinc-400 uppercase">
                  <span className="hover:text-[#F0655B] cursor-pointer">01. Key Trends</span>
                  <span className="hover:text-[#F0655B] cursor-pointer">02. Investment Risks</span>
                  <span className="hover:text-[#F0655B] cursor-pointer">03. Technology Impact</span>
                </nav>
              </div>
            </div>
          </aside>
        </div>

        {/* OTHER BLOGS */}
        <section className="mt-40">
          <div className="flex justify-between items-end mb-16 border-b-2 border-zinc-100 pb-8">
            <div>
              <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">
                Further Reading
              </h2>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-2">
                Selected Analysis from our Hub
              </p>
            </div>
            <Link
              href="/blogs"
              className="text-[10px] font-black uppercase tracking-widest text-[#F0655B] flex items-center gap-2 hover:gap-4 transition-all"
            >
              View All Insights <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedPosts.map((rel) => (
              <Link href={`/blogs/${rel.id}`} key={rel.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-lg">
                  <img
                    src={rel.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={rel.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.3em]">
                      {rel.readTime} Read
                    </p>
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="text-2xl font-black text-blue-900 uppercase leading-none mb-4 group-hover:text-[#F0655B] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-zinc-500 text-xs leading-loose line-clamp-2 uppercase font-bold tracking-tight opacity-60">
                    {rel.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

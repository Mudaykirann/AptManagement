import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Users, CreditCard, MessageSquare, Briefcase, 
  Calendar, Bell, ShieldCheck, ChevronRight, Menu, X, 
  Star, ArrowRight, Laptop, Smartphone
} from 'lucide-react';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* ---------------- STICKY NAVBAR ---------------- */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 text-white p-2 rounded-xl shadow-lg shadow-emerald-200">
                <Building2 size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">AptManage</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-emerald-500 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-emerald-500 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-sm font-semibold text-slate-600 hover:text-emerald-500 transition-colors">Testimonials</a>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-600 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4"
          >
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-semibold text-slate-700">Features</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-semibold text-slate-700">How it Works</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-semibold text-slate-700">Testimonials</a>
            <hr className="border-slate-100" />
            <Link to="/login" className="block text-base font-semibold text-slate-700">Login</Link>
            <Link to="/signup" className="block text-base font-bold text-emerald-600">Get Started Free</Link>
          </motion.div>
        )}
      </nav>

      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Text */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                The Modern Standard for Community Living
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Apartment Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Made Simple.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-8 leading-relaxed">
                Seamlessly manage residents, automate billing, track complaints, and broadcast announcements all in one beautiful, centralized platform.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="inline-flex justify-center items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30 hover:-translate-y-1">
                  Start for Free <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all">
                  Sign In
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Illustration (Mocked Glassmorphism Dashboard) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square bg-gradient-to-tr from-emerald-100 to-slate-50 rounded-full flex items-center justify-center p-8">
                {/* Floating Glassmorphism Cards */}
                <div className="absolute top-10 right-10 w-64 bg-white/70 backdrop-blur-xl border border-white p-5 rounded-2xl shadow-xl shadow-slate-200/50 animate-[bounce_5s_infinite]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Payment Received</p>
                      <p className="text-xs text-emerald-600 font-semibold">Rent (Mar 2024)</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 left-4 w-72 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-5 rounded-2xl shadow-2xl shadow-indigo-500/20 animate-[bounce_6s_infinite_reverse]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Maintenance Resolved</p>
                      <p className="text-xs text-slate-400">Tap to view details</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 overflow-hidden flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-32 h-6 bg-slate-100 rounded-md"></div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100"></div>
                    <div className="h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100"></div>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 mt-2 p-4">
                    <div className="space-y-3">
                      <div className="w-full h-4 bg-slate-200 rounded"></div>
                      <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                      <div className="w-4/5 h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- 2. FEATURES SECTION ---------------- */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Everything You Need to Run Your Community</h2>
            <p className="text-lg text-slate-600">A complete suite of tools built specifically for modern residential complexes and property managers.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Users, title: 'Resident Management', desc: 'Maintain an updated directory of all flat owners and tenants securely.', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: CreditCard, title: 'Billing & Payments', desc: 'Generate invoices for rent and maintenance. Track real-time payments.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: MessageSquare, title: 'Complaint Tracking', desc: 'Centralized helpdesk for residents to report and track maintenance issues.', color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Briefcase, title: 'Visitor Management', desc: 'Pre-approve guests and track visitor entry logs at the security gate.', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: Calendar, title: 'Facility Booking', desc: 'Allow residents to transparently book the clubhouse, pool, or tennis courts.', color: 'text-pink-500', bg: 'bg-pink-50' },
              { icon: Bell, title: 'Notices & Announcements', desc: 'Instantly broadcast high-priority digital notices to every residents dashboard.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            ].map((feat, idx) => (
              <motion.div key={idx} variants={fadeUp} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all cursor-default group">
                <div className={`w-14 h-14 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feat.icon size={28} className={feat.color} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- 3. HOW IT WORKS ---------------- */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">Your community is online in three simple steps.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-30"></div>

            {[
              { step: '01', title: 'Register Property', desc: 'Create your admin account and define your building structure, flats, and rules.' },
              { step: '02', title: 'Add Residents', desc: 'Import your community directory. Residents receive invites to set their passwords.' },
              { step: '03', title: 'Manage Seamlessly', desc: 'Sit back as payments, maintenance, and communications flow through one secure portal.' },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUp} className="relative text-center z-10 hidden-overflow">
                <div className="w-24 h-24 mx-auto bg-slate-800 border-2 border-emerald-500 rounded-full flex items-center justify-center text-3xl font-black text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 px-4">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- 4. ROLE-BASED ACCESS ---------------- */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Tailored Experiences for Everyone</h2>
            <p className="text-lg text-slate-600">Unique dashboards depending on your role in the community.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <ShieldCheck size={200} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-6 tracking-wide">
                  <Laptop size={16} /> ADMIN PANEL
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Master Control</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-600"><CheckCircle /> Financial Analytics & Ledger</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckCircle /> Maintenance Helpdesk (Resolve Issues)</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckCircle /> Bulk Announcement Broadcasting</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckCircle /> Directory & Role Management</li>
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none text-white">
                <Smartphone size={200} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-6 tracking-wide">
                  <Smartphone size={16} /> RESIDENT APP
                </div>
                <h3 className="text-3xl font-bold mb-4">Daily Convenience</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-emerald-50"><CheckCircle color="rgba(255,255,255,0.8)" /> Pay Bills in One Tap via Portal</li>
                  <li className="flex items-center gap-3 text-emerald-50"><CheckCircle color="rgba(255,255,255,0.8)" /> Open & Track Service Requests</li>
                  <li className="flex items-center gap-3 text-emerald-50"><CheckCircle color="rgba(255,255,255,0.8)" /> Receive Critical Push Notifications</li>
                  <li className="flex items-center gap-3 text-emerald-50"><CheckCircle color="rgba(255,255,255,0.8)" /> Book Community Amenities</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. TESTIMONIALS ---------------- */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-slate-600">See what property managers and residents are saying.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { name: "Sarah Jenkins", role: "Property Manager", quote: "AptManage completely revolutionized how we collect dues. We used to chase checks for weeks; now it's all automated and seamless." },
              { name: "David Chen", role: "Flat Resident", quote: "Filing a complaint about a leaky faucet and actually seeing the status change to 'In Progress' the next day is a breathtakingly great experience." },
              { name: "Priya Patel", role: "HOA President", quote: "The absolute best SaaS platform for our complex. Broadcasting announcements instantly to 400 flats is a massive lifesaver for our admin team." }
            ].map((t, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <p className="text-slate-700 italic mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- 6. CALL TO ACTION ---------------- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-800 opacity-90"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
            className="text-4xl lg:text-5xl font-extrabold mb-6"
          >
            Start Managing Your Apartment Today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-xl text-emerald-50 mb-10"
          >
            Join the modern era of residential management. No credit card required to start.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            <Link to="/signup" className="inline-block bg-white text-emerald-600 px-10 py-5 rounded-full font-extrabold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-2xl">
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------------- 7. FOOTER ---------------- */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 text-white p-2 rounded-xl">
                <Building2 size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">AptManage</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-500">About Us</a>
              <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-500">Features</a>
              <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-500">Privacy Policy</a>
              <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-500">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2024 AptManage Inc. All rights reserved.</p>
            <p className="text-sm font-semibold text-slate-400 flex items-center gap-1">
              Made with <span className="text-red-500 mx-1">❤</span> for Communities
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Icon Helper
function CheckCircle({ color = "currentColor" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

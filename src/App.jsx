import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code2, Menu, Mail, Send, MapPin, ExternalLink, 
  Link, Receipt, Utensils, Gift, Eye, Ticket, Globe, 
  GraduationCap, BookOpen, Download, Loader2,
  CheckCircle2, AlertCircle, Music, ZoomIn, X, 
  Database, Smartphone, Origami, Plane, Target,
  Home, Briefcase, Cpu, User, Infinity, Info,
  Radio, Film, Search, ChevronDown, ChevronUp, Lock, Key,
  ShieldCheck, FileLock, Heart, Mic, Zap, Clock,
  PenTool, SlidersHorizontal, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiTypescript,
  SiFirebase, SiSupabase, SiPython, SiNodedotjs, SiExpress,
  SiArduino, SiRaspberrypi, SiAdobecreativecloud,
  SiGithub, SiAutodesk
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, increment, 
  collection, addDoc, serverTimestamp, deleteDoc, onSnapshot 
} from "firebase/firestore";

// --- CONFIGURATION ---
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const BOT_USERNAME = "great_portfolio_bot"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SHORTENED COUNTRY DATA ---
const allCountries = [
  { name: "India", dial_code: "+91", code: "IN" },
  { name: "United States", dial_code: "+1", code: "US" }
];

// --- HELPERS ---
const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const formatLikes = (num) => {
  if (!num) return 0;
  if (num >= 1000000) return (Math.floor(num / 10000) / 100) + 'm';
  if (num >= 1000) return (Math.floor(num / 10) / 100) + 'k';
  return num;
};

const getStatusStyle = (status) => {
  const s = status.toLowerCase();
  if (s.includes("planning")) return { icon: PenTool, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
  if (s.includes("implementing") || s.includes("coding")) return { icon: Code2, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" };
  if (s.includes("progress")) return { icon: Loader2, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" };
  if (s.includes("almost") || s.includes("testing")) return { icon: SlidersHorizontal, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" };
  if (s.includes("done") || s.includes("completed")) return { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" };
  return { icon: Clock, color: "text-slate-400", bg: "bg-slate-800", border: "border-slate-700" };
};

// --- COMPONENTS ---

const ProjectLikeButton = ({ title }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem('liked_projects') || '[]');
    if (likedProjects.includes(title)) setHasLiked(true);
  }, [title]);

  useEffect(() => {
    const docRef = doc(db, "project_stats", title);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) setLikes(doc.data().likes || 0);
    });
    return () => unsubscribe();
  }, [title]);

  const handleLike = async (e) => {
    e.stopPropagation(); 
    const docRef = doc(db, "project_stats", title);
    let likedProjects = JSON.parse(localStorage.getItem('liked_projects') || '[]');
    try {
      if (hasLiked) {
        setHasLiked(false);
        likedProjects = likedProjects.filter(t => t !== title);
        localStorage.setItem('liked_projects', JSON.stringify(likedProjects));
        await setDoc(docRef, { likes: increment(-1) }, { merge: true });
      } else {
        setHasLiked(true);
        likedProjects.push(title);
        localStorage.setItem('liked_projects', JSON.stringify(likedProjects));
        await setDoc(docRef, { likes: increment(1) }, { merge: true });
      }
    } catch (err) { console.error("Like error:", err); }
  };

  return (
    <button onClick={handleLike} className={`flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full transition-all border ${hasLiked ? "border-pink-500/50 bg-pink-500/10 text-pink-500" : "border-slate-800 bg-slate-900 text-slate-400 hover:text-pink-400 hover:border-pink-500/30"}`}>
      <Heart size={14} className={hasLiked ? "fill-pink-500 text-pink-500" : ""} />
      <span>{formatLikes(likes)}</span>
    </button>
  );
};

const CountrySelector = ({ selectedCode, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!search) return allCountries;
    return allCountries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial_code.includes(search));
  }, [search]);

  const selectedCountry = allCountries.find(c => c.dial_code === selectedCode) || allCountries[0];

  return (
    <div className="relative w-32" ref={dropdownRef}>
      <input type="hidden" name={name} value={selectedCountry?.dial_code} />
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full h-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src={`https://flagcdn.com/w20/${selectedCountry?.code.toLowerCase()}.png`} width="20" alt={selectedCountry?.code} className="rounded-sm shrink-0" />
          <span className="text-slate-300 truncate">{selectedCountry?.dial_code}</span>
        </div>
        <ChevronDown size={14} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-0 mb-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search country..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-300 focus:border-neon-green outline-none" autoFocus />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto scrollbar-thin">
              {filteredCountries.map((country) => (
                <button key={country.code} type="button" onClick={() => { onChange(country.dial_code); setIsOpen(false); setSearch(""); }} className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800 transition-colors text-left ${selectedCountry?.code === country.code ? "bg-slate-800/50" : ""}`}>
                  <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} width="20" alt={country.name} className="rounded-sm shrink-0" />
                  <div className="flex-1 min-w-0 flex justify-between items-center">
                    <span className="text-sm text-slate-200 truncate">{country.name}</span>
                    <span className="text-xs text-slate-500 font-mono ml-2">{country.dial_code}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- DATA ---
const data = {
  about: {
    bio: "I’m a hobbyist AI developer by passion, fitting projects into whatever free time my busy schedule allows. My journey began with simple curiosity, how technology could be shaped to solve everyday problems. Being extremely picky about details, I often found myself imagining better alternatives, which eventually turned into building my own solutions. This mindset fuels my interest in connecting the digital and physical worlds. To unwind from my hectic routine, I practice origami, which helps refine my focus, precision, and hand control. And yes, somewhere along the way, I also completed a Master’s in Graphic Designing… lol.",
    highlights: [
      { icon: Code2, label: "Full Stack Development", color: "text-blue-400", bg: "bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20" },
      { icon: Database, label: "IoT Engineering", color: "text-cyan-400", bg: "bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20" },
      { icon: Smartphone, label: "Mobile Development", color: "text-blue-500", bg: "bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-600/20" },
      { icon: Origami, label: "Origami", color: "text-pink-400", bg: "bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/20" },
      { icon: Plane, label: "Travel Enthusiast", color: "text-orange-400", bg: "bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/20" },
      { icon: Target, label: "Problem Solving", color: "text-green-400", bg: "bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/20" },
    ]
  },
  skills: {
    frontend: [
      { name: "Html & CSS", level: 95, color: "from-orange-500 to-red-500", icon: SiHtml5, iconColor: "#E34F26" },
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600", icon: SiJavascript, iconColor: "#F7DF1E" },
      { name: "React.js", level: 90, color: "from-cyan-400 to-blue-500", icon: SiReact, iconColor: "#61DAFB" },
      { name: "Tailwind CSS", level: 90, color: "from-cyan-300 to-teal-400", icon: SiTailwindcss, iconColor: "#06B6D4" },
      { name: "TypeScript", level: 85, color: "from-blue-500 to-indigo-600", icon: SiTypescript, iconColor: "#3178C6" },
    ],
    backend: [
      { name: "Firebase", level: 85, color: "from-yellow-500 to-orange-600", icon: SiFirebase, iconColor: "#FFCA28" },
      { name: "Supabase", level: 80, color: "from-green-400 to-emerald-600", icon: SiSupabase, iconColor: "#3ECF8E" },
      { name: "Python", level: 75, color: "from-blue-400 to-indigo-500", icon: SiPython, iconColor: "#3776AB" },
      { name: "Node.js", level: 80, color: "from-green-500 to-emerald-700", icon: SiNodedotjs, iconColor: "#339933" },
      { name: "Express.js", level: 80, color: "from-gray-400 to-gray-600", icon: SiExpress, iconColor: "#ffffff" },
    ],
    iot: [
      { name: "Arduino", level: 85, color: "from-emerald-500 to-teal-600", icon: SiArduino, iconColor: "#00979D" },
      { name: "Raspberry Pi", level: 75, color: "from-pink-500 to-rose-600", icon: SiRaspberrypi, iconColor: "#C51A4A" },
      { name: "Sensors & Actuators", level: 80, color: "from-purple-500 to-violet-600", icon: Cpu, iconColor: "#A78BFA" },
      { name: "Flipper Zero", level: 90, color: "from-orange-500 to-red-600", icon: Radio, iconColor: "#E88C30" },
      { name: "Kode.", level: 85, color: "from-indigo-400 to-blue-600", icon: Code2, iconColor: "#818CF8" },
    ],
    tools: [
      { name: "Adobe Suite", level: 95, color: "from-pink-500 to-rose-600", icon: SiAdobecreativecloud, iconColor: "#DA4943" },
      { name: "Video (Pr, Ae)", level: 85, color: "from-purple-500 to-violet-600", icon: Film, iconColor: "#9999FF" },
      { name: "3D & CAD", level: 80, color: "from-blue-500 to-indigo-600", icon: SiAutodesk, iconColor: "#0696D7" },
      { name: "Git/GitHub", level: 90, color: "from-gray-500 to-slate-700", icon: SiGithub, iconColor: "#ffffff" },
      { name: "VS Code", level: 95, color: "from-blue-500 to-cyan-600", icon: VscVscode, iconColor: "#007ACC" },
    ]
  },
  projects: [
    {
      title: "Connect - Link in Bio",
      desc: "Easiest way to connect with me along with my gaming stats for others to play and compete with me.",
      tags: ["HTML", "CSS", "JS", "Gaming", "Social"],
      image: "https://raw.githubusercontent.com/Hawkay002/React-portfolio/main/img/Screenshot_20260118_111726_Chrome.jpg", 
      link: "https://connect-liv2.onrender.com", 
      icon: Link, 
      date: "May 14, 2025",
      color: "text-blue-400", 
      bg: "bg-blue-400/10",
      cardBorder: "border-blue-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-blue-500/20 hover:via-blue-500/5 hover:to-transparent",
      hoverBorder: "hover:border-blue-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
    },
    {
      title: "Rent Invoicing App",
      desc: "Fast and reliable way to create and send rent invoices to tenants.",
      tags: ["Web App", "Offline", "Local Storage"],
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      link: "https://inv-henna.vercel.app/",
      icon: Receipt,
      date: "Apr 15, 2025", 
      color: "text-green-400", 
      bg: "bg-green-400/10",
      cardBorder: "border-green-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-green-500/20 hover:via-green-500/5 hover:to-transparent",
      hoverBorder: "hover:border-green-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]",
    },
    {
      title: "Restaurant POS System",
      desc: "A multifunctional POS System for restaurants to take and serve orders.",
      tags: ["POS", "Management", "Real-time"],
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
      link: "https://new-pos-ten.vercel.app/",
      icon: Utensils,
      date: "Jun 10, 2025", 
      color: "text-orange-400", 
      bg: "bg-orange-400/10",
      cardBorder: "border-orange-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-orange-500/20 hover:via-orange-500/5 hover:to-transparent",
      hoverBorder: "hover:border-orange-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(251,146,60,0.2)]",
    },
    {
      title: "Birthday & Shagun Bot",
      desc: "User interact first telegram bot for send birthday wish cards along with a shagun if you're lucky.",
      tags: ["Telegram", "Bot", "Automation"],
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
      link: "https://t.me/Wish_ind_bot",
      icon: Gift, 
      date: "Oct 09, 2025",
      color: "text-pink-400", 
      bg: "bg-pink-400/10",
      cardBorder: "border-pink-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-pink-500/20 hover:via-pink-500/5 hover:to-transparent",
      hoverBorder: "hover:border-pink-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]",
    },
    {
      title: "Unredactor",
      desc: "Unredact any document or image. Works only if the document or file wasn't rescanned after the redaction.",
      tags: ["Python", "Security", "Forensics"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
      isDownload: true,
      locked: true,
      link: "https://raw.githubusercontent.com/Hawkay002/React-portfolio/main/docs/unredactor.py-main.zip", 
      icon: Eye,
      date: "Dec 11, 2025", 
      color: "text-red-400", 
      bg: "bg-red-400/10",
      cardBorder: "border-red-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-red-500/20 hover:via-red-500/5 hover:to-transparent",
      hoverBorder: "hover:border-red-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]",
    },
    {
      title: "Ransomware",
      desc: "An educational Python tool demonstrating ransomware mechanics, encryption protocols, and data recovery for security research.",
      tags: ["Python", "Encryption", "Security"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      isDownload: true,
      locked: true,
      link: "https://raw.githubusercontent.com/Hawkay002/React-portfolio/main/docs/Ransomware-main.zip", 
      icon: FileLock,
      date: "Jan 27, 2026", 
      color: "text-cyan-400", 
      bg: "bg-cyan-400/10",
      cardBorder: "border-cyan-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-cyan-500/20 hover:via-cyan-500/5 hover:to-transparent",
      hoverBorder: "hover:border-cyan-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    },
    {
      title: "Event Ticketing System",
      desc: "A fast and Reliable source to manage events, issue tickets, check guestlists, and scan entries offline.",
      tags: ["Management", "Admin", "Firestore"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      link: "https://entry-pass-seven.vercel.app/",
      icon: Ticket,
      date: "Dec 27, 2025", 
      color: "text-purple-400", 
      bg: "bg-purple-400/10",
      cardBorder: "border-purple-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-purple-500/20 hover:via-purple-500/5 hover:to-transparent",
      hoverBorder: "hover:border-purple-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]",
    },
    {
      title: "Portfolio Website",
      desc: "A website to showcase my developer skills as an AI full-stack developer.",
      tags: ["React", "Showcase", "Hobby"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      link: "https://shovith-dev.vercel.app/",
      icon: Globe,
      date: "Jan 27, 2026", 
      color: "text-indigo-400", 
      bg: "bg-indigo-400/10",
      cardBorder: "border-indigo-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-indigo-500/20 hover:via-indigo-500/5 hover:to-transparent",
      hoverBorder: "hover:border-indigo-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]",
    }
  ],
  roadmap:[
    {
      title: "Cupid x Us - Quiz",
      desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
      eta: "Feb 14, 2026",
      status: "In Progress",
      icon: Heart 
    }
  ],
  education: [
    { title: "Master’s Degree in Criminology", place: "Edinburgh, United Kingdom", status: "Distinction(96%)", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Master’s Degree in International Relations", place: "Edinburgh, United Kingdom", status: "Merit (92%)", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Master’s Degree in Graphic Designing", place: "West Bengal, India", status: "96%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Master’s Degree in Computer Science", place: "Delhi, India", status: "90%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Bachelor's Degree in Business Administration", place: "West Bengal, India", status: "85%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Bachelor's Degree in Science", place: "West Bengal, India", status: "88%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Bachelor's Degree in Commerce", place: "West Bengal, India", status: "95%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Higher Secondary (WBCHSE)", place: "West Bengal, India", status: "92%", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Secondary (WBBSE)", place: "West Bengal, India", status: "87%", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
  ]
};

// --- DISPLAY HELPERS ---
const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0; setDisplayText('');
    const timer = setInterval(() => { 
      if (i < text.length) { setDisplayText(text.substring(0, i + 1)); i++; } 
      else clearInterval(timer); 
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span className="inline-block">{displayText}<span className="animate-blink ml-1">|</span></span>;
};

const ScaleRevealCard = ({ children, delay = 0 }) => (
  <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay, type: "spring", stiffness: 60 }}>
    {children}
  </motion.div>
);

const RevealCard = ({ children, delay = 0, className = "", direction = "bottom" }) => {
  const variants = { 
    hidden: { opacity: 0, y: direction === "bottom" ? 50 : 0, x: direction === "left" ? -75 : direction === "right" ? 75 : 0 }, 
    visible: { opacity: 1, y: 0, x: 0 } 
  };
  return (
    <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay, type: "spring", stiffness: 40 }} className={className}>
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ value, color }) => (
  <div className="relative h-4 overflow-hidden inline-flex items-center justify-center">
    <span className="invisible font-mono text-[10px] px-px">{value}</span>
    <AnimatePresence mode="popLayout">
      <motion.span key={value} initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 15, opacity: 0 }} transition={{ duration: 0.3 }} className={`absolute font-mono text-[10px] ${color} left-0 right-0 text-center`}>{value}</motion.span>
    </AnimatePresence>
  </div>
);

const SectionTitle = ({ subtitle, title }) => (
  <div className="flex flex-col items-center mb-12 mt-20">
    <span className="text-neon-green text-lg font-mono mb-2">{'>'} {subtitle}</span>
    <h2 className="text-3xl font-bold text-white relative inline-block">{title}<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-neon-green rounded-full"></span></h2>
  </div>
);

const Card = ({ children, className = "", style }) => (
  <div style={style} className={`bg-card-bg rounded-2xl border border-white/5 p-6 glow-card transition-all duration-300 ${className}`}>{children}</div>
);

const ProgressBar = ({ name, level, color, icon: Icon, iconColor }) => (
  <div className="mb-5 last:mb-0">
    <div className="flex justify-between items-end mb-2">
      <div className="flex items-center gap-2">
        {Icon && <div className="p-1.5 rounded-md bg-white/5 border border-white/5 shadow-sm"><Icon size={16} style={{ color: iconColor }} /></div>}
        <span className="text-sm font-medium text-slate-200">{name}</span>
      </div>
      <span className="text-xs text-slate-400 font-mono">{level}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-3 relative overflow-hidden">
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full rounded-full absolute top-0 left-0 bg-gradient-to-r ${color} relative overflow-hidden`}>
        <div className="absolute inset-0 w-full h-full opacity-30 animate-[progress-stripes_1s_linear_infinite]" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
      </motion.div>
    </div>
  </div>
);

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const isManualScroll = useRef(false);
  const navLinks = [{ name: 'Home', href: '#home' }, { name: 'About', href: '#about' }, { name: 'Skills', href: '#skills' }, { name: 'Projects', href: '#projects' }, { name: 'Education', href: '#education' }, { name: 'Contact', href: '#contact' }];
  const mobileDockItems = [{ id: 'home', icon: Home, href: '#home' }, { id: 'about', icon: User, href: '#about' }, { id: 'skills', icon: Cpu, href: '#skills' }, { id: 'projects', icon: Briefcase, href: '#projects' }, { id: 'education', icon: GraduationCap, href: '#education' }, { id: 'contact', icon: Mail, href: '#contact' }];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      isManualScroll.current = true;
      setActiveTab(targetId);
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      history.pushState(null, null, id);
      setTimeout(() => { isManualScroll.current = false; }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 300;
      sections.forEach(s => {
        const el = document.getElementById(s);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) setActiveTab(s);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10 h-16 items-center justify-between px-8">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2">
          <div className="bg-neon-green/20 p-1.5 rounded-lg"><Code2 className="text-neon-green w-5 h-5" /></div>
          <span className="text-xl font-bold bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">Shovith.dev</span>
        </a>
        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={`text-sm font-medium transition-colors ${activeTab === link.href.replace('#', '') ? 'text-neon-green' : 'text-gray-300 hover:text-neon-green'}`}>{link.name}</a>
          ))}
        </div>
      </nav>
      <div className="md:hidden fixed bottom-12 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-1.5 flex gap-5">
          {mobileDockItems.map((item) => { 
            const isActive = activeTab === item.id; 
            return (
              <a key={item.id} href={item.href} onClick={(e) => scrollToSection(e, item.href)} className={`relative p-2 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {isActive && <motion.div layoutId="active-dock-pill" className="absolute inset-0 bg-slate-800 rounded-full" transition={{ type: "spring", bounce: 0, duration: 0.6 }} />}
                {isActive && <motion.div layoutId="active-dock-indicator" className="absolute -bottom-1.5 w-6 h-1.5 bg-white/60 z-20" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 75% 0%, 25% 0%)' }} />}
                <item.icon size={18} className="relative z-10" />
              </a>
            ); 
          })}
        </div>
      </div>
    </>
  );
};

// --- MAIN APP ---
function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileImage = "https://raw.githubusercontent.com/Hawkay002/React-portfolio/d6f210fd03713af59270c31f4872d7d3001cd418/img/Picsart_26-01-18_00-00-17-928.png"; 

  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); 
  const [dbQuota, setDbQuota] = useState(0); 

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [verificationStep, setVerificationStep] = useState(1);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [isEduUnlocked, setIsEduUnlocked] = useState(false);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [eduPassword, setEduPassword] = useState("");
  const [eduError, setEduError] = useState("");
  const [isEduVerifying, setIsEduVerifying] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");

  const postGradCount = data.education.filter(e => e.title.includes("Master")).length;
  const underGradCount = data.education.filter(e => e.title.includes("Bachelor")).length;
  const schoolCount = data.education.filter(e => e.title.includes("Secondary")).length;

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const docRef = doc(db, "stats", "email_quota");
        const docSnap = await getDoc(docRef);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        if (docSnap.exists()) {
          const d = docSnap.data();
          if (d.month !== currentMonth || d.year !== currentYear) {
            await updateDoc(docRef, { count: 0, month: currentMonth, year: currentYear });
            setDbQuota(0);
          } else setDbQuota(d.count);
        } else {
          await setDoc(docRef, { count: 0, month: currentMonth, year: currentYear });
          setDbQuota(0);
        }
      } catch (err) { console.error("Quota fetch fail:", err); }
    };
    fetchQuota();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); 
  };

  const handleDownloadClick = (project) => {
    if (project.locked) {
      setCurrentProject(project);
      setIsOtpModalOpen(true);
      setVerificationStep(1);
      setOtpCode("");
      setOtpError("");
    } else window.open(project.link, '_blank');
  };

  const handleStartVerification = () => {
    let sid = localStorage.getItem('secure_download_session_id') || generateSessionId();
    localStorage.setItem('secure_download_session_id', sid);
    window.open(`https://t.me/${BOT_USERNAME}?start=${sid}`, '_blank');
    setVerificationStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setOtpError("");
    const sid = localStorage.getItem('secure_download_session_id');
    try {
      const docSnap = await getDoc(doc(db, "otp_sessions", sid));
      if (docSnap.exists() && docSnap.data().otp === otpCode.trim()) {
        const d = docSnap.data();
        await addDoc(collection(db, "verified_downloads"), {
          telegram_id: d.telegram_id,
          project: currentProject.title,
          timestamp: serverTimestamp()
        });
        showNotification(`Success! Downloading ${currentProject.title}...`);
        window.open(currentProject.link, '_blank');
        setIsOtpModalOpen(false);
      } else setOtpError("Invalid code.");
    } catch (err) { setOtpError("Verification error."); }
    finally { setIsVerifying(false); }
  };

  const handleUnlockEducation = async (e) => {
    e.preventDefault();
    setIsEduVerifying(true);
    try {
      const docSnap = await getDoc(doc(db, "settings", "security"));
      if (docSnap.exists() && eduPassword === docSnap.data().education_password) {
        setIsEduUnlocked(true);
        setIsEduModalOpen(false);
        setEduPassword("");
        showNotification("Education Unlocked!");
      } else setEduError("Incorrect Password.");
    } catch (err) { setEduError("Auth Failed."); }
    finally { setIsEduVerifying(false); }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.target);
    const phone = `${fd.get("countryCode")} ${fd.get("phone")}`;
    try {
      if (isTelegram) {
        const text = `📩 New Message: ${fd.get("firstName")} ${fd.get("lastName")}\n📱 ${phone}\n📝 ${fd.get("message")}`;
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" })
        });
        showNotification("Message sent!");
        e.target.reset();
      } else {
        if (dbQuota >= 250) { showNotification("Monthly limit reached.", 'error'); return; }
        fd.append("access_key", WEB3FORMS_KEY);
        fd.append("phone", phone);
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
        const d = await res.json();
        if (d.success) {
          await updateDoc(doc(db, "stats", "email_quota"), { count: increment(1) });
          setDbQuota(prev => prev + 1);
          showNotification("Sent!");
          e.target.reset();
        } else showNotification("Error sending.", 'error');
      }
    } catch (err) { showNotification("Network Error.", "error"); }
    finally { setIsSubmitting(false); }
  };

  const filteredProjects = useMemo(() => {
    return data.projects.filter(p => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Web Dev") return p.tags.some(t => ["React", "HTML", "CSS"].includes(t));
      if (activeCategory === "Python & AI") return p.tags.some(t => ["Python", "Bot"].includes(t));
      if (activeCategory === "Security") return p.tags.some(t => ["Security", "Encryption"].includes(t));
      return false;
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-app-bg text-slate-200 font-sans selection:bg-neon-green selection:text-black overflow-x-hidden">
      <style>{`
        @keyframes progress-stripes { from { background-position: 1rem 0; } to { background-position: 0 0; } }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>

      {/* --- OTP MODAL --- */}
      <AnimatePresence>
        {isOtpModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
              <button onClick={() => setIsOtpModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>
              <div className="text-center mb-6">
                <ShieldCheck className="text-blue-500 w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-white">Security Verification</h3>
                <p className="text-sm text-slate-400">Verify identity to download <strong className="text-white">{currentProject?.title}</strong></p>
              </div>
              {verificationStep === 1 ? (
                <button onClick={handleStartVerification} className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
                  <Send size={18} /> Verify via Telegram
                </button>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <input type="text" required value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 text-center text-lg focus:border-neon-green outline-none" placeholder="××××××" autoFocus />
                  {otpError && <p className="text-red-500 text-xs text-center">{otpError}</p>}
                  <button type="submit" disabled={isVerifying} className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                    {isVerifying ? <Loader2 className="animate-spin mx-auto" size={20}/> : "Verify & Unlock"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="fixed top-5 left-0 right-0 mx-auto w-fit z-[70] flex items-center gap-3 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl">
            {notification.type === 'success' ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-red-500" />}
            <div className="text-sm font-medium text-white">{notification.message}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="max-w-md mx-auto px-5 pt-28 pb-32">
        <section id="home" className="flex flex-col items-center text-center mb-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setIsProfileOpen(true)} className="relative w-32 h-32 mb-8 cursor-pointer group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green to-cyan-400 animate-spin-slow blur-md opacity-70"></div>
            <div className="absolute inset-1 rounded-full overflow-hidden z-10">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn className="text-neon-green" /></div>
            </div>
          </motion.div>
          <RevealCard>
            <h1 className="text-4xl font-bold text-white mb-3">Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">Shovith</span></h1>
            <div className="text-lg text-slate-300 h-8"><Typewriter text="Hobbyist Full Stack Developer & IoT Engineer" /></div>
          </RevealCard>
          <RevealCard delay={0.2} className="w-full mt-6">
            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="w-full py-3.5 bg-gradient-to-r from-neon-green to-teal-500 rounded-full text-black font-bold shadow-lg">Get In Touch</button>
          </RevealCard>
        </section>

        <section id="about">
          <SectionTitle subtitle="who_am_i" title="about_me" />
          <Card className="mb-8"><p className="text-slate-300 text-sm leading-7">{data.about.bio}</p></Card>
          <div className="grid grid-cols-2 gap-3">
            {data.about.highlights.map((h, i) => (
              <ScaleRevealCard key={i} delay={i * 0.1}>
                <Card className="flex flex-col items-center justify-center p-4 text-center h-full">
                  <div className={`p-3 rounded-xl mb-3 ${h.bg} ${h.color}`}><h.icon size={22} /></div>
                  <span className="text-xs text-slate-300">{h.label}</span>
                </Card>
              </ScaleRevealCard>
            ))}
          </div>
        </section>

        <section id="skills" className="space-y-4">
          <SectionTitle subtitle="expertise" title="technical_skills" />
          {Object.entries(data.skills).map(([key, list], idx) => (
            <RevealCard key={key} delay={idx * 0.1}>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4 capitalize">{key}</h3>
                {list.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
          ))}
        </section>

        <section id="projects">
          <SectionTitle subtitle="my_work" title="featured_projects" />
          <div className="flex justify-center mb-8 gap-2 overflow-x-auto pb-2">
            {["All", "Web Dev", "Python & AI", "Security"].map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === c ? "bg-neon-green text-black" : "bg-slate-900 text-slate-400 border border-slate-800"}`}>{c}</button>
            ))}
          </div>
          <div className="space-y-6">
            {filteredProjects.map((project, idx) => (
              <RevealCard key={project.title} direction={idx % 2 === 0 ? "left" : "right"}>
                <Card className={`group relative overflow-hidden transition-all duration-300 ${project.cardBorder} ${project.hoverBg} ${project.hoverBorder} ${project.hoverShadow}`}>
                  <div className="h-40 w-[calc(100%+3rem)] -mx-6 -mt-6 mb-6 overflow-hidden">
                    <img src={project.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${project.bg} ${project.color}`}><project.icon size={24} /></div>
                    <ProjectLikeButton title={project.title} />
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-white">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.isDownload ? (
                        <button onClick={() => handleDownloadClick(project)} className="p-2 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white">
                          {project.locked ? <Lock size={16} className="text-red-400" /> : <Download size={16} />}
                        </button>
                      ) : (
                        <a href={project.link} target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white"><ExternalLink size={16} /></a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-5 leading-relaxed">{project.desc}</p>
                  
                  {/* --- UNIVERSAL FOOTER --- */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-slate-500" />
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Published on: {project.date}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        showNotification(
                          <span className="text-xs">
                            By downloading, you agree to our{' '}
                            <a href="https://my-portfolio-bot-m0xm.onrender.com/privacy.html" target="_blank" rel="noreferrer" className="underline text-neon-green">privacy policy</a>
                            {' '}and{' '}
                            <a href="https://my-portfolio-bot-m0xm.onrender.com/terms.html" target="_blank" rel="noreferrer" className="underline text-neon-green">terms of use</a>.
                          </span>
                        );
                      }}
                      className="text-slate-500 hover:text-neon-green transition-colors p-1"
                      title="Legal Information"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                </Card>
              </RevealCard>
            ))}
          </div>
        </section>

        <section id="education">
          <SectionTitle subtitle="credentials" title="education" />
          <AnimatePresence mode="wait">
            {!isEduUnlocked ? (
              <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Card className="text-center border-purple-500/20 bg-purple-500/5">
                    <div className="p-3 bg-purple-500/10 text-purple-400 w-fit mx-auto rounded-xl mb-2"><GraduationCap size={24} /></div>
                    <span className="text-sm text-slate-300 uppercase tracking-wider">Masters</span>
                    <span className="block text-4xl font-bold text-white my-1">{postGradCount}</span>
                  </Card>
                  <Card className="text-center border-blue-500/20 bg-blue-500/5">
                    <div className="p-3 bg-blue-500/10 text-blue-400 w-fit mx-auto rounded-xl mb-2"><GraduationCap size={24} /></div>
                    <span className="text-sm text-slate-300 uppercase tracking-wider">Bachelors</span>
                    <span className="block text-4xl font-bold text-white my-1">{underGradCount}</span>
                  </Card>
                </div>
                <div className="flex justify-center mb-8">
                  <Card className="text-center border-orange-500/20 bg-orange-500/5 w-full">
                    <div className="p-3 bg-orange-500/10 text-orange-400 w-fit mx-auto rounded-xl mb-2"><BookOpen size={24} /></div>
                    <span className="text-sm text-slate-300 uppercase tracking-wider">Certifications</span>
                    <span className="block text-4xl font-bold text-white my-1">{schoolCount}</span>
                  </Card>
                </div>
                <button onClick={() => setIsEduModalOpen(true)} className="w-full py-3 bg-slate-900 border border-slate-700 rounded-full text-slate-300 flex items-center justify-center gap-2 hover:border-neon-green transition-all">Show Details <ChevronDown size={16} /></button>
              </motion.div>
            ) : (
              <motion.div key="unlocked" className="space-y-4">
                {data.education.map((e, i) => (
                  <Card key={i} className="flex gap-4 items-center">
                    <div className={`p-3 rounded-xl ${e.bg} ${e.color}`}><e.icon size={24} /></div>
                    <div>
                      <h4 className="font-bold text-white">{e.title}</h4>
                      <p className="text-xs text-slate-400">{e.place}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.bg} ${e.color}`}>{e.status}</span>
                    </div>
                  </Card>
                ))}
                <button onClick={() => setIsEduUnlocked(false)} className="w-full text-slate-500 text-xs mt-4 hover:text-white flex items-center justify-center gap-1"><ChevronUp size={14}/> Hide Details</button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section id="contact">
          <SectionTitle subtitle="hello" title="get_in_touch" />
          <div className="flex justify-center mb-6">
            <div className="bg-slate-900 p-1 rounded-full border border-slate-800 flex relative w-64 cursor-pointer" onClick={() => setIsTelegram(!isTelegram)}>
              <motion.div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-neon-green/20 rounded-full border border-neon-green/50" animate={{ left: isTelegram ? '50%' : '4px' }} />
              <button className={`flex-1 py-2 text-xs font-bold z-10 ${!isTelegram ? 'text-neon-green' : 'text-slate-400'}`}>Email</button>
              <button className={`flex-1 py-2 text-xs font-bold z-10 ${isTelegram ? 'text-neon-green' : 'text-slate-400'}`}>Telegram</button>
            </div>
          </div>
          <Card className={`border-t-4 transition-colors duration-500 ${isTelegram ? 'border-t-blue-500' : 'border-t-neon-green'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">{isTelegram ? <><Send size={20} className="text-blue-400"/> Direct Message</> : <><Mail size={20} className="text-neon-green"/> Send Email</>}</h3>
              <div className="px-2 py-1 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-mono text-slate-400">Limit: <AnimatedCounter value={dbQuota} color={dbQuota >= 250 ? "text-red-500" : "text-neon-green"} />/250</div>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required name="firstName" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none" placeholder="First Name" />
                <input required name="lastName" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none" placeholder="Last Name" />
              </div>
              <input required name="email" type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none" placeholder="Email" />
              <div className="flex gap-2">
                <CountrySelector name="countryCode" selectedCode={selectedCountryCode} onChange={setSelectedCountryCode} />
                <input required name="phone" className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none" placeholder="Phone" />
              </div>
              <textarea required name="message" rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none" placeholder="Your message..." />
              <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-lg text-black font-bold transition-colors ${isTelegram ? 'bg-blue-500 hover:bg-blue-600' : 'bg-neon-green hover:bg-emerald-400'} disabled:opacity-50`}>
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Send"}
              </button>
            </form>
          </Card>
        </section>
      </main>

      {/* --- PASSWORD MODAL --- */}
      <AnimatePresence>
        {isEduModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm relative shadow-2xl">
              <button onClick={() => setIsEduModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20}/></button>
              <h3 className="text-lg font-bold text-white mb-4 text-center">Restricted Access</h3>
              <form onSubmit={handleUnlockEducation} className="space-y-4">
                <input type="password" value={eduPassword} onChange={(e) => setEduPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 text-center tracking-widest outline-none focus:border-neon-green" placeholder="••••••" autoFocus />
                {eduError && <p className="text-red-500 text-xs text-center">{eduError}</p>}
                <button type="submit" className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400">
                  {isEduVerifying ? <Loader2 className="animate-spin mx-auto" /> : "Unlock Details"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900">
        <p>© 2026 Shovith Debnath. Crafted with ᡣ𐭩</p>
      </footer>
    </div>
  );
}

export default App;

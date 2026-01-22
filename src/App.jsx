import React, { useState, useEffect } from 'react';
import { 
  Code2, Mail, Send, MapPin, ExternalLink, 
  Link, Receipt, Utensils, Gift, Eye, Ticket, Globe, 
  GraduationCap, BookOpen, Download, Loader2,
  CheckCircle2, AlertCircle, Music, ZoomIn, X, 
  Database, Smartphone, Origami, Plane, Target,
  Home, Briefcase, Cpu, User, Infinity, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, increment 
} from "firebase/firestore";

// --- CONFIGURATION ---
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- COUNTRY DATA ---
const countries = [
  { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" }, 
  { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Argentina", code: "+54" }, 
  { name: "Armenia", code: "+374" }, { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" }, 
  { name: "Azerbaijan", code: "+994" }, { name: "Bahrain", code: "+973" }, { name: "Bangladesh", code: "+880" }, 
  { name: "Belarus", code: "+375" }, { name: "Belgium", code: "+32" }, { name: "Belize", code: "+501" }, 
  { name: "Benin", code: "+229" }, { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" }, 
  { name: "Bosnia & Herzegovina", code: "+387" }, { name: "Botswana", code: "+267" }, { name: "Brazil", code: "+55" }, 
  { name: "Bulgaria", code: "+359" }, { name: "Burkina Faso", code: "+226" }, { name: "Burundi", code: "+257" }, 
  { name: "Cambodia", code: "+855" }, { name: "Cameroon", code: "+237" }, { name: "Canada", code: "+1" }, 
  { name: "Central African Republic", code: "+236" }, { name: "Chile", code: "+56" }, { name: "China", code: "+86" }, 
  { name: "Colombia", code: "+57" }, { name: "Comoros", code: "+269" }, { name: "Congo", code: "+242" }, 
  { name: "Costa Rica", code: "+506" }, { name: "Croatia", code: "+385" }, { name: "Cuba", code: "+53" }, 
  { name: "Cyprus", code: "+357" }, { name: "Czech Republic", code: "+420" }, { name: "Denmark", code: "+45" }, 
  { name: "Djibouti", code: "+253" }, { name: "Ecuador", code: "+593" }, { name: "Egypt", code: "+20" }, 
  { name: "El Salvador", code: "+503" }, { name: "Equatorial Guinea", code: "+240" }, { name: "Eritrea", code: "+291" }, 
  { name: "Estonia", code: "+372" }, { name: "Ethiopia", code: "+251" }, { name: "Fiji", code: "+679" }, 
  { name: "Finland", code: "+358" }, { name: "France", code: "+33" }, { name: "Gabon", code: "+241" }, 
  { name: "Gambia", code: "+220" }, { name: "Georgia", code: "+995" }, { name: "Germany", code: "+49" }, 
  { name: "Ghana", code: "+233" }, { name: "Greece", code: "+30" }, { name: "Greenland", code: "+299" }, 
  { name: "Guatemala", code: "+502" }, { name: "Guinea", code: "+224" }, { name: "Guyana", code: "+592" }, 
  { name: "Haiti", code: "+509" }, { name: "Honduras", code: "+504" }, { name: "Hong Kong", code: "+852" }, 
  { name: "Hungary", code: "+36" }, { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, 
  { name: "Indonesia", code: "+62" }, { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" }, 
  { name: "Ireland", code: "+353" }, { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" }, 
  { name: "Jamaica", code: "+1876" }, { name: "Japan", code: "+81" }, { name: "Jordan", code: "+962" }, 
  { name: "Kazakhstan", code: "+7" }, { name: "Kenya", code: "+254" }, { name: "Kuwait", code: "+965" }, 
  { name: "Kyrgyzstan", code: "+996" }, { name: "Laos", code: "+856" }, { name: "Latvia", code: "+371" }, 
  { name: "Lebanon", code: "+961" }, { name: "Lesotho", code: "+266" }, { name: "Liberia", code: "+231" }, 
  { name: "Libya", code: "+218" }, { name: "Liechtenstein", code: "+423" }, { name: "Lithuania", code: "+370" }, 
  { name: "Luxembourg", code: "+352" }, { name: "Macao", code: "+853" }, { name: "Macedonia", code: "+389" }, 
  { name: "Madagascar", code: "+261" }, { name: "Malawi", code: "+265" }, { name: "Malaysia", code: "+60" }, 
  { name: "Maldives", code: "+960" }, { name: "Mali", code: "+223" }, { name: "Malta", code: "+356" }, 
  { name: "Mauritania", code: "+222" }, { name: "Mexico", code: "+52" }, { name: "Moldova", code: "+373" }, 
  { name: "Monaco", code: "+377" }, { name: "Mongolia", code: "+976" }, { name: "Montenegro", code: "+382" }, 
  { name: "Morocco", code: "+212" }, { name: "Mozambique", code: "+258" }, { name: "Myanmar", code: "+95" }, 
  { name: "Namibia", code: "+264" }, { name: "Nepal", code: "+977" }, { name: "Netherlands", code: "+31" }, 
  { name: "New Zealand", code: "+64" }, { name: "Nicaragua", code: "+505" }, { name: "Niger", code: "+227" }, 
  { name: "Nigeria", code: "+234" }, { name: "North Korea", code: "+850" }, { name: "Norway", code: "+47" }, 
  { name: "Oman", code: "+968" }, { name: "Pakistan", code: "+92" }, { name: "Panama", code: "+507" }, 
  { name: "Paraguay", code: "+595" }, { name: "Peru", code: "+51" }, { name: "Philippines", code: "+63" }, 
  { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" }, { name: "Qatar", code: "+974" }, 
  { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" }, { name: "Rwanda", code: "+250" }, 
  { name: "Saudi Arabia", code: "+966" }, { name: "Senegal", code: "+221" }, { name: "Serbia", code: "+381" }, 
  { name: "Seychelles", code: "+248" }, { name: "Sierra Leone", code: "+232" }, { name: "Singapore", code: "+65" }, 
  { name: "Slovakia", code: "+421" }, { name: "Slovenia", code: "+386" }, { name: "Somalia", code: "+252" }, 
  { name: "South Africa", code: "+27" }, { name: "South Korea", code: "+82" }, { name: "Spain", code: "+34" }, 
  { name: "Sri Lanka", code: "+94" }, { name: "Sudan", code: "+249" }, { name: "Suriname", code: "+597" }, 
  { name: "Swaziland", code: "+268" }, { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, 
  { name: "Syria", code: "+963" }, { name: "Taiwan", code: "+886" }, { name: "Tajikistan", code: "+992" }, 
  { name: "Tanzania", code: "+255" }, { name: "Thailand", code: "+66" }, { name: "Togo", code: "+228" }, 
  { name: "Tunisia", code: "+216" }, { name: "Turkey", code: "+90" }, { name: "Turkmenistan", code: "+993" }, 
  { name: "Uganda", code: "+256" }, { name: "Ukraine", code: "+380" }, { name: "UAE", code: "+971" }, 
  { name: "United Kingdom", code: "+44" }, { name: "USA", code: "+1" }, { name: "Uruguay", code: "+598" }, 
  { name: "Uzbekistan", code: "+998" }, { name: "Vatican City", code: "+379" }, { name: "Venezuela", code: "+58" }, 
  { name: "Vietnam", code: "+84" }, { name: "Yemen", code: "+967" }, { name: "Zambia", code: "+260" }, 
  { name: "Zimbabwe", code: "+263" }
];

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
      { name: "Html & CSS", level: 95, color: "from-orange-500 to-red-500" },
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
      { name: "React.js", level: 90, color: "from-cyan-400 to-blue-500" },
      { name: "Tailwind CSS", level: 90, color: "from-cyan-300 to-teal-400" },
      { name: "TypeScript", level: 85, color: "from-blue-500 to-indigo-600" },
    ],
    backend: [
      { name: "Firebase", level: 85, color: "from-yellow-500 to-orange-600" },
      { name: "Supabase", level: 80, color: "from-green-400 to-emerald-600" },
      { name: "Python", level: 75, color: "from-blue-400 to-indigo-500" },
      { name: "Node.js", level: 80, color: "from-green-500 to-emerald-700" },
      { name: "Express.js", level: 80, color: "from-gray-400 to-gray-600" },
    ],
    iot: [
      { name: "Arduino", level: 85, color: "from-emerald-500 to-teal-600" },
      { name: "Raspberry Pi", level: 75, color: "from-pink-500 to-rose-600" },
      { name: "Sensors & Actuators", level: 80, color: "from-purple-500 to-violet-600" },
      { name: "Flipper Zero", level: 90, color: "from-orange-500 to-red-600" },
      { name: "Kode", level: 85, color: "from-indigo-400 to-blue-600" },
    ],
    tools: [
      { name: "Adobe Suite (Ai, Ps, Id)", level: 95, color: "from-pink-500 to-rose-600" },
      { name: "Video (Pr, Ae)", level: 85, color: "from-purple-500 to-violet-600" },
      { name: "3D & CAD (3ds Max, Autocad)", level: 80, color: "from-blue-500 to-indigo-600" },
      { name: "Git/GitHub", level: 90, color: "from-gray-500 to-slate-700" },
      { name: "VS Code", level: 95, color: "from-blue-500 to-cyan-600" },
    ]
  },
  projects: [
    {
      title: "Connect - Link in Bio",
      desc: "Easiest way to connect with me along with my gaming stats for others to play and compete with me.",
      tags: ["HTML", "CSS", "JS", "Gaming", "Social"],
      image: "https://raw.githubusercontent.com/Hawkay002/React-portfolio/main/img/Screenshot_20260118_111726_Chrome.jpg", 
      link: "#", 
      icon: Link, 
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
      link: "#",
      icon: Receipt, 
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
      link: "#",
      icon: Utensils, 
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
      link: "#",
      icon: Gift, 
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
      link: "https://github.com/Hawkay002/React-portfolio/raw/main/unredactor.zip", 
      icon: Eye, 
      color: "text-red-400", 
      bg: "bg-red-400/10",
      cardBorder: "border-red-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-red-500/20 hover:via-red-500/5 hover:to-transparent",
      hoverBorder: "hover:border-red-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]",
    },
    {
      title: "Event Ticketing System",
      desc: "A fast and Reliable source to manage events, issue tickets, check guestlists, and scan entries offline.",
      tags: ["Management", "Admin", "Firestore"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      link: "#",
      icon: Ticket, 
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
      link: "#",
      icon: Globe, 
      color: "text-indigo-400", 
      bg: "bg-indigo-400/10",
      cardBorder: "border-indigo-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-indigo-500/20 hover:via-indigo-500/5 hover:to-transparent",
      hoverBorder: "hover:border-indigo-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]",
    }
  ],
  education: [
    {
      title: "Master’s Degree in Criminology",
      place: "Edinburgh, United Kingdom",
      status: "96%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Master’s Degree in International Relations",
      place: "Edinburgh, United Kingdom",
      status: "92%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Master’s Degree in Graphic Designing",
      place: "West Bengal, India",
      status: "96%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Master’s Degree in Computer Science",
      place: "Delhi, India",
      status: "90%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Bachelor's Degree in Business Administration",
      place: "West Bengal, India",
      status: "85%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Bachelor's Degree in Science",
      place: "West Bengal, India",
      status: "88%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Bachelor's Degree in Commerce",
      place: "West Bengal, India",
      status: "95%",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Higher Secondary (WBCHSE)",
      place: "West Bengal, India",
      status: "92%",
      icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Secondary (WBBSE)",
      place: "West Bengal, India",
      status: "87%",
      icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10"
    },
  ]
};

// --- TYPEWRITER COMPONENT ---
const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-blink ml-1">|</span>
    </span>
  );
};

// --- ANIMATION COMPONENTS ---
const ScaleRevealCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 60 }}
  >
    {children}
  </motion.div>
);

const RevealCard = ({ children, delay = 0, className = "", direction = "bottom" }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "bottom" ? 50 : 0,
      x: direction === "left" ? -75 : direction === "right" ? 75 : 0 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0 
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 40 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- UI COMPONENTS ---
const SectionTitle = ({ subtitle, title }) => (
  <div className="flex flex-col items-center mb-12 mt-20">
    <span className="text-neon-green text-lg font-mono mb-2">{'>'} {subtitle}</span>
    <h2 className="text-3xl font-bold text-white relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-neon-green rounded-full"></span>
    </h2>
  </div>
);

const Card = ({ children, className = "", style }) => (
  <div style={style} className={`bg-card-bg rounded-2xl border border-white/5 p-6 glow-card transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const ProgressBar = ({ name, level, color }) => (
  <div className="mb-5 last:mb-0">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-slate-200">{name}</span>
      <span className="text-xs text-slate-400">{level}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-3 relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full rounded-full absolute top-0 left-0 bg-gradient-to-r ${color} relative overflow-hidden`}
      >
        <div 
          className="absolute inset-0 w-full h-full opacity-30 animate-[progress-stripes_1s_linear_infinite]"
          style={{
            backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)',
            backgroundSize: '1rem 1rem'
          }}
        ></div>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/40 animate-[bubble-rise_3s_infinite_ease-in]"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              bottom: '-5px',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 2 + 2 + 's'
            }}
          />
        ))}
      </motion.div>
    </div>
  </div>
);

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Desktop Links
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  // Mobile Dock Items - Slimmer and Wider
  const mobileDockItems = [
    { id: 'home', icon: Home, href: '#home' },
    { id: 'about', icon: User, href: '#about' },
    { id: 'skills', icon: Cpu, href: '#skills' }, 
    { id: 'projects', icon: Briefcase, href: '#projects' },
    { id: 'education', icon: GraduationCap, href: '#education' },
    { id: 'contact', icon: Mail, href: '#contact' },
  ];

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 300; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-2">
              <a href="#home" className="flex items-center gap-2">
                <div className="bg-neon-green/20 p-1.5 rounded-lg">
                  <Code2 className="text-neon-green w-5 h-5" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">
                  Shovith.dev
                </span>
              </a>
            </div>
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-neon-green hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE LOGO WITH BRANDING --- */}
      <div className="md:hidden fixed top-5 left-5 z-40 bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-white/5 flex items-center gap-2">
         <Code2 className="text-neon-green w-5 h-5" />
         <span className="text-sm font-bold bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">
           Shovith.dev
         </span>
      </div>

      {/* --- MOBILE FLOATING DOCK (Slimmer, Wider, Smooth Glide) --- */}
      <div className="md:hidden fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-1.5 shadow-2xl flex items-center gap-5">
          {mobileDockItems.map((item) => {
             const isActive = activeTab === item.id;
             return (
              <a 
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`relative p-2 rounded-full transition-colors duration-300 flex items-center justify-center ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {/* SMOOTH GLIDING HIGHLIGHTER */}
                {isActive && (
                  <motion.div 
                    layoutId="active-dock-pill"
                    className="absolute inset-0 bg-slate-800 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                     {/* Top Active Indicator Line */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-white/50 rounded-b-full shadow-[0_2px_8px_rgba(255,255,255,0.5)]"></div>
                  </motion.div>
                )}
                
                {/* Icon (Smaller size: 18px for breathing room) */}
                <span className="relative z-10">
                   <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </span>
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
  
  // Contact Form States
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  
  // Real-time Database Quota (Default to 6 until DB loads)
  const [dbQuota, setDbQuota] = useState(6); 

  // SYNC QUOTA WITH FIREBASE & AUTO-RESET LOGIC (Month + Year)
  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const docRef = doc(db, "stats", "email_quota");
        const docSnap = await getDoc(docRef);
        
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11
        const currentYear = now.getFullYear(); // e.g., 2026

        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Reset if Month OR Year is different (OR if year was previously undefined)
          if (data.month !== currentMonth || data.year !== currentYear) {
            // New Month/Year Detected -> Reset to 0 and update timestamps
            await updateDoc(docRef, { count: 0, month: currentMonth, year: currentYear });
            setDbQuota(0);
          } else {
            // Same Month & Year -> Use Database Value
            setDbQuota(data.count);
          }
        } else {
          // Initialize if doc missing (First time ever)
          await setDoc(docRef, { count: 6, month: currentMonth, year: currentYear });
          setDbQuota(6);
        }
      } catch (error) {
        console.error("Error fetching quota:", error);
      }
    };
    fetchQuota();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = `${formData.get("countryCode")} ${formData.get("phone")}`;
    const message = formData.get("message");

    try {
      if (isTelegram) {
        // --- TELEGRAM SUBMISSION ---
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
           showNotification("Error: Missing Telegram Config.", 'error');
           setIsSubmitting(false);
           return;
        }

        const text = `
📩 *New Message Reveived from Portfolio Contact form*
👤 *Name:* ${firstName} ${lastName}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
📝 *Message:* ${message}
        `;
        
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" })
        });

        const data = await response.json();
        if (data.ok) {
          showNotification("Message sent successfully!");
          event.target.reset();
        } else {
          showNotification("Failed to send.", 'error');
        }

      } else {
        // --- WEB3FORMS SUBMISSION ---
        if (!WEB3FORMS_KEY) {
           showNotification("Error: Missing Web3Forms Key.", 'error');
           setIsSubmitting(false);
           return;
        }

        // Check Quota
        if (dbQuota >= 250) {
           showNotification("Monthly email limit reached. Please use Telegram.", 'error');
           setIsSubmitting(false);
           return;
        }

        formData.append("access_key", WEB3FORMS_KEY);
        formData.append("name", `${firstName} ${lastName}`);
        formData.append("phone", phone);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (data.success) {
          showNotification("Message sent successfully!");
          
          // Increment Firestore Count
          const docRef = doc(db, "stats", "email_quota");
          await updateDoc(docRef, { count: increment(1) });
          setDbQuota(prev => prev + 1);

          event.target.reset();
        } else {
          showNotification(data.message || "Something went wrong.", 'error');
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
      showNotification("An error occurred. Please try again.", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-slate-200 font-sans selection:bg-neon-green selection:text-black overflow-x-hidden">
      
      {/* Global Style for Animations */}
      <style>{`
        @keyframes progress-stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
        @keyframes bubble-rise {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Profile Image Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-neon-green transition-colors"
              >
                <X size={32} />
              </button>
              <img 
                src={profileImage} 
                alt="Profile Full" 
                className="w-full h-auto rounded-2xl border border-neon-green/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR (Includes Desktop Top Bar & Mobile Bottom Dock) */}
      <Navbar />

      <main className="max-w-md mx-auto px-5 pt-28 pb-32 md:pb-20">
        
        {/* --- HERO --- */}
        <section id="home" className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="relative w-32 h-32 mb-8 group cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green to-cyan-400 animate-spin-slow blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-1 rounded-full overflow-hidden z-10 relative">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="text-neon-green w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <RevealCard>
            <h1 className="text-4xl font-bold text-white mb-3">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">Shovith</span>
            </h1>
            <div className="text-lg text-slate-300 mb-6 flex items-center justify-center gap-2 h-8">
              <Typewriter text="Hobbyist Full Stack Developer & IoT Engineer" />
            </div>
          </RevealCard>
          
          <RevealCard delay={0.1}>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 px-2">
              Passionate about creating innovative digital solutions with modern technologies. Currently on active duty under IDS HQ as JOO for India's MoD.
            </p>
          </RevealCard>

          <RevealCard delay={0.2} className="flex flex-col w-full gap-4">
            <button 
              onClick={scrollToContact}
              className="w-full py-3.5 bg-gradient-to-r from-neon-green to-teal-500 rounded-full text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </button>
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:shovith2@gmail.com" 
                className="p-3 rounded-full bg-slate-900 border border-slate-800 text-neon-green hover:bg-slate-800 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://t.me/X_o_x_o_002" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-slate-900 border border-slate-800 text-neon-green hover:bg-slate-800 transition-colors"
              >
                <Send size={20} />
              </a>
            </div>
          </RevealCard>
        </section>

        {/* --- ABOUT ME --- */}
        <section id="about">
          <SectionTitle subtitle="" title="about_me" />
          <RevealCard className="mb-8">
            <Card>
              <div className="flex gap-1.5 mb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <p className="text-slate-300 text-sm leading-7">
                {data.about.bio}
              </p>
            </Card>
          </RevealCard>

          <div className="grid grid-cols-2 gap-3">
            {data.about.highlights.map((item, idx) => (
              <ScaleRevealCard key={idx} delay={idx * 0.1}>
                <Card className="flex flex-col items-center justify-center p-4 h-full text-center hover:bg-slate-900/80">
                  <div className={`p-3 rounded-xl mb-3 border ${item.bg} ${item.color}`}>
                    <item.icon size={22} />
                  </div>
                  <span className="text-xs font-medium text-slate-300">{item.label}</span>
                </Card>
              </ScaleRevealCard>
            ))}
          </div>

          {/* VINYL RECORD & QUOTE */}
          <RevealCard className="mt-8">
            <Card className="flex flex-col items-center justify-center py-8 relative">
              <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
                
                {/* TONEARM */}
                <div className="absolute -top-3 -right-5 z-20 w-16 h-24 pointer-events-none">
                  <div className="absolute top-3 right-4 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-600 shadow-xl flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-5 right-6 w-1.5 h-14 bg-zinc-700 origin-top rotate-[25deg] rounded-full border-r border-zinc-600/50 shadow-lg">
                    <div className="absolute bottom-0 -left-1 w-3.5 h-5 bg-zinc-800 rounded-sm border border-zinc-600 flex justify-center">
                      <div className="w-0.5 h-full bg-zinc-900/50"></div>
                    </div>
                  </div>
                </div>

                {/* RECORD */}
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center animate-[spin_3s_linear_infinite] shadow-lg relative z-10">
                  <div className="absolute inset-1 rounded-full border border-zinc-800 opacity-50"></div>
                  <div className="absolute inset-3 rounded-full border border-zinc-800 opacity-50"></div>
                  <div className="absolute inset-5 rounded-full border border-zinc-800 opacity-50"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center z-10">
                    <Music size={14} className="text-white" />
                  </div>
                </div>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-300 leading-6 max-w-xs text-center">
                "Music and programming share the same foundation - patterns, rhythm, and harmony."
              </p>
            </Card>
          </RevealCard>
        </section>

        {/* --- TECHNICAL SKILLS --- */}
        <section id="skills">
          <SectionTitle subtitle="" title="technical_skills" />
          <div className="space-y-4">
            <RevealCard><Card><h3 className="text-lg font-bold text-neon-green mb-4">Frontend</h3>{data.skills.frontend.map((s, i) => <ProgressBar key={i} {...s} />)}</Card></RevealCard>
            <RevealCard><Card><h3 className="text-lg font-bold text-neon-green mb-4">Backend</h3>{data.skills.backend.map((s, i) => <ProgressBar key={i} {...s} />)}</Card></RevealCard>
            <RevealCard><Card><h3 className="text-lg font-bold text-neon-green mb-4">IoT & Hardware</h3>{data.skills.iot.map((s, i) => <ProgressBar key={i} {...s} />)}</Card></RevealCard>
            <RevealCard><Card><h3 className="text-lg font-bold text-neon-green mb-4">Tools & Others</h3>{data.skills.tools.map((s, i) => <ProgressBar key={i} {...s} />)}</Card></RevealCard>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["React", "Node.js", "TypeScript", "Arduino", "Firebase", "Supabase", "IoT", "Flipper Zero", "Adobe", "3D Modeling"].map((tag, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }} className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs text-neon-green font-mono cursor-default hover:border-neon-green hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all">{tag}</motion.span>
            ))}
          </div>
        </section>

        {/* --- FEATURED PROJECTS --- */}
        <section id="projects">
          <SectionTitle subtitle="" title="featured_projects" />
          <div className="space-y-6">
            {data.projects.map((project, idx) => (
              <RevealCard key={idx} direction={idx % 2 === 0 ? "left" : "right"}>
                <Card className={`group relative overflow-hidden transition-all duration-300 ${project.cardBorder} ${project.hoverBg} ${project.hoverBorder} ${project.hoverShadow}`}>
                  <div className="h-40 w-[calc(100%+3rem)] -mx-6 -mt-6 mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg to-transparent opacity-60"></div>
                  </div>
                  <div className={`p-3 rounded-xl inline-block ${project.bg} ${project.color} mb-4 relative z-10`}><project.icon size={24} /></div>
                  <div className="flex justify-between items-center mb-3 relative z-10">
                    <h3 className={`font-bold text-lg text-white group-hover:${project.color.split(' ')[0]} transition-colors`}>{project.title}</h3>
                    {project.isDownload ? (
                      <a href={project.link} download className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors cursor-pointer" title="Download File"><Download size={16} /></a>
                    ) : (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors cursor-pointer" title="Visit Website"><ExternalLink size={16} /></a>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-5 leading-relaxed relative z-10">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 relative z-10">{project.tags.map((tag, tIdx) => (<span key={tIdx} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-white/30 transition-colors">{tag}</span>))}</div>
                </Card>
              </RevealCard>
            ))}
            <RevealCard className="mt-8"><div className="text-center py-4 rounded-full border border-dashed border-slate-700 text-neon-green font-mono text-sm">More projects coming soon...</div></RevealCard>
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section id="education">
          <SectionTitle subtitle="" title="education_achievements" />
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <RevealCard key={idx}><Card className="flex gap-4 items-center"><div className={`shrink-0 p-3 rounded-xl ${edu.bg} ${edu.color}`}><edu.icon size={24} /></div><div className="flex-1"><h3 className="font-bold text-base text-white">{edu.title}</h3><p className="text-sm text-slate-400 mt-0.5">{edu.place}</p><span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${edu.bg} ${edu.color}`}>{edu.status}</span></div></Card></RevealCard>
            ))}
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact">
          <SectionTitle subtitle="" title="get_in_touch" />
          <div className="space-y-3 mb-10">
            {/* ONLY Location Card Remains */}
            <RevealCard delay={0.1}>
              <Card className="flex items-center gap-4 py-4">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-neon-green">
                  <MapPin size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-500 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-white truncate">Based in India</p>
                </div>
              </Card>
            </RevealCard>
          </div>

          <RevealCard>
            {/* TOGGLE SLIDER */}
            <div className="flex justify-center mb-6">
              <div className="bg-slate-900 p-1 rounded-full border border-slate-800 flex relative w-64 cursor-pointer" onClick={() => { setIsTelegram(!isTelegram); setNotification(null); }}>
                <motion.div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-neon-green/20 rounded-full border border-neon-green/50"
                  animate={{ left: isTelegram ? '50%' : '4px' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button 
                  className={`flex-1 py-2 text-xs font-bold text-center z-10 transition-colors ${!isTelegram ? 'text-neon-green' : 'text-slate-400'}`}
                >
                  Send Email
                </button>
                <button 
                  className={`flex-1 py-2 text-xs font-bold text-center z-10 transition-colors ${isTelegram ? 'text-neon-green' : 'text-slate-400'}`}
                >
                  Direct Message
                </button>
              </div>
            </div>

            {/* FLIP CONTAINER */}
            <div className="relative perspective-1000 h-[550px] md:h-[600px]">
              <motion.div
                animate={{ rotateY: isTelegram ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full h-full transform-style-3d"
              >
                {/* FRONT (WEB3FORMS) */}
                <Card className="border-t-4 border-t-neon-green absolute w-full h-full backface-hidden">
                   {/* FLASH NOTIFICATION OVERLAY */}
                   <AnimatePresence>
                     {notification && !isTelegram && (
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl"
                       >
                         <div className="flex flex-col items-center gap-2 p-6">
                           {notification.type === 'success' ? <CheckCircle2 className="text-green-500 w-12 h-12" /> : <AlertCircle className="text-red-500 w-12 h-12" />}
                           <p className="text-white font-medium text-center">{notification.message}</p>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <div className="flex justify-between items-start mb-6">
                     <h3 className="text-lg font-bold text-neon-green flex items-center gap-2">
                       <Mail size={20}/> Send
                     </h3>
                     
                     {/* REAL-TIME LIMIT BADGE (FROM FIREBASE) */}
                     <div className="group relative">
                       <div className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400 cursor-help flex items-center gap-1">
                          <span className={dbQuota >= 250 ? "text-red-500" : "text-neon-green"}>{dbQuota}</span>/250
                       </div>
                       <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black border border-slate-700 rounded-lg text-[10px] text-slate-300 hidden group-hover:block z-50 shadow-xl">
                          Monthly free limit. Resets on the 1st of every month.
                       </div>
                     </div>
                   </div>
                   
                   <form onSubmit={onSubmit} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-xs text-slate-400 ml-1">First Name</label>
                         <input required name="firstName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="John" />
                       </div>
                       <div>
                         <label className="text-xs text-slate-400 ml-1">Last Name</label>
                         <input required name="lastName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="Doe" />
                       </div>
                     </div>
                     <div>
                       <label className="text-xs text-slate-400 ml-1">Email</label>
                       <input required name="email" type="email" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="john@example.com" />
                     </div>
                     <div>
                        <label className="text-xs text-slate-400 ml-1">Phone Number</label>
                        <div className="flex gap-2 mt-1">
                          <select name="countryCode" className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors w-24 placeholder:text-slate-600">
                            {countries.map(c => <option key={c.name} value={c.code}>{c.code} {c.name}</option>)}
                          </select>
                          <input required name="phone" type="tel" className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="9876543210" />
                        </div>
                     </div>
                     <div>
                       <label className="text-xs text-slate-400 ml-1">Message</label>
                       <textarea required name="message" rows={3} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="Your message..." />
                     </div>
                     
                     <button 
                       type="submit" 
                       disabled={isSubmitting || dbQuota >= 250}
                       className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : "Send Email"}
                     </button>
                   </form>
                </Card>

                {/* BACK (TELEGRAM) */}
                <Card className="border-t-4 border-t-blue-500 absolute w-full h-full backface-hidden rotate-y-180" style={{ transform: "rotateY(180deg)" }}>
                   {/* FLASH NOTIFICATION OVERLAY */}
                   <AnimatePresence>
                     {notification && isTelegram && (
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl"
                       >
                         <div className="flex flex-col items-center gap-2 p-6">
                           {notification.type === 'success' ? <CheckCircle2 className="text-green-500 w-12 h-12" /> : <AlertCircle className="text-red-500 w-12 h-12" />}
                           <p className="text-white font-medium text-center">{notification.message}</p>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <div className="flex justify-between items-start mb-6">
                     <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                       <Send size={20}/> Direct Message
                     </h3>
                     {/* TELEGRAM INFINITY BADGE */}
                     <div className="group relative">
                       <div className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-blue-400 cursor-help flex items-center justify-center w-8 h-6">
                          <Infinity size={14} />
                       </div>
                       <div className="absolute bottom-full right-0 mb-2 w-40 p-2 bg-black border border-slate-700 rounded-lg text-[10px] text-slate-300 hidden group-hover:block z-50 shadow-xl">
                          No limits. Send as many messages as you want.
                       </div>
                     </div>
                   </div>
                   
                   <form onSubmit={onSubmit} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-xs text-slate-400 ml-1">First Name</label>
                         <input required name="firstName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Jane" />
                       </div>
                       <div>
                         <label className="text-xs text-slate-400 ml-1">Last Name</label>
                         <input required name="lastName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Doe" />
                       </div>
                     </div>
                     <div>
                       <label className="text-xs text-slate-400 ml-1">Email</label>
                       <input required name="email" type="email" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="jane@example.com" />
                     </div>
                     <div>
                        <label className="text-xs text-slate-400 ml-1">Phone Number</label>
                        <div className="flex gap-2 mt-1">
                          <select name="countryCode" className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors w-24 placeholder:text-slate-600">
                            {countries.map(c => <option key={c.name} value={c.code}>{c.code} {c.name}</option>)}
                          </select>
                          <input required name="phone" type="tel" className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="9876543210" />
                        </div>
                     </div>
                     <div>
                       <label className="text-xs text-slate-400 ml-1">Message</label>
                       <textarea required name="message" rows={3} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Your message..." />
                     </div>
                     
                     <button 
                       type="submit" 
                       disabled={isSubmitting}
                       className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                     >
                       {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : "Send"}
                     </button>
                   </form>
                </Card>
              </motion.div>
            </div>
          </RevealCard>
        </section>

      </main>

      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900">
        <p>© 2025 Shovith Debnath. Crafted with <span className="text-red-500">♥</span> and React.js</p>
      </footer>

    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { 
  Code2, Menu, Mail, Send, MapPin, Phone, ExternalLink, 
  Github, Linkedin, Twitter, 
  Cpu, Globe, Smartphone, Award, Target, 
  Music, Mic, Headphones, Guitar,
  BookOpen, GraduationCap, Terminal, Database, Layers,
  Plane, PenTool, Video, Box, Radio, Paperclip, Monitor,
  Origami, Folder, Link, Receipt, Utensils, Gift, Eye, Ticket, ZoomIn, X, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Card = ({ children, className = "" }) => (
  <div className={`bg-card-bg rounded-2xl border border-white/5 p-6 glow-card transition-all duration-300 ${className}`}>
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

// --- MAIN APP ---
function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileImage = "https://raw.githubusercontent.com/Hawkay002/React-portfolio/d6f210fd03713af59270c31f4872d7d3001cd418/img/Picsart_26-01-18_00-00-17-928.png"; 

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-app-bg/80 backdrop-blur-lg border-b border-white/5 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="bg-neon-green/20 p-1.5 rounded-lg">
             <Code2 className="text-neon-green w-5 h-5" />
          </div>
          <span className="font-bold text-neon-green tracking-tight">Shovith.dev</span>
        </div>
        <Menu className="text-slate-400 w-6 h-6" />
      </nav>

      <main className="max-w-md mx-auto px-5 pt-28 pb-20">
        
        {/* --- HERO --- */}
        <section className="flex flex-col items-center text-center mb-16">
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

<RevealCard className="mt-8">
  <Card className="flex flex-col items-center justify-center py-8 relative">
    {/* Record Container with Tonearm */}
    <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
      
      {/* --- NEW: TONEARM --- */}
      <div className="absolute -top-3 -right-5 z-20 w-16 h-24 pointer-events-none">
        {/* Pivot Base */}
        <div className="absolute top-3 right-4 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-600 shadow-xl flex items-center justify-center z-10">
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
        </div>
        
        {/* The Arm (Rotated to hit the record) */}
        {/* UPDATED: rotate-[25deg] places the needle on the vinyl */}
        <div className="absolute top-5 right-6 w-1.5 h-14 bg-zinc-700 origin-top rotate-[25deg] rounded-full border-r border-zinc-600/50 shadow-lg">
          {/* The Headshell/Needle */}
          <div className="absolute bottom-0 -left-1 w-3.5 h-5 bg-zinc-800 rounded-sm border border-zinc-600 flex justify-center">
            <div className="w-0.5 h-full bg-zinc-900/50"></div>
          </div>
        </div>
      </div>
      {/* --------------------- */}

      {/* Record (Rotating) */}
      <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center animate-[spin_3s_linear_infinite] shadow-lg relative z-10">
        <div className="absolute inset-1 rounded-full border border-zinc-800 opacity-50"></div>
        <div className="absolute inset-3 rounded-full border border-zinc-800 opacity-50"></div>
        <div className="absolute inset-5 rounded-full border border-zinc-800 opacity-50"></div>
        {/* Center Label */}
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
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">Frontend</h3>
                {data.skills.frontend.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">Backend</h3>
                {data.skills.backend.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">IoT & Hardware</h3>
                {data.skills.iot.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">Tools & Others</h3>
                {data.skills.tools.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              "React", "Node.js", "TypeScript", "Arduino", "Firebase", "Supabase", 
              "IoT", "Flipper Zero", "Adobe", "3D Modeling"
            ].map((tag, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs text-neon-green font-mono cursor-default hover:border-neon-green hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all"
              >
                {tag}
              </motion.span>
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
                  
                  {/* Preview Image */}
                  <div className="h-40 w-[calc(100%+3rem)] -mx-6 -mt-6 mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg to-transparent opacity-60"></div>
                  </div>

                  {/* Icon */}
                  <div className={`p-3 rounded-xl inline-block ${project.bg} ${project.color} mb-4 relative z-10`}>
                    <project.icon size={24} />
                  </div>

                  {/* Title & Link */}
                  <div className="flex justify-between items-center mb-3 relative z-10">
                    <h3 className={`font-bold text-lg text-white group-hover:${project.color.split(' ')[0]} transition-colors`}>
                      {project.title}
                    </h3>
                    
                    {/* Check if Download or Link */}
                    {project.isDownload ? (
                      <a 
                        href={project.link}
                        download
                        className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors cursor-pointer"
                        title="Download File"
                      >
                        <Download size={16} />
                      </a>
                    ) : (
                      <a 
                        href={project.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors cursor-pointer"
                        title="Visit Website"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mb-5 leading-relaxed relative z-10">
                    {project.desc}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-white/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </RevealCard>
            ))}
            
            <RevealCard className="mt-8">
              <div className="text-center py-4 rounded-full border border-dashed border-slate-700 text-neon-green font-mono text-sm">
                More projects coming soon...
              </div>
            </RevealCard>
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section id="education">
          <SectionTitle subtitle="" title="education_achievements" />
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <RevealCard key={idx}>
                <Card className="flex gap-4 items-center">
                  <div className={`shrink-0 p-3 rounded-xl ${edu.bg} ${edu.color}`}>
                    <edu.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-white">{edu.title}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{edu.place}</p>
                    <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${edu.bg} ${edu.color}`}>
                      {edu.status}
                    </span>
                  </div>
                </Card>
              </RevealCard>
            ))}
          </div>
        </section> 

        {/* --- CONTACT --- */}
        <section id="contact">
          <SectionTitle subtitle="" title="get_in_touch" />
          <div className="space-y-3 mb-10">
            {[
              { label: "Email", val: "shovith2@gmail.com", icon: Mail },
              { label: "Telegram", val: "@X_o_x_o_002", icon: Send },
              { label: "Location", val: "Based in India", icon: MapPin },
            ].map((contact, idx) => (
              <RevealCard key={idx} delay={idx * 0.1}>
                <Card className="flex items-center gap-4 py-4">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-neon-green">
                    <contact.icon size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-500 mb-0.5">{contact.label}</p>
                    <p className="text-sm font-medium text-white truncate">{contact.val}</p>
                  </div>
                </Card>
              </RevealCard>
            ))}
          </div>

          <RevealCard>
            <Card className="border-t-4 border-t-neon-green">
               <h3 className="text-lg font-bold text-neon-green mb-6 flex items-center gap-2">
                 <Send size={20}/> Send Message
               </h3>
               <form 
                 className="space-y-4"
                 action="https://t.me/X_o_x_o_002"
                 target="_blank"
               >
                 <div>
                   <label className="text-xs text-slate-400 ml-1">Name</label>
                   <input className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors" placeholder="Your name" />
                 </div>
                 <div>
                   <label className="text-xs text-slate-400 ml-1">Message</label>
                   <textarea rows={4} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors" placeholder="Your message..." />
                 </div>
                 <button type="submit" className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                   Send Message via Telegram
                 </button>
               </form>
            </Card>
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

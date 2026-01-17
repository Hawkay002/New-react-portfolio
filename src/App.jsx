import React, { useState, useEffect } from 'react';
import { 
  Code2, Menu, Mail, Send, MapPin, Phone, ExternalLink, 
  Github, Linkedin, Twitter, 
  Cpu, Globe, Smartphone, Award, Target, 
  Music, Mic, Headphones, Guitar,
  BookOpen, GraduationCap, Terminal, Database, Layers,
  Plane, PenTool, Video, Box, Radio, Monitor, Origami, Folder
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA ---
const data = {
  about: {
    bio: "I’m a hobbyist AI developer by passion, fitting projects into whatever free time my busy schedule allows. My journey began with simple curiosity, how technology could be shaped to solve everyday problems. Being extremely picky about details, I often found myself imagining better alternatives, which eventually turned into building my own solutions. This mindset fuels my interest in connecting the digital and physical worlds. To unwind from my hectic routine, I practice origami, which helps refine my focus, precision, and hand control. And yes, somewhere along the way, I also completed a Master’s in Graphic Designing… lol.",
    highlights: [
      { icon: Code2, label: "Full Stack Development", color: "text-blue-400" },
      { icon: Database, label: "IoT Engineering", color: "text-cyan-400" },
      { icon: Smartphone, label: "Mobile Development", color: "text-blue-500" },
      { icon: Origami, label: "Origami", color: "text-pink-400" }, // Updated to Origami
      { icon: Plane, label: "Travel Enthusiast", color: "text-orange-400" },
      { icon: Target, label: "Problem Solving", color: "text-green-400" },
    ]
  },
  skills: {
    frontend: [
      { name: "Html & CSS", level: 95, color: "bg-orange-500" },
      { name: "JavaScript", level: 95, color: "bg-yellow-400" },
      { name: "React.js", level: 90, color: "bg-cyan-400" },
      { name: "Tailwind CSS", level: 90, color: "bg-cyan-300" },
      { name: "TypeScript", level: 85, color: "bg-blue-500" },
    ],
    backend: [
      { name: "Firebase", level: 85, color: "bg-yellow-500" },
      { name: "Supabase", level: 80, color: "bg-green-400" },
      { name: "Python", level: 75, color: "bg-blue-400" },
      { name: "Node.js", level: 80, color: "bg-green-500" },
      { name: "Express.js", level: 80, color: "bg-gray-400" },
    ],
    iot: [
      { name: "Arduino", level: 85, color: "bg-emerald-500" },
      { name: "Raspberry Pi", level: 75, color: "bg-pink-500" },
      { name: "Sensors & Actuators", level: 80, color: "bg-purple-500" },
      { name: "Flipper Zero", level: 90, color: "bg-orange-500" },
      { name: "Kode", level: 85, color: "bg-indigo-400" },
    ],
    tools: [
      { name: "Adobe Suite (Ai, Ps, Id)", level: 95, color: "bg-pink-500" },
      { name: "Video (Pr, Ae)", level: 85, color: "bg-purple-500" },
      { name: "3D & CAD (3ds Max, Autocad)", level: 80, color: "bg-blue-500" },
      { name: "Git/GitHub", level: 90, color: "bg-gray-500" },
      { name: "VS Code", level: 95, color: "bg-blue-500" },
    ]
  },
  projects: [
    {
      title: "Pandey Gift Shop",
      desc: "A full-stack e-commerce application built with React.js and Firebase.",
      tags: ["React", "Firebase", "Ecommerce"],
      icon: Smartphone, 
      color: "text-green-400", 
      bg: "bg-green-400/10",
      hoverBorder: "group-hover:border-green-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]",
      gradient: "from-green-400/20 to-emerald-600/20"
    },
    {
      title: "E-Litt",
      desc: "A full-stack Edutech platform for online learning and course management.",
      tags: ["React", "Firebase", "Edutech"],
      icon: GraduationCap, 
      color: "text-purple-400", 
      bg: "bg-purple-400/10",
      hoverBorder: "group-hover:border-purple-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]",
      gradient: "from-purple-400/20 to-indigo-600/20"
    },
    {
      title: "ElitMock",
      desc: "A mock test platform for users to prepare for exams by taking or buying tests.",
      tags: ["React", "Firebase", "Testing"],
      icon: Layers, 
      color: "text-blue-400", 
      bg: "bg-blue-400/10",
      hoverBorder: "group-hover:border-blue-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
      gradient: "from-blue-400/20 to-cyan-600/20"
    },
    {
      title: "Kreoverse",
      desc: "A real-time chatting web application.",
      tags: ["React", "Firebase", "Chat"],
      icon: Mail, 
      color: "text-pink-400", 
      bg: "bg-pink-400/10",
      hoverBorder: "group-hover:border-pink-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]",
      gradient: "from-pink-400/20 to-rose-600/20"
    },
    {
      title: "E-Rabin",
      desc: "An IoT project for e-waste segregation using Arduino.",
      tags: ["Arduino", "IoT", "Hardware"],
      icon: Cpu, 
      color: "text-emerald-400", 
      bg: "bg-emerald-400/10",
      hoverBorder: "group-hover:border-emerald-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]",
      gradient: "from-emerald-400/20 to-teal-600/20"
    },
    {
      title: "Kreobot",
      desc: "A web application for real-time face recognition.",
      tags: ["React", "ML", "Face Recognition"],
      icon: Smartphone, 
      color: "text-cyan-400", 
      bg: "bg-cyan-400/10",
      hoverBorder: "group-hover:border-cyan-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
      gradient: "from-cyan-400/20 to-sky-600/20"
    },
    {
      title: "Personal Portfolio",
      desc: "A creative portfolio website designed to look like a desktop OS.",
      tags: ["React", "TypeScript", "Framer Motion"],
      icon: Globe, 
      color: "text-indigo-400", 
      bg: "bg-indigo-400/10",
      hoverBorder: "group-hover:border-indigo-400/50",
      hoverShadow: "group-hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]",
      gradient: "from-indigo-400/20 to-violet-600/20"
    }
  ],
  education: [
    {
      title: "B.Tech in Data Science and IoT",
      place: "Amrapali University",
      status: "Currently Studying",
      icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Senior Secondary (CBSE)",
      place: "PCM, Computer Science",
      status: "75.2%",
      icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "Secondary (CBSE)",
      place: "CBSE Board",
      status: "85.2%",
      icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10"
    },
  ],
  music: [
    { role: "Classical Singer", time: "4+ years", icon: Mic },
    { role: "Piano Player", time: "4+ years", icon: Music },
    { role: "Harmonium Player", time: "4+ years", icon: Headphones },
    { role: "Ukulele Player", time: "4+ years", icon: Guitar },
  ]
};

// --- TYPEWRITER COMPONENT ---
const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
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
// Modified to support Left/Right slide animations
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
    <div className="w-full bg-slate-800 rounded-full h-2">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-2 rounded-full ${color}`}
      />
    </div>
  </div>
);

// --- MAIN APP ---
function App() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-app-bg text-slate-200 font-sans selection:bg-neon-green selection:text-black">
      
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
            className="relative w-32 h-32 mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green to-cyan-400 animate-spin-slow blur-sm opacity-70"></div>
            <div className="absolute inset-1 bg-app-bg rounded-full flex items-center justify-center z-10">
              <span className="text-4xl font-bold text-neon-green">S</span>
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
              <RevealCard key={idx} delay={idx * 0.1}>
                <Card className="flex flex-col items-center justify-center p-4 h-full text-center hover:bg-slate-900/80">
                  <div className={`p-2.5 rounded-lg bg-slate-900 border border-white/5 mb-3 ${item.color}`}>
                    <item.icon size={22} />
                  </div>
                  <span className="text-xs font-medium text-slate-300">{item.label}</span>
                </Card>
              </RevealCard>
            ))}
          </div>
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
          
          <RevealCard className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              "React", "Node.js", "TypeScript", "Arduino", "Firebase", "Supabase", 
              "IoT", "Flipper Zero", "Adobe", "3D Modeling"
            ].map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs text-neon-green font-mono cursor-default hover:border-neon-green hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all">
                {tag}
              </span>
            ))}
          </RevealCard>
        </section>

        {/* --- FEATURED PROJECTS --- */}
        <section id="projects">
          <SectionTitle subtitle="" title="featured_projects" />
          
          <div className="space-y-6">
            {data.projects.map((project, idx) => (
              // Alternating Slide Animation: Left for Even (0, 2), Right for Odd (1, 3)
              // Wait, Index 0 is 1st. User said 1st from Left.
              <RevealCard key={idx} direction={idx % 2 === 0 ? "left" : "right"}>
                <Card className={`group relative overflow-hidden hover:border-opacity-100 border-white/5 ${project.hoverBorder} ${project.hoverShadow}`}>
                  
                  {/* Preview Image Area */}
                  <div className={`h-32 w-[calc(100%+3rem)] -mx-6 -mt-6 mb-6 bg-gradient-to-br ${project.gradient} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <project.icon size={48} className="text-white mix-blend-overlay" />
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`p-3 rounded-xl inline-block ${project.bg} ${project.color} mb-4`}>
                    <project.icon size={24} />
                  </div>

                  {/* Title & Link */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className={`font-bold text-lg text-white group-hover:${project.color.split(' ')[0]} transition-colors`}>
                      {project.title}
                    </h3>
                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                      <ExternalLink size={16} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2">
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

            <RevealCard delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl bg-card-bg border border-neon-green/30 p-6 glow-border-green">
                <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/10 blur-[50px] rounded-full"></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                   <div className="p-3 rounded-xl bg-neon-green/20 text-neon-green">
                     <Award size={24} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg text-white">National Recognition</h3>
                     <p className="text-neon-green text-sm">Inspire Awards 2025</p>
                   </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                  Achieved national selection for the project <span className="text-neon-green font-semibold">E-Rabin</span>, an innovative e-waste segregator.
                </p>
              </div>
            </RevealCard>
          </div>
        </section>

        {/* --- MUSICAL JOURNEY --- */}
        <section id="music">
          <SectionTitle subtitle="" title="musical_journey" />
          
          <RevealCard className="mb-8 text-center px-4">
             <p className="text-slate-400 text-sm">
               Beyond code and circuits, music flows through my veins. Here's my harmonious side that balances logic with creativity.
             </p>
          </RevealCard>

          <div className="space-y-4">
            {data.music.map((item, idx) => (
              <RevealCard key={idx} delay={idx * 0.1}>
                <Card className="flex flex-col items-center justify-center py-8">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-slate-300 mb-4">
                    <item.icon size={28} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.role}</h3>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-mono">
                    {item.time}
                  </span>
                </Card>
              </RevealCard>
            ))}
          </div>

          <RevealCard className="mt-6">
            <Card className="flex flex-col items-center text-center py-8 border-neon-green/20">
              <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
                <Music size={24} />
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-300 leading-6 max-w-xs">
                "Music and programming share the same foundation - patterns, rhythm, and harmony."
              </p>
            </Card>
          </RevealCard>
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

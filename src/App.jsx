import React from 'react';
import { 
  Code2, Menu, Mail, Send, MapPin, Phone, ExternalLink, 
  Github, Linkedin, Twitter, 
  Cpu, Globe, Smartphone, Award, Target, 
  Music, Mic, Headphones, Guitar,
  BookOpen, GraduationCap, Terminal, Database, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA ---
const data = {
  about: {
    // FIXED: Removed the invalid "code snippet" object entirely
    bio: "I'm a passionate developer currently pursuing B.Tech in Data Science & IoT. My journey began with curiosity about how technology can solve real-world problems, leading me to develop innovative solutions that bridge the gap between digital and physical worlds.",
    highlights: [
      { icon: Code2, label: "Full Stack Development", color: "text-blue-400" },
      { icon: Database, label: "IoT Engineering", color: "text-cyan-400" },
      { icon: Smartphone, label: "Mobile Development", color: "text-blue-500" },
      { icon: Globe, label: "Web Technologies", color: "text-purple-400" },
      { icon: Award, label: "National Recognition", color: "text-yellow-400" },
      { icon: Target, label: "Problem Solving", color: "text-pink-400" },
    ]
  },
  skills: {
    frontend: [
      { name: "React.js", level: 90, color: "bg-cyan-400" },
      { name: "TypeScript", level: 85, color: "bg-blue-500" },
      { name: "JavaScript", level: 95, color: "bg-yellow-400" },
      { name: "HTML/CSS", level: 95, color: "bg-orange-500" },
      { name: "Tailwind CSS", level: 90, color: "bg-cyan-300" },
    ],
    backend: [
      { name: "Node.js", level: 80, color: "bg-green-500" },
      { name: "Firebase", level: 85, color: "bg-yellow-500" },
      { name: "Python", level: 75, color: "bg-blue-400" },
      { name: "Express.js", level: 80, color: "bg-gray-400" },
    ],
    iot: [
      { name: "Arduino", level: 85, color: "bg-emerald-500" },
      { name: "Raspberry Pi", level: 75, color: "bg-pink-500" },
      { name: "Sensors & Actuators", level: 80, color: "bg-purple-500" },
      { name: "Circuit Design", level: 70, color: "bg-indigo-500" },
    ],
    tools: [
      { name: "Git/GitHub", level: 90, color: "bg-gray-500" },
      { name: "Figma", level: 75, color: "bg-pink-400" },
      { name: "VS Code", level: 95, color: "bg-blue-500" },
      { name: "Postman", level: 80, color: "bg-orange-500" },
    ]
  },
  projects: [
    {
      title: "Pandey Gift Shop",
      desc: "A full-stack e-commerce application built with React.js and Firebase.",
      tags: ["React", "Firebase", "Ecommerce"],
      icon: Smartphone, color: "text-green-400", bg: "bg-green-400/10"
    },
    {
      title: "E-Litt",
      desc: "A full-stack Edutech platform for online learning and course management.",
      tags: ["React", "Firebase", "Edutech"],
      icon: GraduationCap, color: "text-purple-400", bg: "bg-purple-400/10"
    },
    {
      title: "ElitMock",
      desc: "A mock test platform for users to prepare for exams by taking or buying tests.",
      tags: ["React", "Firebase", "Testing"],
      icon: Layers, color: "text-blue-400", bg: "bg-blue-400/10"
    },
    {
      title: "Kreoverse",
      desc: "A real-time chatting web application.",
      tags: ["React", "Firebase", "Chat"],
      icon: Mail, color: "text-pink-400", bg: "bg-pink-400/10"
    },
    {
      title: "E-Rabin",
      desc: "An IoT project for e-waste segregation using Arduino.",
      tags: ["Arduino", "IoT", "Hardware"],
      icon: Cpu, color: "text-emerald-400", bg: "bg-emerald-400/10"
    },
    {
      title: "Kreobot",
      desc: "A web application for real-time face recognition.",
      tags: ["React", "ML", "Face Recognition"],
      icon: Smartphone, color: "text-cyan-400", bg: "bg-cyan-400/10"
    },
    {
      title: "Personal Portfolio",
      desc: "A creative portfolio website designed to look like a desktop OS.",
      tags: ["React", "TypeScript", "Framer Motion"],
      icon: Globe, color: "text-indigo-400", bg: "bg-indigo-400/10"
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

// --- ANIMATION COMPONENTS ---
const RevealCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 50 }}
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
  return (
    <div className="min-h-screen bg-app-bg text-slate-200 font-sans selection:bg-neon-green selection:text-black">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-app-bg/80 backdrop-blur-lg border-b border-white/5 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="bg-neon-green/20 p-1.5 rounded-lg">
             <Code2 className="text-neon-green w-5 h-5" />
          </div>
          <span className="font-bold text-neon-green tracking-tight">Bhavesh.dev</span>
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
              <span className="text-4xl font-bold text-neon-green">B</span>
            </div>
          </motion.div>

          <RevealCard>
            <h1 className="text-4xl font-bold text-white mb-3">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">Bhavesh</span>
            </h1>
            <p className="text-lg text-slate-300 mb-6 flex items-center justify-center gap-2">
              Full Stack Developer & IoT Engineer
              <span className="w-0.5 h-5 bg-neon-green animate-blink"></span>
            </p>
          </RevealCard>
          
          <RevealCard delay={0.1}>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 px-2">
              Passionate about creating innovative digital solutions with modern technologies. Currently pursuing B.Tech in Data Science & IoT while building impactful projects.
            </p>
          </RevealCard>

          <RevealCard delay={0.2} className="flex flex-col w-full gap-4">
            <button className="w-full py-3.5 bg-gradient-to-r from-neon-green to-teal-500 rounded-full text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Get In Touch
            </button>
            <div className="flex justify-center gap-4">
              {[Mail, Send].map((Icon, i) => (
                <div key={i} className="p-3 rounded-full bg-slate-900 border border-slate-800 text-neon-green hover:bg-slate-800 transition-colors">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </RevealCard>
        </section>

        {/* --- ABOUT ME --- */}
        <section>
          <SectionTitle subtitle="" title="about_me" />
          
          <RevealCard className="mb-8">
            <p className="text-slate-300 text-sm leading-7 text-center">
              {data.about.bio}
            </p>
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
        <section>
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
            {["React", "Node.js", "TypeScript", "Arduino", "Firebase", "IoT", "Machine Learning"].map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs text-neon-green font-mono">
                {tag}
              </span>
            ))}
          </RevealCard>
        </section>

        {/* --- FEATURED PROJECTS --- */}
        <section>
          <SectionTitle subtitle="" title="featured_projects" />
          
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <RevealCard key={idx} delay={idx * 0.1}>
                <Card className="group">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2.5 rounded-xl ${project.bg} ${project.color}`}>
                      <project.icon size={22} />
                    </div>
                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
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
        <section>
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
        <section>
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

        {/* --- CONTACT ---- */}
        <section>
          <SectionTitle subtitle="" title="get_in_touch" />
          
          <div className="space-y-3 mb-10">
            {[
              { label: "Email", val: "workbhaveshpandey@gmail.com", icon: Mail },
              { label: "Phone", val: "+91 6397498423", icon: Phone },
              { label: "Telegram", val: "@bpandey007", icon: Send },
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
               <form className="space-y-4">
                 <div>
                   <label className="text-xs text-slate-400 ml-1">Name</label>
                   <input className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors" placeholder="Your name" />
                 </div>
                 <div>
                   <label className="text-xs text-slate-400 ml-1">Email</label>
                   <input className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors" placeholder="your@email.com" />
                 </div>
                 <div>
                   <label className="text-xs text-slate-400 ml-1">Message</label>
                   <textarea rows={4} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors" placeholder="Your message..." />
                 </div>
                 <button className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                   Send Message
                 </button>
               </form>
            </Card>
          </RevealCard>
        </section>

      </main>

      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900">
        <p>© 2025 Bhavesh Pandey. Crafted with <span className="text-red-500">♥</span> and React.js</p>
      </footer>

    </div>
  )
}

export default App

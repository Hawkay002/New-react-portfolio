import React from 'react';
import { 
  Code, 
  User, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  Cpu,
  Globe,
  Database,
  Terminal,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Configuration & Data ---
// Edit this object to update your content
const portfolioData = {
  personalInfo: {
    name: "Alex Developer",
    title: "Full Stack Developer",
    bio: "Passionate builder of pixel-perfect web experiences. I transform complex problems into elegant, scalable code.",
    availability: "Open to work",
    socials: [
      { icon: Github, href: "#" },
      { icon: Linkedin, href: "#" },
      { icon: Twitter, href: "#" },
      { icon: Mail, href: "mailto:hello@example.com" }
    ]
  },
  stats: [
    { label: "Years Exp", value: "4+" },
    { label: "Projects", value: "25+" },
    { label: "Clients", value: "10+" },
    { label: "Commits", value: "2k+" }
  ],
  skills: {
    frontend: [
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "TypeScript", level: 85 }
    ],
    backend: [
      { name: "Node.js", level: 80 },
      { name: "Python / Django", level: 75 },
      { name: "PostgreSQL", level: 85 }
    ],
    tools: [
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Git", level: 90 }
    ]
  },
  experience: [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Frontend Engineer",
      period: "2023 - Present",
      description: "Leading the frontend team, migrating legacy code to Next.js, and improving site performance by 40%."
    },
    {
      company: "WebSolutions Studio",
      role: "Full Stack Developer",
      period: "2021 - 2023",
      description: "Developed e-commerce platforms using MERN stack and integrated payment gateways."
    }
  ],
  education: [
    {
      school: "University of Technology",
      degree: "B.S. Computer Science",
      period: "2017 - 2021"
    }
  ]
};

// --- Components ---

const ProgressBar = ({ label, percentage, colorClass }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <span className="text-sm font-medium text-slate-400">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-2.5 rounded-full ${colorClass}`}
      ></motion.div>
    </div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-6">
    <Icon className="w-6 h-6 text-emerald-400" />
    <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{title}</h2>
  </div>
);

// --- Main App ---

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30 font-sans pb-20">
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl mx-auto px-4 pt-12 relative z-10 space-y-12">
        
        {/* --- Header / Profile --- */}
        <header className="text-center space-y-6">
          <div className="relative w-32 h-32 mx-auto">
             {/* Circular Progress Ring Effect */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="75, 100" // The 75 from the screenshot
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-white">75%</span>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              {portfolioData.personalInfo.name}
            </h1>
            <p className="text-slate-400 mt-2 text-lg">{portfolioData.personalInfo.title}</p>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {portfolioData.personalInfo.availability}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {portfolioData.personalInfo.socials.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href}
                className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition-all hover:-translate-y-1"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </header>

        {/* --- About Me --- */}
        <section>
          <SectionTitle icon={User} title="About Me" />
          <Card>
            <p className="text-slate-300 leading-relaxed">
              {portfolioData.personalInfo.bio}
            </p>
          </Card>
        </section>

        {/* --- Grid Stats --- */}
        <section className="grid grid-cols-2 gap-4">
          {portfolioData.stats.map((stat, idx) => (
            <Card key={idx} className="flex flex-col items-center justify-center py-8">
              <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-slate-400 text-sm">{stat.label}</span>
            </Card>
          ))}
        </section>

        {/* --- Technical Skills --- */}
        <section>
          <SectionTitle icon={Cpu} title="Technical Skills" />
          
          <div className="space-y-8">
            <Card>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <Globe size={18} className="text-cyan-400" /> Frontend
              </h3>
              {portfolioData.skills.frontend.map((skill, idx) => (
                <ProgressBar key={idx} label={skill.name} percentage={skill.level} colorClass="bg-gradient-to-r from-emerald-500 to-emerald-300" />
              ))}
            </Card>

            <Card>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <Database size={18} className="text-purple-400" /> Backend
              </h3>
              {portfolioData.skills.backend.map((skill, idx) => (
                <ProgressBar key={idx} label={skill.name} percentage={skill.level} colorClass="bg-gradient-to-r from-purple-500 to-purple-300" />
              ))}
            </Card>

            <Card>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <Terminal size={18} className="text-orange-400" /> Tools & Others
              </h3>
              {portfolioData.skills.tools.map((skill, idx) => (
                <ProgressBar key={idx} label={skill.name} percentage={skill.level} colorClass="bg-gradient-to-r from-orange-500 to-orange-300" />
              ))}
            </Card>
          </div>
        </section>

        {/* --- Work Experience --- */}
        <section>
          <SectionTitle icon={Briefcase} title="Work Experience" />
          <div className="space-y-4">
            {portfolioData.experience.map((exp, idx) => (
              <Card key={idx} className="relative overflow-hidden group">
                 {/* Decorative glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                    <span className="text-emerald-400 text-sm">{exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-3">
                  {exp.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* --- Education --- */}
        <section>
          <SectionTitle icon={GraduationCap} title="Education" />
          {portfolioData.education.map((edu, idx) => (
            <Card key={idx} className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-slate-800 text-emerald-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white">{edu.school}</h3>
                <p className="text-slate-400 text-sm">{edu.degree}</p>
                <p className="text-slate-500 text-xs mt-1">{edu.period}</p>
              </div>
            </Card>
          ))}
        </section>

        {/* --- Contact --- */}
        <section>
          <SectionTitle icon={Mail} title="Get In Touch" />
          <Card>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 outline-none transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 outline-none transition-all"
                />
              </div>
              <textarea 
                rows="4" 
                placeholder="Message" 
                className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 outline-none transition-all"
              ></textarea>
              <button className="w-full text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                Send Message
              </button>
            </form>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default App

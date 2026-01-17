import React, { useRef } from 'react';
import { 
  Code2, Menu, Mail, Send, MapPin, Phone, ExternalLink, 
  Github, Linkedin, Twitter, Instagram,
  Cpu, Globe, Smartphone, Award, Target, 
  Music, Mic, Headphones, Guitar,
  BookOpen, GraduationCap, ScrollText
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// --- Data Source (Based on screenshots) ---
const data = {
  hero: {
    name: "Bhavesh",
    title: "Full Stack Developer & IoT Engineer",
    description: "Passionate about creating innovative digital solutions with modern technologies. Currently pursuing B.Tech in Data Science & IoT while building impactful projects."
  },
  about: {
    code snippet: {
      greeting: 'console.log("Hello World!");',
      objName: 'const bhavesh = {',
      passion: '  passion: "Innovation",',
      focus: '  focus: "Problem Solving",',
      mission: '  mission: "Tech for Good"',
      end: '};'
    },
    bioP1: "I'm a passionate developer currently pursuing B.Tech in Data Science & IoT. My journey began with curiosity about how technology can solve real-world problems, leading me to develop innovative solutions that bridge the gap between digital and physical worlds.",
    bioP2: "From building e-commerce platforms to creating IoT-based environmental solutions, I believe in code that makes a difference. My projects have garnered national recognition, including selection for the prestigious Inspire Awards 2025.",
    highlights: [
      { icon: Code2, label: "Full Stack Development" },
      { icon: Cpu, label: "IoT Engineering" },
      { icon: Smartphone, label: "Mobile Development" },
      { icon: Globe, label: "Web Technologies" },
      { icon: Award, label: "National Recognition" },
      { icon: Target, label: "Problem Solving" },
    ]
  },
  skills: {
    frontend: [
      { name: "React.js", level: 90, color: "bg-cyan-400" },
      { name: "TypeScript", level: 85, color: "bg-blue-500" },
      { name: "JavaScript", level: 95, color: "bg-yellow-400" },
      { name: "HTML/CSS", level: 95, color: "bg-orange-400" },
      { name: "Tailwind CSS", level: 90, color: "bg-cyan-500" },
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
    ],
    tags: ["React", "Node.js", "TypeScript", "Arduino", "Firebase", "IoT", "Machine Learning"]
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
      icon: GraduationCap, color: "text-blue-400", bg: "bg-blue-400/10"
    },
    {
      title: "ElitMock",
      desc: "A mock test platform for users to prepare for exams by taking or buying tests.",
      tags: ["React", "Firebase", "Testing"],
      icon: ScrollText, color: "text-blue-300", bg: "bg-blue-300/10"
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
      place: "PCM, Computer Science, Web Application",
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
  ],
  contact: {
    email: "workbhaveshpandey@gmail.com",
    phone: "+91 6397498423",
    telegram: "@bpandey007",
    location: "Based in India"
  }
};


// --- Reusable Components ---

// The Scroll Reveal Wrapper
const Reveal = ({ children, width = "fit-content" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px 0px" });

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={width}
    >
      {children}
    </motion.div>
  );
};


const NavBar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-app-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
    <div className="max-w-md mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Code2 className="text-neon-green" />
        <span className="text-neon-green">Bhavesh.dev</span>
      </div>
      <Menu className="text-gray-400" />
    </div>
  </nav>
);

const SectionHeader = ({ title }) => (
  <div className="flex flex-col items-center my-12">
    <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
      <span className="text-neon-green">{'>'}</span> {title}
    </h2>
    <div className="h-1 w-24 bg-neon-green rounded-full"></div>
  </div>
);

const GenericCard = ({ children, className = "", glow = false }) => (
  <div className={`bg-card-dark rounded-3xl p-6 border border-white/5 ${glow ? 'glow-border-green' : ''} ${className}`}>
    {children}
  </div>
);

const ProgressBar = ({ name, level, color }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1 text-sm font-medium">
      <span>{name}</span>
      <span className="text-gray-400">{level}%</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2.5">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`h-2.5 rounded-full ${color}`}
      ></motion.div>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <GenericCard className="mb-6">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${project.bg} ${project.color} mb-4 inline-block`}>
        <project.icon size={24} />
      </div>
      <ExternalLink className="text-gray-500" size={20} />
    </div>
    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
    <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag, i) => (
        <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{tag}</span>
      ))}
    </div>
  </GenericCard>
);


// --- Main App Component ---
function App() {
  return (
    <div className="min-h-screen bg-app-dark text-white font-sans selection:bg-neon-green/30 selection:text-white pb-20">
      <NavBar />
      
      <main className="max-w-md mx-auto px-6 pt-24">

        {/* --- HERO SECTION --- */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center mb-20 relative">
           {/* Subtle background glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-green/10 blur-[100px] rounded-full pointer-events-none"></div>
           
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            className="relative w-40 h-40 rounded-full border-2 border-neon-green/30 flex items-center justify-center mb-8 glow-border-green"
          >
             <div className="w-32 h-32 rounded-full bg-card-dark flex items-center justify-center border border-neon-green/50">
                <span className="text-5xl font-bold text-neon-green">B</span>
             </div>
          </motion.div>

          <Reveal width="100%">
            <h1 className="text-4xl font-bold mb-4">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-cyan">Bhavesh</span>
            </h1>
            <h2 className="text-xl text-gray-300 mb-6 flex items-center justify-center gap-1">
              {data.hero.title}
              <span className="animate-blink inline-block w-[2px] h-6 bg-neon-green"></span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {data.hero.description}
            </p>
          </Reveal>

          <Reveal width="100%">
          <div className="flex flex-col items-center gap-6">
            <button className="bg-gradient-to-r from-neon-green to-neon-cyan text-app-dark font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
              Get In Touch
            </button>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-card-dark rounded-full border border-white/10 text-neon-green hover:border-neon-green transition-colors"><Mail size={20}/></a>
              <a href="#" className="p-3 bg-card-dark rounded-full border border-white/10 text-neon-green hover:border-neon-green transition-colors"><Send size={20}/></a>
            </div>
          </div>
          </Reveal>
        </section>

        {/* --- ABOUT ME --- */}
        <section id="about">
          <Reveal width="100%"><SectionHeader title="about_me" /></Reveal>
          
          <Reveal width="100%">
            <GenericCard glow className="mb-8 font-mono text-sm leading-relaxed overflow-hidden relative">
               {/* Scanline effect overlay */}
               <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWWeAAAAD0lEQVQYV2NgYGD4z8DAwMgAIkxAGAnG///8/w8SI8QElAAK/v///z+IgdCgKBAF8T8zMDAxAAWBAgABBhgA8X4Z7wAAAABJRU5ErkJggg==')] opacity-10 pointer-events-none"></div>
              <p className="text-green-400 mb-4">{data.about.code.greeting}</p>
              <p className="text-gray-300">{data.about.code.bio}</p>

              <p className="text-gray-300 mt-6 mb-6 leading-7">
                {data.about.bioP1}
              </p>
              <p className="text-gray-300 mb-6 leading-7">
                {data.about.bioP2}
              </p>

              <div className="mt-6">
                <p><span className="text-cyan-400">const</span> <span className="text-white">bhavesh</span> = {'{'}</p>
                <p>  <span className="text-cyan-400">passion:</span> <span className="text-emerald-400">"Innovation"</span>,</p>
                <p>  <span className="text-cyan-400">focus:</span> <span className="text-emerald-400">"Problem Solving"</span>,</p>
                <p>  <span className="text-cyan-400">mission:</span> <span className="text-emerald-400">"Tech for Good"</span></p>
                <p>{'};'}</p>
              </div>
            </GenericCard>
          </Reveal>

          <Reveal width="100%">
            <div className="grid grid-cols-2 gap-4">
              {data.about.highlights.map((item, idx) => (
                <GenericCard key={idx} className="flex flex-col items-center justify-center text-center p-4 py-8">
                  <div className="p-3 rounded-xl bg-white/5 text-neon-cyan mb-3 border border-white/10">
                    <item.icon size={24} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </GenericCard>
              ))}
            </div>
          </Reveal>
        </section>

        {/* --- TECHNICAL SKILLS --- */}
        <section id="skills">
        <Reveal width="100%"><SectionHeader title="technical_skills" /></Reveal>

          <div className="space-y-6">
            <Reveal width="100%">
              <GenericCard>
                <h3 className="text-xl font-bold mb-6 text-neon-green">Frontend</h3>
                {data.skills.frontend.map((skill, i) => <ProgressBar key={i} {...skill} />)}
              </GenericCard>
            </Reveal>
            
            <Reveal width="100%">
            <GenericCard>
              <h3 className="text-xl font-bold mb-6 text-neon-green">Backend</h3>
              {data.skills.backend.map((skill, i) => <ProgressBar key={i} {...skill} />)}
            </GenericCard>
            </Reveal>

             <Reveal width="100%">
            <GenericCard>
              <h3 className="text-xl font-bold mb-6 text-neon-green">IoT & Hardware</h3>
              {data.skills.iot.map((skill, i) => <ProgressBar key={i} {...skill} />)}
            </GenericCard>
            </Reveal>

             <Reveal width="100%">
            <GenericCard>
              <h3 className="text-xl font-bold mb-6 text-neon-green">Tools & Others</h3>
              {data.skills.tools.map((skill, i) => <ProgressBar key={i} {...skill} />)}
            </GenericCard>
            </Reveal>
          </div>

           <Reveal width="100%">
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {data.skills.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-card-dark border border-white/10 text-neon-green font-mono text-sm hover:border-neon-green transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
          </Reveal>
        </section>

        {/* --- FEATURED PROJECTS --- */}
        <section id="projects">
        <Reveal width="100%"><SectionHeader title="featured_projects" /></Reveal>
          <div>
            {data.projects.map((project, i) => (
                <Reveal width="100%" key={i}>
                  <ProjectCard project={project} />
                </Reveal>
            ))}
          </div>
          <Reveal width="100%">
          <div className="text-center mt-8">
            <button className="px-8 py-4 rounded-full bg-card-dark border border-neon-green/30 text-neon-green font-mono hover:bg-neon-green/10 transition-colors">
              More projects coming soon...
            </button>
          </div>
          </Reveal>
        </section>

        {/* --- EDUCATION & ACHIEVEMENTS --- */}
        <section id="education">
        <Reveal width="100%"><SectionHeader title="education_achievements" /></Reveal>
          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <Reveal width="100%" key={i}>
              <GenericCard className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${edu.bg} ${edu.color}`}>
                  <edu.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{edu.title}</h3>
                  <p className="text-gray-400 text-sm">{edu.place}</p>
                  <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${edu.bg} ${edu.color} font-medium`}>
                    {edu.status}
                  </span>
                </div>
              </GenericCard>
              </Reveal>
            ))}

             <Reveal width="100%">
            {/* Special National Recognition Card with Glow */}
            <GenericCard glow className="flex flex-col gap-4 mt-6">
               <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-400/10 text-green-400">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">National Recognition</h3>
                  <p className="text-neon-green text-sm">Inspire Awards 2025</p>
                </div>
               </div>
               <p className="text-gray-300 text-sm leading-relaxed">
                 Achieved national selection for the project <span className="text-neon-green font-medium">E-Rabin</span>, an innovative e-waste segregator that demonstrates my commitment to sustainable technology solutions.
               </p>
            </GenericCard>
            </Reveal>
          </div>
        </section>

        {/* --- MUSICAL JOURNEY --- */}
        <section id="music">
        <Reveal width="100%"><SectionHeader title="musical_journey" /></Reveal>
          <Reveal width="100%"><p className="text-center text-gray-400 mb-10 max-w-xs mx-auto">Beyond code and circuits, music flows through my veins. Here's my harmonious side that balances logic with creativity.</p></Reveal>
          
          <div className="space-y-6">
            {data.music.map((item, i) => (
              <Reveal width="100%" key={i}>
              <GenericCard className="flex flex-col items-center justify-center py-8">
                <div className="p-4 rounded-2xl bg-card-dark border border-white/10 text-gray-300 mb-4">
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.role}</h3>
                <span className="px-4 py-1 rounded-full bg-green-400/10 text-green-400 text-sm font-mono">
                  {item.time}
                </span>
              </GenericCard>
              </Reveal>
            ))}

             <Reveal width="100%">
            <GenericCard className="flex flex-col items-center justify-center py-10 mt-8 text-center">
                <div className="p-4 rounded-full bg-cyan-400/20 text-cyan-400 mb-6 glow-border-green">
                  <Music size={32} />
                </div>
                <p className="text-gray-300 font-mono text-sm leading-7 max-w-xs">
                  "Music and programming share the same foundation - patterns, rhythm, and harmony. Both create something beautiful from structured chaos."
                </p>
            </GenericCard>
            </Reveal>
          </div>
        </section>

        {/* --- GET IN TOUCH --- */}
        <section id="contact">
        <Reveal width="100%"><SectionHeader title="get_in_touch" /></Reveal>
          <Reveal width="100%"><p className="text-center text-gray-400 mb-10">Ready to collaborate on something amazing? Let's build the future together.</p></Reveal>
          
          <Reveal width="100%">
          <h3 className="text-2xl font-bold text-neon-green mb-6">Connect with me</h3>
          </Reveal>
          <div className="space-y-4 mb-12">
             <Reveal width="100%">
            <GenericCard className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-white/5 text-neon-green border border-white/10"><Mail size={20}/></div>
              <div><p className="text-xs text-gray-500">Email</p><p className="font-medium break-all">{data.contact.email}</p></div>
            </GenericCard>
            </Reveal>
             <Reveal width="100%">
            <GenericCard className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-white/5 text-neon-green border border-white/10"><Phone size={20}/></div>
              <div><p className="text-xs text-gray-500">Phone</p><p className="font-medium">{data.contact.phone}</p></div>
            </GenericCard>
            </Reveal>
             <Reveal width="100%">
            <GenericCard className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-white/5 text-neon-green border border-white/10"><Send size={20}/></div>
              <div><p className="text-xs text-gray-500">Telegram</p><p className="font-medium">{data.contact.telegram}</p></div>
            </GenericCard>
            </Reveal>
             <Reveal width="100%">
            <GenericCard className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-white/5 text-neon-green border border-white/10"><MapPin size={20}/></div>
              <div><p className="text-xs text-gray-500">Location</p><p className="font-medium">{data.contact.location}</p></div>
            </GenericCard>
            </Reveal>
          </div>

          <Reveal width="100%">
          <GenericCard>
            <h3 className="text-xl font-bold text-neon-green mb-6 flex items-center gap-2"><Send size={20}/> Send Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 pl-1">Name</label>
                <input type="text" placeholder="Your name" className="w-full bg-app-dark rounded-xl border border-white/10 p-4 outline-none focus:border-neon-green transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 pl-1">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full bg-app-dark rounded-xl border border-white/10 p-4 outline-none focus:border-neon-green transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 pl-1">Message</label>
                <textarea rows="4" placeholder="Your message..." className="w-full bg-app-dark rounded-xl border border-white/10 p-4 outline-none focus:border-neon-green transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-neon-green to-neon-cyan text-app-dark font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Send size={20} /> Send Message
              </button>
            </form>
          </GenericCard>
          </Reveal>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="text-center text-gray-500 text-sm py-8 mt-12 border-t border-white/5">
        <p>© 2025 Bhavesh Pandey. Crafted with <span className="text-red-500">❤</span> <br />and React.js</p>
      </footer>

    </div>
  )
}

export default App

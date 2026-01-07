import React, { useState, useEffect } from "react";
import { 
  Menu, X, Github, Linkedin, Mail, Twitter, 
  ExternalLink, Code2, Palette, Database, Smartphone 
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "<Hello World />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-mono font-bold text-white">
        {text} <span className="animate-blink text-blue-500">|</span>
      </div>
      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-[loading_1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

const Navbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="font-mono text-xl font-bold text-white tracking-wider">
            BHAVESH<span className="text-blue-500">.</span>
          </a>

          {/* Mobile Menu Toggle */}
          <div 
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden" 
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[rgba(10,10,10,0.95)] z-40 transform transition-transform duration-300 flex flex-col items-center justify-center space-y-8 ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>

      {['Home', 'About', 'Projects', 'Contact'].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer`}
        >
          {item}
        </a>
      ))}
    </div>
  );
};

const Home = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-black"
    >
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 leading-tight">
          Hi, I'm <br /> Bhavesh
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl mb-8 font-mono h-8">
          I am a <span className="text-blue-500">{text}</span>
          <span className="animate-blink">|</span>
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="#projects"
            className="bg-blue-600 text-white py-3 px-8 rounded font-medium hover:bg-blue-700 transition duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="border border-blue-600 text-blue-500 py-3 px-8 rounded font-medium hover:bg-blue-600/10 transition duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          About <span className="text-blue-500">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-gray-400 text-lg leading-relaxed">
              I am a passionate <span className="text-blue-400 font-semibold">Frontend Developer</span> with a knack for creating seamless and visually stunning web applications. 
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              My journey began with HTML & CSS, and I've grown to master modern frameworks like <span className="text-white">React.js</span> and <span className="text-white">Tailwind CSS</span>. I love turning complex problems into simple, beautiful, and intuitive designs.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
               <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Available for Freelance
               </div>
               <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div> Full-time Opportunities
               </div>
            </div>
          </div>

          {/* Skills / Tech Stack */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
             <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
             <div className="space-y-4">
                {[
                  { name: "Frontend Development", val: 90, color: "bg-blue-500" },
                  { name: "React.js", val: 85, color: "bg-cyan-500" },
                  { name: "Tailwind CSS", val: 95, color: "bg-purple-500" },
                  { name: "Backend (Node/Firebase)", val: 70, color: "bg-green-500" },
                ].map((skill, index) => (
                   <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.val}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2.5">
                        <div 
                          className={`${skill.color} h-2.5 rounded-full transition-all duration-1000`} 
                          style={{ width: `${skill.val}%` }}
                        ></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      desc: "A personal portfolio to showcase my work and skills. Built with React and Tailwind.",
      tech: ["React", "Tailwind", "Vite"],
      link: "#",
      github: "#",
    },
    {
      title: "E-Commerce App",
      desc: "Full-featured shopping platform with cart functionality and payment integration.",
      tech: ["Next.js", "Stripe", "Firebase"],
      link: "#",
      github: "#",
    },
    {
      title: "Weather Dashboard",
      desc: "Real-time weather tracking application using OpenWeatherMap API.",
      tech: ["Vue.js", "Axios", "CSS"],
      link: "#",
      github: "#",
    },
    {
      title: "Task Manager",
      desc: "Productivity tool for managing daily tasks with drag-and-drop features.",
      tech: ["React", "Redux", "Node.js"],
      link: "#",
      github: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black text-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          My <span className="text-blue-500">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative p-6 bg-[#111] border border-white/5 rounded-xl hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_5px_20px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <div className="mb-4">
                 <div className="flex justify-between items-center">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <Code2 size={24} />
                    </div>
                    <div className="flex gap-3">
                       <a href={project.github} className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
                       <a href={project.link} className="text-gray-400 hover:text-blue-400 transition-colors"><ExternalLink size={20} /></a>
                    </div>
                 </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#0a0a0a] text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Get In <span className="text-blue-500">Touch</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-lg mx-auto">
          Whether you have a question, a project proposal, or just want to say hi, feel free to reach out. I'll try my best to get back to you!
        </p>

        <form className="max-w-lg mx-auto space-y-4 text-left">
           <input type="text" placeholder="Your Name" className="w-full p-3 bg-[#111] border border-white/10 rounded focus:outline-none focus:border-blue-500 text-white" />
           <input type="email" placeholder="Your Email" className="w-full p-3 bg-[#111] border border-white/10 rounded focus:outline-none focus:border-blue-500 text-white" />
           <textarea rows="5" placeholder="Your Message" className="w-full p-3 bg-[#111] border border-white/10 rounded focus:outline-none focus:border-blue-500 text-white"></textarea>
           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              Send Message
           </button>
        </form>

        <div className="mt-12 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Github size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Linkedin size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Twitter size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Mail size={24} /></a>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      
      <div 
        className={`min-h-screen bg-black text-gray-100 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <Contact />
        
        <footer className="py-6 text-center text-sm text-gray-600 bg-black border-t border-white/5">
           Built with ❤️ by Bhavesh.
        </footer>
      </div>
    </>
  );
}

export default App;



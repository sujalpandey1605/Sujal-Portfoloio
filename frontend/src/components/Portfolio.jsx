import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Code2, 
  Server, 
  Brain, 
  Shield, 
  Zap, 
  Bot, 
  Gauge,
  Mail,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  ArrowDown,
  Star,
  Users,
  Briefcase,
  Award
} from 'lucide-react';
import { personalInfo, aboutFeatures, services, projects, techStack } from '../mock';
import Chatbot from './Chatbot';
import ProjectModal from './ProjectModal';

const iconMap = {
  Code2,
  Server,
  Brain,
  Shield,
  Zap,
  Bot,
  Gauge
};

// Animated counter hook
const useCounter = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

// Intersection observer hook
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// Stats data
const stats = [
  { icon: Briefcase, value: 20, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 5, suffix: '+', label: 'Team Members' },
  { icon: Star, value: 100, suffix: '%', label: 'Client Satisfaction' },
  { icon: Award, value: 3, suffix: '+', label: 'Years Experience' },
];

// Tech stack with colors
const techColors = {
  'React': 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
  'Node.js': 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-400',
  'MongoDB': 'from-green-600/20 to-green-600/5 border-green-600/30 text-green-300',
  'PostgreSQL': 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
  'Java': 'from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400',
  'Spring Boot': 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-400',
  'OpenAI': 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
  'LangChain': 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400',
};

const Portfolio = () => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const fullText = personalInfo.heroHeadline;

  const [statsRef, statsInView] = useInView(0.3);
  const projectsCount = useCounter(20, 1500, statsInView);
  const teamCount = useCounter(5, 1500, statsInView);
  const satisfactionCount = useCounter(100, 1500, statsInView);
  const yearsCount = useCounter(3, 1500, statsInView);

  const counterValues = [projectsCount, teamCount, satisfactionCount, yearsCount];

  // Typing animation
  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 55);
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [typedText, isTyping, fullText]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['about', 'services', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        'service_portfolio',   // EmailJS Service ID
        'template_portfolio',  // EmailJS Template ID
        templateParams,
        'YOUR_EMAILJS_PUBLIC_KEY' // EmailJS Public Key
      )
      .then(() => {
        setFormStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus(''), 4000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 4000);
      });
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #080c1a 0%, #0d1226 50%, #080c1a 100%)' }}>
      
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 rounded-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed top-1/2 right-10 w-96 h-96 rounded-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="fixed bottom-20 left-1/3 w-80 h-80 rounded-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`} style={scrolled ? { background: 'rgba(8, 12, 26, 0.85)' } : {}}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                 style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
              SP
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="text-white">{personalInfo.name.split(' ')[0]}</span>
              <span style={{ color: '#0ea5e9' }}>.dev</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {['about', 'services', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                  activeNav === section
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a href={personalInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button 
              className="text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}
            >
              Hire Me
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </a>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-500/3 pointer-events-none" />

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8 animate-slide-in-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                   style={{ background: 'rgba(14,165,233,0.08)', borderColor: 'rgba(14,165,233,0.25)', color: '#0ea5e9' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for new projects
              </div>

              {/* Title */}
              <div className="space-y-3">
                <p className="text-cyan-400 text-lg font-medium tracking-wide">{personalInfo.title}</p>
                <h1 className="text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <span className="text-white">{typedText}</span>
                  <span className="inline-block w-0.5 h-14 bg-cyan-400 ml-1 cursor-blink align-middle" />
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                {personalInfo.heroSubtext}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => scrollToSection('projects')}
                  size="lg"
                  className="text-white font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}
                >
                  View My Work
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  variant="outline"
                  className="font-semibold px-8 transition-all duration-300 hover:scale-105"
                  style={{ borderColor: 'rgba(14,165,233,0.4)', color: '#0ea5e9', background: 'rgba(14,165,233,0.05)' }}
                >
                  Get In Touch
                </Button>
              </div>


            </div>

            {/* Right: Profile image */}
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full animate-pulse"
                     style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)', transform: 'scale(1.3)' }} />
                
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-full"
                     style={{ 
                       background: 'conic-gradient(from 0deg, #0ea5e9, #6366f1, #8b5cf6, #0ea5e9)',
                       padding: '3px',
                       borderRadius: '50%',
                       animation: 'orbit 6s linear infinite'
                     }} />
                
                {/* Image container */}
                <div className="relative w-80 h-80 rounded-full p-1"
                     style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #8b5cf6)' }}>
                  <div className="w-full h-full rounded-full overflow-hidden"
                       style={{ background: '#0d1226' }}>
                    <img
                      src={personalInfo.profilePhoto}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-semibold animate-float"
                     style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.9), rgba(99,102,241,0.9))', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(14,165,233,0.3)' }}>
                  🚀 Full Stack Dev
                </div>
                <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-semibold"
                     style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.9), rgba(99,102,241,0.9))', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(139,92,246,0.3)', animationDelay: '2s', animation: 'float 4s ease-in-out 2s infinite' }}>
                  🤖 AI Engineer
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section ref={statsRef} className="py-16 px-6 relative">
        <div className="section-divider mb-16" />
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl card-hover"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                       style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2))' }}>
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#0ea5e9' }}>
                    {counterValues[index]}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="section-divider mt-16" />
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Who I Am</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              About <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Me</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Leading a team of 5 developers, I build secure, scalable backend systems and AI automation solutions with an enterprise mindset.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl card-hover cursor-default"
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)';
                    e.currentTarget.style.background = 'rgba(14,165,233,0.05)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(14,165,233,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                       style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.15))' }}>
                    <Icon className="h-7 w-7 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-20 px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.03) 0%, transparent 70%)' }} />
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">What I Offer</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              My <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Services</span>
            </h2>
            <p className="text-gray-400 text-lg">Comprehensive solutions for modern businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              const gradients = [
                'from-cyan-500/20 to-blue-500/20',
                'from-purple-500/20 to-indigo-500/20',
                'from-green-500/20 to-teal-500/20'
              ];
              const iconColors = ['text-cyan-400', 'text-purple-400', 'text-green-400'];
              const glowColors = ['rgba(14,165,233,0.15)', 'rgba(139,92,246,0.15)', 'rgba(34,197,94,0.15)'];
              
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl card-hover cursor-default relative overflow-hidden"
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)';
                    e.currentTarget.style.boxShadow = `0 30px 60px ${glowColors[index]}`;
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${gradients[index]} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-6`}>
                    <Icon className={`h-8 w-8 ${iconColors[index]}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${iconColors[index].replace('text-', 'bg-')} flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Portfolio</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Featured <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
            </h2>
            <p className="text-gray-400 text-lg">Real-world solutions that deliver results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden card-hover cursor-pointer"
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(14,165,233,0.1)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => openProjectModal(project)}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300"
                       style={{ background: 'linear-gradient(to top, #080c1a 0%, rgba(8,12,26,0.4) 60%, transparent 100%)' }} />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                       style={{ background: 'rgba(14,165,233,0.1)', backdropFilter: 'blur(4px)' }}>
                    <div className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                         style={{ background: 'rgba(14,165,233,0.8)' }}>
                      View Details
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                  
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', color: '#0ea5e9' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-400"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full font-medium text-sm transition-all duration-200 group-hover:text-white"
                    style={{ borderColor: 'rgba(14,165,233,0.3)', color: '#0ea5e9', background: 'rgba(14,165,233,0.05)' }}
                    onClick={(e) => { e.stopPropagation(); openProjectModal(project); }}
                  >
                    View Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.04) 0%, transparent 70%)' }} />
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Tools & Technologies</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Tech <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Stack</span>
            </h2>
            <p className="text-gray-400 text-lg">Technologies I work with daily</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {techStack.map((tech, index) => {
              const colorClass = techColors[tech.name] || 'from-gray-500/20 to-gray-500/5 border-gray-500/30 text-gray-400';
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br ${colorClass} border card-hover cursor-default`}
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(14,165,233,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                       style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-lg font-black">{tech.name.charAt(0)}</span>
                  </div>
                  <p className="text-xs font-semibold text-center leading-tight">{tech.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Let's Talk</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Get In <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Touch</span>
            </h2>
            <p className="text-gray-400 text-lg">Let's discuss how I can help your business grow</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Ready to build something amazing?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Whether you need a full-stack web app, enterprise backend, or AI automation — I'm here to help bring your vision to life.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)';
                    e.currentTarget.style.background = 'rgba(14,165,233,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(14,165,233,0.15)' }}>
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-white text-sm font-medium">{personalInfo.email}</p>
                  </div>
                </a>

                <a
                  href={personalInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                    e.currentTarget.style.background = 'rgba(34,197,94,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(34,197,94,0.15)' }}>
                    <MessageCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">WhatsApp</p>
                    <p className="text-white text-sm font-medium">{personalInfo.whatsapp}</p>
                  </div>
                </a>
              </div>

              {/* Response time */}
              <div className="p-4 rounded-xl"
                   style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">Quick Response</span>
                </div>
                <p className="text-gray-400 text-xs">Usually responds within 2-4 hours during business hours</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl"
                   style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Send a Message
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block font-medium">Your Name</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="text-white placeholder:text-gray-600 focus:ring-1"
                        style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="text-white placeholder:text-gray-600"
                        style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Subject</label>
                    <Input
                      placeholder="Project Discussion"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="text-white placeholder:text-gray-600"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="text-white placeholder:text-gray-600 resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white font-semibold py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={{ 
                      background: formStatus === 'sent' 
                        ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
                        : formStatus === 'error'
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                      boxShadow: '0 4px 20px rgba(14,165,233,0.3)'
                    }}
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : formStatus === 'sent' ? (
                       'Message Sent!'
                     ) : formStatus === 'error' ? (
                       'Failed. Try again.'
                     ) : (
                       'Send Message'
                     )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                   style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
                SP
              </div>
              <span className="text-gray-400 text-sm">
                © 2025 <span className="text-white font-medium">{personalInfo.name}</span>. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Built with React & FastAPI</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <Chatbot />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </div>
  );
};

export default Portfolio;
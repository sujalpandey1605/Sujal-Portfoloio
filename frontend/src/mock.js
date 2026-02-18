// Mock data for Sujal Pandey's Portfolio

export const personalInfo = {
  name: "Sujal Pandey",
  title: "Full Stack Developer & AI Engineer",
  location: "Bhopal, India",
  email: "pandeysujal511@gmail.com",
  whatsapp: "+917470706635",
  whatsappLink: "https://wa.me/917470706635",
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujal&backgroundColor=0ea5e9",
  heroHeadline: "Building Scalable Web Applications & AI Automation Systems",
  heroSubtext: "I specialize in enterprise-grade backend systems, high-performance MERN applications, and intelligent AI agents that automate business workflows."
};

export const aboutFeatures = [
  {
    icon: "Shield",
    title: "Secure Backend Systems",
    description: "Enterprise-grade security with JWT, OAuth2, and role-based access control"
  },
  {
    icon: "Zap",
    title: "Scalable Architecture",
    description: "Microservices, load balancing, and cloud-ready infrastructure design"
  },
  {
    icon: "Bot",
    title: "AI-Ready Automation",
    description: "GPT-powered agents, RAG systems, and intelligent workflow automation"
  },
  {
    icon: "Gauge",
    title: "Performance Optimized",
    description: "Fast APIs, efficient databases, and optimized frontend experiences"
  }
];

export const services = [
  {
    title: "MERN / PERN Web Applications",
    description: "Full-stack web development with modern JavaScript frameworks",
    features: [
      "Business Websites",
      "Admin Panels",
      "MVP Development",
      "Role-based Authentication",
      "Dashboard Systems"
    ],
    icon: "Code2"
  },
  {
    title: "Java Enterprise Systems",
    description: "Robust backend solutions built for scale and security",
    features: [
      "Spring Boot",
      "JWT & OAuth2",
      "Microservices Architecture",
      "Secure REST APIs",
      "Production-ready backend"
    ],
    icon: "Server"
  },
  {
    title: "AI Chatbots & Agents",
    description: "Intelligent automation systems powered by cutting-edge AI",
    features: [
      "GPT-powered chatbots",
      "RAG on custom data",
      "Website + WhatsApp integration",
      "CRM automation",
      "AI workflow systems"
    ],
    icon: "Brain"
  }
];

export const projects = [
  {
    title: "Employee Management System",
    description: "Secure admin panel with role-based authentication and dashboard",
    fullDescription: "A comprehensive employee management platform built with React and Spring Boot. Features include secure JWT authentication, role-based access control, employee CRUD operations, attendance tracking, and advanced analytics dashboard for HR teams.",
    tech: ["React", "Spring Boot", "JWT", "PostgreSQL", "Material-UI"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
    ],
    demoLink: "#",
    features: [
      "Secure JWT-based authentication with role-based access control",
      "Employee CRUD operations with advanced filtering and search",
      "Real-time attendance tracking and leave management system",
      "Interactive analytics dashboard with charts and KPI metrics",
      "Export employee data to Excel/PDF reports"
    ]
  },
  {
    title: "COVID Data Dashboard",
    description: "Real-time analytics with CSV data processing and visualizations",
    fullDescription: "An interactive COVID-19 data analytics platform that processes CSV files to generate real-time visualizations. Built with React and Node.js, featuring dynamic charts, country-wise statistics, trend analysis, and exportable reports for health organizations.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js", "D3.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=600&fit=crop"
    ],
    demoLink: "#",
    features: [
      "CSV file upload with automatic data parsing and validation",
      "Interactive charts: line graphs, bar charts, heatmaps, and pie charts",
      "Country-wise and global statistics with filtering options",
      "Trend analysis with predictive modeling for case projections",
      "Downloadable reports in PDF and Excel formats"
    ]
  },
  {
    title: "AI Chatbot System",
    description: "RAG-based chatbot trained on business documents with WhatsApp integration",
    fullDescription: "An intelligent AI chatbot powered by GPT-4 and RAG (Retrieval-Augmented Generation) technology. Trained on custom business documents, it provides accurate responses and integrates seamlessly with websites and WhatsApp for automated customer support and lead generation.",
    tech: ["OpenAI", "LangChain", "Node.js", "WhatsApp API", "Pinecone"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
    ],
    demoLink: "#",
    features: [
      "RAG-powered chatbot trained on custom business knowledge base",
      "Seamless integration with websites and WhatsApp Business API",
      "Admin dashboard for managing conversations and analytics",
      "Automated lead capture and CRM integration",
      "Multi-language support with context-aware responses"
    ]
  }
];

export const techStack = [
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "nodejs" },
  { name: "MongoDB", icon: "database" },
  { name: "PostgreSQL", icon: "database" },
  { name: "Java", icon: "coffee" },
  { name: "Spring Boot", icon: "leaf" },
  { name: "OpenAI", icon: "brain" },
  { name: "LangChain", icon: "link" }
];

// Mock chatbot responses
export const chatbotKnowledge = {
  greeting: "Hi! I'm Sujal's AI Assistant. I can help you learn about our services, pricing, and how we can help your business. What would you like to know?",
  
  services: {
    mern: "We build full-stack MERN/PERN applications including business websites, admin panels, and MVPs. Our team ensures secure authentication, scalable architecture, and modern UI/UX. Typical timeline: 2-4 weeks depending on complexity.",
    java: "Our Java enterprise solutions use Spring Boot with JWT/OAuth2 security, microservices architecture, and production-ready APIs. Perfect for businesses needing robust, scalable backend systems. Timeline: 3-6 weeks.",
    ai: "We create intelligent AI chatbots using GPT-4, RAG on your custom data, and integrate with websites & WhatsApp. Great for lead automation, customer support, and CRM workflows. Timeline: 2-3 weeks."
  },
  
  pricing: "Our pricing ranges from ₹25,000 to ₹50,000 depending on project complexity. MERN/PERN apps start at ₹25k, Java enterprise systems at ₹35k, and AI chatbots at ₹30k. We offer flexible payment plans for startups.",
  
  team: "Sujal leads a team of 5 experienced developers specializing in MERN, Java, and AI technologies. We're based in Bhopal, India and work with clients globally.",
  
  timeline: "Most projects are completed within 2-6 weeks. MVPs and basic apps: 2-3 weeks. Complex enterprise systems: 4-6 weeks. We provide weekly updates and ensure quality delivery.",
  
  location: "We're based in Bhopal, India. We work with clients both locally and internationally, offering remote collaboration through video calls and project management tools.",
  
  contact: "You can reach Sujal directly via:\n\nEmail: pandeysujal511@gmail.com\nWhatsApp: +91 7470706635\n\nFeel free to message on WhatsApp for a quick response!",
  
  default: "I can help you with information about our services (MERN, Java, AI chatbots), pricing, timelines, or connect you with Sujal. What would you like to know?"
};

export const getChatbotResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
    return chatbotKnowledge.greeting;
  }
  
  if (message.includes('mern') || message.includes('react') || message.includes('website') || message.includes('web app')) {
    return chatbotKnowledge.services.mern;
  }
  
  if (message.includes('java') || message.includes('spring') || message.includes('backend') || message.includes('api')) {
    return chatbotKnowledge.services.java;
  }
  
  if (message.includes('ai') || message.includes('chatbot') || message.includes('automation') || message.includes('gpt')) {
    return chatbotKnowledge.services.ai;
  }
  
  if (message.includes('price') || message.includes('pricing') || message.includes('cost') || message.includes('budget')) {
    return chatbotKnowledge.pricing;
  }
  
  if (message.includes('team') || message.includes('who') || message.includes('about')) {
    return chatbotKnowledge.team;
  }
  
  if (message.includes('time') || message.includes('timeline') || message.includes('deadline') || message.includes('how long')) {
    return chatbotKnowledge.timeline;
  }
  
  if (message.includes('location') || message.includes('where') || message.includes('based')) {
    return chatbotKnowledge.location;
  }
  
  if (message.includes('contact') || message.includes('email') || message.includes('whatsapp') || message.includes('reach')) {
    return chatbotKnowledge.contact;
  }
  
  return chatbotKnowledge.default;
};
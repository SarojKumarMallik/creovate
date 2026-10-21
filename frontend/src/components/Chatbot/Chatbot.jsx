import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  Sparkles,
  RotateCcw,
  Minus,
  Maximize2,
  Minimize2,
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
  PhoneCall,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Headphones,
  MessageCircle,
} from "lucide-react";
import "./Chatbot.css";

// Audio synthesis helper for pleasant Apple-like micro-interactions
const playChime = (type, isMuted) => {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "send") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    }
  } catch (err) {
    // Ignore audio context permission issues silently
  }
};

const ENTERPRISE_CAPABILITIES = [
  {
    id: "web-dev",
    icon: Globe,
    title: "Web Architecture & SaaS",
    desc: "MERN Stack, Next.js, Cloud APIs & Custom Portals",
    badge: "Most Popular",
    query: "Tell me about your Web Development & SaaS capabilities.",
  },
  {
    id: "app-dev",
    icon: Smartphone,
    title: "Mobile App Engineering",
    desc: "Cross-platform iOS & Android apps with React Native & Flutter",
    badge: "iOS & Android",
    query: "What is your approach to Mobile App Development?",
  },
  {
    id: "ai-bot",
    icon: Cpu,
    title: "AI Chatbots & Automation",
    desc: "24/7 Autonomous AI Agents, LLM integrations & Workflows",
    badge: "AI Powered",
    query: "How can you build an AI Chatbot for my company?",
  },
  {
    id: "pricing",
    icon: Sparkles,
    title: "Project Scope & Pricing",
    desc: "Custom fixed-bid milestones, timelines & architecture estimates",
    badge: "Transparent",
    query: "How much does a typical project cost and how do you estimate?",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "SEO & Growth Engine",
    desc: "High-intent lead generation, technical SEO & conversion optimization",
    badge: "Results Driven",
    query: "What digital marketing and SEO services do you provide?",
  },
  {
    id: "contact",
    icon: Headphones,
    title: "Talk to a Senior Architect",
    desc: "Direct technical consultation via WhatsApp or phone call",
    badge: "Instant Connect",
    query: "I would like to speak directly with an engineer or manager.",
  },
];

const BOT_KNOWLEDGE = {
  greetings: {
    title: "Welcome to Creovate Technologies 👋",
    text: "Hello! I am Creovate's AI Concierge. We are a premier software engineering and AI agency based in Bhubaneswar, Odisha. We specialize in custom Web Development (MERN, React, Next.js), Mobile Apps (React Native, Flutter), and Autonomous AI Chatbots & Automations. How can we assist you with your project today?",
    highlights: [
      "Custom Full-Stack Web Development (MERN & Next.js)",
      "Native & Cross-Platform Mobile Apps (iOS & Android)",
      "Autonomous 24/7 AI Chatbots & Intelligent Agents",
      "Complimentary Technical Architecture & Discovery Session",
    ],
    techStack: ["MERN Stack", "Next.js", "AI Agents", "React Native", "Flutter", "Cloud"],
    actions: [
      { label: "Explore Web Development", href: "/service/web-development", isExternal: false },
      { label: "View All Services", href: "/service", isExternal: false },
      { label: "Chat on WhatsApp", href: "https://wa.me/919827373867?text=Hi%20Creovate,%20I'd%20like%20to%20discuss%20a%20project", isExternal: true },
    ],
  },
  mern: {
    title: "MERN Stack Architecture & Engineering",
    text: "MERN is an enterprise-grade full-stack JavaScript/TypeScript architecture comprising MongoDB, Express.js, React 19, and Node.js. At Creovate Technologies, MERN is our flagship development stack, engineered for high throughput, sub-second latency, and scalable multi-tenant web platforms.",
    highlights: [
      "MongoDB: High-performance NoSQL database for flexible data modeling and rapid queries",
      "Express.js: Lightweight, ultra-fast backend REST & GraphQL microservices",
      "React 19: Dynamic, component-driven client-side UI with seamless client state",
      "Node.js: Asynchronous event-driven server runtime handling high concurrent traffic",
      "Creovate Advantage: Production-grade JWT security, Redis caching & Docker deployment",
    ],
    techStack: ["MongoDB", "Express.js", "React 19", "Node.js", "Tailwind CSS", "REST / GraphQL"],
    actions: [
      { label: "View Web Development", href: "/service/web-development", isExternal: false },
      { label: "Build a MERN Project", href: "https://wa.me/919827373867?text=Hi%20Creovate,%20I%20want%20to%20build%20a%20MERN%20Stack%20application", isExternal: true },
      { label: "Request Tech Blueprint", href: "/contact", isExternal: false },
    ],
  },
  "web-dev": {
    title: "Full-Stack Web & SaaS Engineering",
    text: "Creovate Technologies specializes in building robust, secure, and lightning-fast web applications. We work with enterprise-grade architectures that scale seamlessly as your user base grows.",
    highlights: [
      "Custom Web Applications & SaaS Platforms (React 19, Next.js, Node.js)",
      "High-converting corporate websites with sub-second page loads",
      "Headless CMS, E-Commerce, and secure RESTful & GraphQL APIs",
      "SEO-first semantic structure and responsive cross-browser testing",
    ],
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    actions: [
      { label: "View Web Development", href: "/service/web-development", isExternal: false },
      { label: "Consult on WhatsApp", href: "https://wa.me/919827373867?text=Hi%20Creovate,%20I'm%20looking%20for%20Web%20Development%20services", isExternal: true },
    ],
  },
  "app-dev": {
    title: "Cross-Platform Mobile App Development",
    text: "We build intuitive, fluid mobile applications for iOS and Android. Our team ensures that your product delivers native-grade performance with clean modular codebases.",
    highlights: [
      "Cross-platform efficiency using React Native & Flutter",
      "Native device integration (Biometrics, Push Notifications, Camera, GPS)",
      "Offline-first sync architectures with encrypted local storage",
      "Full App Store & Google Play submission management",
    ],
    techStack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin", "Firebase"],
    actions: [
      { label: "Explore Services", href: "/service", isExternal: false },
      { label: "Discuss App Concept", href: "https://wa.me/919827373867?text=Hi%20Creovate,%20I%20have%20an%20app%20idea%20to%20discuss", isExternal: true },
    ],
  },
  "ai-bot": {
    title: "Enterprise AI Agents & Custom Chatbots",
    text: "We design and deploy autonomous AI assistants that integrate directly with your company's data, CRM, and customer support channels to automate operations 24/7.",
    highlights: [
      "RAG-powered conversational chatbots using OpenAI / Gemini / Claude models",
      "Website customer support & lead qualification automation",
      "WhatsApp & CRM multi-channel integration",
      "Private data grounding with strict data security protocols",
    ],
    techStack: ["OpenAI API", "Gemini AI", "LangChain", "Vector DBs", "Python", "Node.js"],
    actions: [
      { label: "Request AI Consultation", href: "/contact", isExternal: false },
      { label: "WhatsApp AI Demo", href: "https://wa.me/919827373867?text=Hello%20Creovate,%20I'd%20like%20to%20see%20an%20AI%20Chatbot%20demo", isExternal: true },
    ],
  },
  pricing: {
    title: "Project Estimations & Scope",
    text: "We offer transparent, milestone-based pricing with no hidden costs. Every project begins with a structured discovery phase to define clear deliverables, tech stack, and delivery milestones.",
    highlights: [
      "Custom quotes tailored precisely to your functional requirements",
      "Flexible engagement models: Fixed Bid or Dedicated Engineering Sprint",
      "Comprehensive warranty & post-launch support included",
      "Complimentary technical discovery and architectural blueprint",
    ],
    techStack: ["Free Estimate", "Transparent Milestones", "Fast Turnaround"],
    actions: [
      { label: "Get a Free Project Quote", href: "/contact", isExternal: false },
      { label: "Instant Quote on WhatsApp", href: "https://wa.me/919827373867?text=Hi%20Creovate,%20I'd%20like%20a%20price%20quote%20for%20my%20project", isExternal: true },
    ],
  },
  marketing: {
    title: "SEO, Performance & Growth Marketing",
    text: "Building great software is half the journey; getting customers is the other. Our growth specialists implement data-backed organic and paid strategies to drive high-intent inquiries.",
    highlights: [
      "Core Web Vitals & Technical SEO optimization for top Google ranking",
      "High-converting landing page design and A/B conversion rate optimization",
      "Data analytics setup (Google Analytics 4, Tag Manager, Heatmaps)",
      "Targeted Google & Meta advertising campaigns",
    ],
    techStack: ["Technical SEO", "Google Ads", "Conversion Rate Opt", "GA4"],
    actions: [
      { label: "Request SEO Audit", href: "/contact", isExternal: false },
      { label: "WhatsApp Growth Lead", href: "https://wa.me/919827373867?text=Hi%20Creovate,%20I'm%20interested%20in%20SEO%20and%20marketing", isExternal: true },
    ],
  },
  career: {
    title: "Careers & Internships at Creovate",
    text: "We are always looking for passionate full-stack developers, mobile engineers, UI/UX designers, and AI enthusiasts to build impactful software products with us.",
    highlights: [
      "Open roles in MERN Stack, React Native, AI Agents, and Growth Marketing",
      "Hands-on architectural ownership and enterprise client projects",
      "Competitive compensation with continuous learning and mentorship",
    ],
    techStack: ["Full-Time", "Internships", "Hybrid / Remote", "Bhubaneswar"],
    actions: [
      { label: "View Careers Page", href: "/career", isExternal: false },
      { label: "Send Resume via Email", href: "mailto:creovatetechnologies@gmail.com?subject=Job%20Application%20at%20Creovate", isExternal: true },
    ],
  },
  about: {
    title: "About Creovate Technologies",
    text: "Creovate Technologies is a digital engineering agency based in Bhubaneswar, Odisha, India. We empower businesses globally with high-impact software, scalable web systems, mobile apps, and autonomous AI automations.",
    highlights: [
      "Headquarters: Bhubaneswar, Odisha, India",
      "Global delivery model serving startups and enterprises worldwide",
      "Agile sprints, rigorous QA testing, and clean maintainable code",
      "Direct technical consultation with project architects",
    ],
    techStack: ["Bhubaneswar, Odisha", "Global Delivery", "Agile Sprints", "ISO Standards"],
    actions: [
      { label: "About Us", href: "/about", isExternal: false },
      { label: "Contact Us", href: "/contact", isExternal: false },
      { label: "Chat on WhatsApp", href: "https://wa.me/919827373867", isExternal: true },
    ],
  },
  contact: {
    title: "Connect with Creovate Leadership",
    text: "Our headquarters is based in Bhubaneswar, Odisha, serving domestic and international clients with modern digital solutions. You can reach our senior technical leads directly:",
    highlights: [
      "Direct Hotline / WhatsApp: +91 98273 73867",
      "Official Email: creovatetechnologies@gmail.com",
      "Headquarters: Bhubaneswar, Odisha, India",
      "Typical response time: Under 15 minutes during business hours",
    ],
    techStack: ["Phone", "WhatsApp", "Email", "Office"],
    actions: [
      { label: "Direct Phone Call", href: "tel:+919827373867", isExternal: true },
      { label: "Connect on WhatsApp", href: "https://wa.me/919827373867", isExternal: true },
      { label: "Submit Contact Form", href: "/contact", isExternal: false },
    ],
  },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState("Analyzing requirement...");
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState({});

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isExpanded]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setShowTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Teaser preview: appears for 5 seconds on load, then slowly disappears
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId, type) => {
    setFeedbackGiven((prev) => ({ ...prev, [msgId]: type }));
  };

  const generateBotReply = (userText) => {
    const textLower = userText.toLowerCase().trim();

    let matchedKey = null;

    // Greetings check (matches "hi", "hii", "hello", "hey", etc.)
    if (/\b(hi|hii|hello|hey|namaste|greetings|hola|good morning|good afternoon|good evening|sup|yo)\b/i.test(textLower)) {
      matchedKey = "greetings";
    }
    // MERN Stack specific check
    else if (textLower.includes("mern") || textLower.includes("mongodb") || textLower.includes("mongo") || textLower.includes("express") || (textLower.includes("react") && textLower.includes("node"))) {
      matchedKey = "mern";
    }
    // AI Chatbots & Agents
    else if (textLower.includes("ai") || textLower.includes("chat") || textLower.includes("bot") || textLower.includes("agent") || textLower.includes("rag") || textLower.includes("llm") || textLower.includes("gpt") || textLower.includes("gemini")) {
      matchedKey = "ai-bot";
    }
    // Web Development & SaaS
    else if (textLower.includes("web") || textLower.includes("site") || textLower.includes("react") || textLower.includes("next") || textLower.includes("frontend") || textLower.includes("backend") || textLower.includes("saas") || textLower.includes("portal")) {
      matchedKey = "web-dev";
    }
    // Mobile Apps
    else if (textLower.includes("app") || textLower.includes("mobile") || textLower.includes("ios") || textLower.includes("android") || textLower.includes("flutter") || textLower.includes("react native")) {
      matchedKey = "app-dev";
    }
    // Pricing & Quotes
    else if (textLower.includes("cost") || textLower.includes("price") || textLower.includes("quote") || textLower.includes("budget") || textLower.includes("rate") || textLower.includes("package") || textLower.includes("how much") || textLower.includes("estimate")) {
      matchedKey = "pricing";
    }
    // SEO & Marketing
    else if (textLower.includes("seo") || textLower.includes("market") || textLower.includes("growth") || textLower.includes("rank") || textLower.includes("traffic") || textLower.includes("ads") || textLower.includes("campaign")) {
      matchedKey = "marketing";
    }
    // Careers & Jobs
    else if (textLower.includes("job") || textLower.includes("career") || textLower.includes("intern") || textLower.includes("hiring") || textLower.includes("vacancy") || textLower.includes("opening") || textLower.includes("apply") || textLower.includes("resume")) {
      matchedKey = "career";
    }
    // About & Company
    else if (textLower.includes("about") || textLower.includes("who are you") || textLower.includes("company") || textLower.includes("bhubaneswar") || textLower.includes("odisha") || textLower.includes("location") || textLower.includes("office") || textLower.includes("address")) {
      matchedKey = "about";
    }
    // Contact & Inquiries
    else if (textLower.includes("contact") || textLower.includes("call") || textLower.includes("email") || textLower.includes("phone") || textLower.includes("number") || textLower.includes("whatsapp") || textLower.includes("reach") || textLower.includes("talk") || textLower.includes("speak")) {
      matchedKey = "contact";
    }

    if (matchedKey && BOT_KNOWLEDGE[matchedKey]) {
      return BOT_KNOWLEDGE[matchedKey];
    }

    return {
      title: "Creovate Engineering Discovery",
      text: "Thank you for reaching out to Creovate Technologies! We design, architect, and deploy custom digital solutions—ranging from full-stack Web & MERN platforms to native/cross-platform Mobile Apps and Autonomous AI Chatbots. To discuss your exact requirements and get an architectural estimate, connect directly with our technical team.",
      highlights: [
        "Custom Web, Mobile & Enterprise AI Architecture",
        "Direct 1-on-1 discovery with senior technical architects",
        "Milestone-based delivery with continuous code deployment",
      ],
      techStack: ["Web Systems", "Mobile Apps", "AI Automation", "Cloud"],
      actions: [
        { label: "Discuss on WhatsApp", href: `https://wa.me/919827373867?text=Hi%20Creovate,%20I'm%20inquiring%20about:%20${encodeURIComponent(userText)}`, isExternal: true },
        { label: "Book a Discovery Call", href: "/contact", isExternal: false },
      ],
    };
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    playChime("send", isMuted);

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);
    setTypingStatus("Analyzing requirement...");

    const phase1 = setTimeout(() => {
      setTypingStatus("Evaluating architecture & technical scope...");
    }, 1800);

    const phase2 = setTimeout(() => {
      setTypingStatus("Finalizing recommendation...");
    }, 3600);

    try {
      const rawApi = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const cleanApi = rawApi.replace(/\/api\/?$/, "");
      const apiUrl = isLocal ? "http://localhost:5000" : cleanApi;

      // Start the 5-second requirement analysis timer to deliver a thoughtful, polished user experience
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 5000));

      let serverReply = null;
      try {
        const response = await axios.post(
          `${apiUrl}/api/chat`,
          {
            message: query,
            conversationHistory: messages,
          },
          { timeout: 7000 }
        );
        if (response?.data?.reply) {
          serverReply = response.data.reply;
        }
      } catch (err) {
        // Backend or OpenAI offline/quota reached; gracefully fall back to local trained knowledge
      }

      await delayPromise;

      clearTimeout(phase1);
      clearTimeout(phase2);

      const botResponse = generateBotReply(query);
      const displayText = serverReply || botResponse.text;

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        title: botResponse.title,
        text: displayText,
        highlights: botResponse.highlights,
        techStack: botResponse.techStack,
        actions: botResponse.actions,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setTypingStatus("Analyzing requirement...");
      playChime("reply", isMuted);
    } catch (err) {
      clearTimeout(phase1);
      clearTimeout(phase2);

      const botResponse = generateBotReply(query);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        title: botResponse.title,
        text: botResponse.text,
        highlights: botResponse.highlights,
        techStack: botResponse.techStack,
        actions: botResponse.actions,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setTypingStatus("Analyzing requirement...");
      playChime("reply", isMuted);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return (
    <>
      {/* ================= FLOATING TEASER PREVIEW (Auto-disappears after 5s) ================= */}
      <AnimatePresence>
        {!isOpen && showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.94,
              transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-[998] max-w-[290px] sm:max-w-[320px] bg-slate-950/95 backdrop-blur-2xl text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-800/90 cursor-pointer group overflow-hidden"
            onClick={() => setIsOpen(true)}
            style={{
              boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.5), 0 0 20px rgba(15, 23, 42, 0.2)",
            }}
          >
            {/* Top ambient highlight line */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

            {/* Micro 5-second progress decay bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-800/60 overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-slate-400 to-slate-200"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white rounded-full flex items-center justify-center border border-slate-700 shadow-md transition"
              aria-label="Dismiss preview"
            >
              <X size={11} />
            </button>

            <div className="flex items-start gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot size={19} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold tracking-tight text-white truncate">Creovate Concierge</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug font-normal line-clamp-2">
                  Looking for Web, Mobile App, or AI solutions? Chat with us.
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-200 group-hover:text-white transition">
                  <span>Start conversation</span>
                  <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING LAUNCHER BUTTON (Visible when chat is closed) ================= */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[999] flex items-center">
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-950 border border-slate-700/80 hover:border-slate-500 launcher-ambient-glow text-white shadow-2xl flex items-center justify-center transition-all duration-300"
              aria-label="Open AI Concierge"
            >
              <MessageSquare size={22} className="text-white" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* ================= CHATBOT CONCIERGE WINDOW ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: isExpanded ? "min(620px, calc(100vw - 1.5rem))" : "min(410px, calc(100vw - 1.5rem))",
              height: isExpanded ? "min(650px, calc(100dvh - 120px))" : "min(530px, calc(100dvh - 130px))",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-[1000] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden backdrop-blur-2xl max-h-[calc(100dvh-110px)]"
            style={{
              boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(15, 23, 42, 0.08)",
            }}
          >
            {/* ================= HEADER ================= */}
            <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-zinc-950 text-white p-4 sm:p-5 select-none overflow-hidden">
              {/* Subtle top ambient glow bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-md flex items-center justify-center flex-shrink-0">
                    <Bot size={22} className="text-white" />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                      Creovate Concierge
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      Senior Technical Advisory • Instant Response
                    </p>
                  </div>
                </div>

                {/* Header Action Tools */}
                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    className="p-2 hover:text-white hover:bg-white/10 rounded-xl transition duration-150"
                    aria-label="Sound Toggle"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <button
                    onClick={handleReset}
                    title="Reset Conversation"
                    className="p-2 hover:text-white hover:bg-white/10 rounded-xl transition duration-150"
                    aria-label="Reset Conversation"
                  >
                    <RotateCcw size={15} />
                  </button>

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Standard Size" : "Expand Size"}
                    className="p-2 hover:text-white hover:bg-white/10 rounded-xl transition duration-150 hidden sm:block"
                    aria-label="Expand Window"
                  >
                    {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    className="p-2 hover:text-white hover:bg-white/10 rounded-xl transition duration-150"
                    aria-label="Close Chat"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* ================= CHAT STREAM ================= */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 chat-pattern-bg chat-custom-scroll text-sm">
              {/* Executive Welcome Card (Displayed when no user conversation yet or at top) */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Hero Introduction Banner */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        <Sparkles size={12} className="text-slate-700" />
                        Next-Gen Digital Solutions
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      How can Creovate accelerate your digital roadmap?
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      We engineer high-performance web applications, cross-platform mobile apps, and custom AI chatbots tailored to your enterprise needs.
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-500" /> Free Discovery & Consultation
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <ShieldCheck size={13} className="text-emerald-600" /> Fixed-Bid Milestones
                      </span>
                    </div>
                  </div>

                  {/* Capability Cards Selection Grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {ENTERPRISE_CAPABILITIES.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSendMessage(item.query)}
                          className="w-full text-left p-3.5 bg-white/95 hover:bg-white rounded-2xl border border-slate-200/70 hover:border-slate-400 shadow-xs interactive-card-glow group transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-900 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0 shadow-2xs">
                                <Icon size={17} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                                    {item.title}
                                  </span>
                                  <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                            <ChevronRight size={15} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Message History */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%]">
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white flex-shrink-0 shadow-sm mb-1">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-2xl shadow-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-slate-900 text-white rounded-br-xs font-medium text-[13.5px] shadow-slate-900/20 border border-slate-800"
                          : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-sm"
                      }`}
                    >
                      {/* Bot Title Header */}
                      {msg.title && (
                        <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-900 tracking-tight">
                            {msg.title}
                          </span>
                        </div>
                      )}

                      <p className="whitespace-pre-line text-[13px] text-slate-700 leading-relaxed font-normal">
                        {msg.text}
                      </p>

                      {/* Highlights Bullet List */}
                      {msg.highlights && msg.highlights.length > 0 && (
                        <div className="mt-3 space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                          {msg.highlights.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[12px] text-slate-700">
                              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {msg.techStack && msg.techStack.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {msg.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10.5px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action CTAs */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                          {msg.actions.map((act, i) => (
                            <a
                              key={i}
                              href={act.href}
                              target={act.isExternal ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white rounded-xl transition duration-200 border border-slate-200/90 shadow-2xs group"
                            >
                              <span>{act.label}</span>
                              {act.isExternal ? (
                                <ExternalLink size={11} className="opacity-70 group-hover:opacity-100" />
                              ) : (
                                <ArrowRight size={11} className="opacity-70 group-hover:opacity-100" />
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Meta Info (Timestamp, Copy & Feedback) */}
                  <div
                    className={`flex items-center gap-2 mt-1 px-1 text-[10.5px] text-slate-400 ${
                      msg.sender === "user" ? "justify-end" : "justify-start ml-10"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === "bot" && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => handleCopy(msg.id, `${msg.title ? msg.title + "\n" : ""}${msg.text}`)}
                          className="hover:text-slate-700 flex items-center gap-1 transition"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={11} className="text-emerald-500" />
                              <span className="text-emerald-600 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleFeedback(msg.id, "up")}
                            className={`p-0.5 rounded hover:text-slate-700 transition ${
                              feedbackGiven[msg.id] === "up" ? "text-emerald-500" : ""
                            }`}
                            title="Helpful"
                          >
                            <ThumbsUp size={11} />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, "down")}
                            className={`p-0.5 rounded hover:text-slate-700 transition ${
                              feedbackGiven[msg.id] === "down" ? "text-rose-500" : ""
                            }`}
                            title="Not helpful"
                          >
                            <ThumbsDown size={11} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing State */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0 animate-pulse">
                    <Bot size={15} />
                  </div>
                  <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    <span className="text-xs text-slate-500 font-medium ml-1 transition-all duration-300">
                      {typingStatus}
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>


            {/* ================= INPUT DOCK ================= */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about web, mobile apps, AI or pricing..."
                    disabled={isTyping}
                    className="w-full pl-4 pr-3 py-3 bg-slate-50 focus:bg-white text-slate-800 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all placeholder:text-slate-400 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="h-11 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed shadow-md shadow-slate-900/10 flex-shrink-0 font-semibold text-xs border border-slate-700"
                  aria-label="Send query"
                >
                  <Send size={15} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>

              {/* Enterprise Trust Footer */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-500" />
                  Creovate Enterprise AI • Verified Senior Advisory
                </span>
                <span className="hidden sm:inline text-slate-300">
                  Press ↵ Enter to send
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import OpenAI from "openai";

const CREOVATE_SYSTEM_PROMPT = `
You are the AI Concierge for Creovate Technologies, a leading website development, mobile application, AI automation, and digital marketing agency based in Bhubaneswar, Odisha, India.

Your Responsibilities:
1. Answer client questions accurately, politely, and professionally.
2. Introduce Creovate's core services when relevant:
   - Web Development: Custom MERN stack (React, Node, Express, MongoDB), Next.js, e-commerce, cloud architecture, and high-performance websites.
   - Mobile App Development: Native and cross-platform apps for iOS and Android using Flutter and React Native.
   - AI Chatbots & Automation: 24/7 autonomous agents, custom RAG integrations, LLMs, and workflow automations.
   - SEO & Digital Marketing: Technical SEO, Google/Meta Ads, and conversion optimization.
   - Custom Software & SaaS solutions.
3. Pricing & Project Estimates:
   - Creovate offers milestone-based, transparent pricing tailored to project requirements with free initial discovery.
4. Contact & Consultation:
   - Phone / WhatsApp: +91 98273 73867
   - Email: creovatetechnologies@gmail.com
   - Location: Bhubaneswar, Odisha, India
5. Format Guidelines:
   - Keep answers clear, engaging, and concise (under 3-4 short paragraphs or bullet points).
   - Offer to connect on WhatsApp or schedule a consultation whenever appropriate.
`;

export const handleChat = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid message is required.",
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API Key is not configured on the server.",
      });
    }

    const openai = new OpenAI({ apiKey });

    // Build context with system prompt and recent conversation history (up to last 6 messages)
    const messages = [
      { role: "system", content: CREOVATE_SYSTEM_PROMPT },
      ...conversationHistory.slice(-6).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text || "",
      })),
      { role: "user", content: message.trim() },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "Thank you for reaching out. Please connect with our team directly on WhatsApp (+91 98273 73867).";

    return res.status(200).json({
      success: true,
      reply,
      source: "openai",
    });
  } catch (error) {
    console.error("OpenAI Chat Notice:", error?.message || error);

    // Smart fallback if OpenAI credits are 0 or rate-limited
    const q = req.body?.message?.toLowerCase().trim() || "";
    let fallbackReply = "Thank you for reaching out to Creovate Technologies! We specialize in custom full-stack Web Development (MERN, Next.js), Mobile Apps (React Native, Flutter), Autonomous AI Agents, and Growth Marketing. Reach our senior architects directly on WhatsApp at +91 98273 73867 or email creovatetechnologies@gmail.com.";

    // Greetings
    if (/\b(hi|hii|hello|hey|namaste|greetings|hola|good morning|good afternoon|good evening|sup|yo)\b/i.test(q)) {
      fallbackReply = "Hello! 👋 Welcome to Creovate Technologies. We are a premier software engineering and AI agency based in Bhubaneswar, Odisha. We design and build enterprise Web Applications (MERN & Next.js), Native/Cross-platform Mobile Apps (React Native & Flutter), and Autonomous AI Agents. How can we help turn your idea into reality today?";
    }
    // MERN Stack
    else if (q.includes("mern") || q.includes("mongodb") || q.includes("express") || (q.includes("react") && q.includes("node"))) {
      fallbackReply = "MERN Stack is a premier full-stack JavaScript architecture comprising MongoDB (NoSQL Database), Express.js (High-performance API framework), React 19 (Component-driven dynamic UI), and Node.js (Scalable event-driven runtime). At Creovate Technologies, we engineer enterprise-grade MERN web apps, SaaS platforms, and custom business portals with sub-second response times, JWT security, and cloud scalability. Connect with us on WhatsApp at +91 98273 73867 to architect your MERN application.";
    }
    // AI Chatbots & Agents
    else if (q.includes("ai") || q.includes("chat") || q.includes("bot") || q.includes("agent") || q.includes("rag") || q.includes("llm")) {
      fallbackReply = "Creovate Technologies engineers autonomous, 24/7 Enterprise AI Chatbots and intelligent agents. We integrate state-of-the-art models (OpenAI GPT, Gemini, Claude) with your business data, documents, CRM, and WhatsApp using secure RAG (Retrieval-Augmented Generation) pipelines. Reach us on WhatsApp at +91 98273 73867 to schedule an interactive AI demo for your business.";
    }
    // Web Development
    else if (q.includes("web") || q.includes("site") || q.includes("react") || q.includes("next") || q.includes("frontend") || q.includes("backend") || q.includes("saas") || q.includes("portal")) {
      fallbackReply = "Creovate Technologies architects modern, high-performance web applications using MERN Stack, Next.js, and cloud systems. We offer custom web development, corporate portals, e-commerce, and high-concurrency SaaS platforms with SEO-first semantic design. Contact us on WhatsApp at +91 98273 73867 for a free technical consultation.";
    }
    // Mobile Apps
    else if (q.includes("app") || q.includes("mobile") || q.includes("flutter") || q.includes("ios") || q.includes("android") || q.includes("react native")) {
      fallbackReply = "We develop cross-platform and native mobile apps for iOS and Android using React Native and Flutter. We manage everything from UI/UX design to biometrics, camera/GPS integrations, and App Store / Google Play deployment. Reach out on WhatsApp (+91 98273 73867) to discuss your mobile app concept.";
    }
    // Pricing & Quotes
    else if (q.includes("price") || q.includes("cost") || q.includes("quote") || q.includes("budget") || q.includes("rate") || q.includes("estimate") || q.includes("how much")) {
      fallbackReply = "Our pricing is transparent, flexible, and milestone-based with no hidden fees. We offer fixed-bid milestone contracts as well as dedicated sprint engagements, accompanied by a complimentary architectural discovery phase. Reach our team on WhatsApp at +91 98273 73867 or book a call on our contact page to get a customized estimate.";
    }
    // SEO & Marketing
    else if (q.includes("seo") || q.includes("market") || q.includes("growth") || q.includes("rank") || q.includes("traffic") || q.includes("ads") || q.includes("google ads")) {
      fallbackReply = "Our growth and SEO team helps companies scale inbound traffic and qualified leads. We provide Core Web Vitals optimization, programmatic SEO, conversion-rate optimization (CRO), and high-ROI Google & Meta ad campaigns. Inquire on WhatsApp at +91 98273 73867 to get a free website audit.";
    }
    // Careers & Jobs
    else if (q.includes("job") || q.includes("career") || q.includes("intern") || q.includes("hiring") || q.includes("opening") || q.includes("apply") || q.includes("vacancy")) {
      fallbackReply = "Creovate Technologies is actively hiring talented MERN developers, mobile engineers, AI researchers, and digital growth specialists. Check our open roles on our Careers page or email your resume directly to creovatetechnologies@gmail.com with your portfolio and experience.";
    }
    // About & Company
    else if (q.includes("about") || q.includes("who are you") || q.includes("company") || q.includes("bhubaneswar") || q.includes("odisha") || q.includes("location") || q.includes("office") || q.includes("address")) {
      fallbackReply = "Creovate Technologies is a digital engineering and technology consultancy headquartered in Bhubaneswar, Odisha, India. We partner with startups and forward-thinking enterprises globally to design, build, and scale world-class software, mobile apps, and autonomous AI systems. Contact us at +91 98273 73867 or visit our office in Bhubaneswar.";
    }
    // Contact & Inquiries
    else if (q.includes("contact") || q.includes("call") || q.includes("phone") || q.includes("email") || q.includes("number") || q.includes("whatsapp") || q.includes("reach") || q.includes("talk") || q.includes("speak")) {
      fallbackReply = "You can connect directly with our technical leads via WhatsApp or phone call at +91 98273 73867, email us at creovatetechnologies@gmail.com, or submit a message on our Contact page. Our team typically replies within 15 minutes during business hours.";
    }

    return res.status(200).json({
      success: true,
      reply: fallbackReply,
      source: "fallback",
      notice: error?.status === 429 ? "OpenAI quota reached. Please add credits at platform.openai.com." : undefined,
    });
  }
};

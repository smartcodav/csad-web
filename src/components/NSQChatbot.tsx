import { MessageCircle, Send, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const PORTAL_URL = (import.meta.env.VITE_PORTAL_URL || 'https://csadportal.com').replace(/\/$/, '');

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
    cta?: { label: string; url: string };
}

const NSQ_FAQ = {
    greetings: {
        patterns: ['hello', 'hi', 'hey', 'greetings'],
        responses: [
            "Hello! Welcome to CSAD's NSQ Certification Portal. I can answer questions about NSQ certification, pricing, available skills, and registration - and get you enrolled today. What would you like to know?",
        ],
    },
    what_is_nsq: {
        patterns: ['what is nsq', 'nsq certification', 'what is national skills qualification'],
        responses: [
            "The National Skills Qualification (NSQ) is a work-related, competence-based credential issued by recognized Awarding Bodies under NBTE. Unlike ND or HND, it certifies that you can actually DO the job - assessed at the training centre and on the job, with no minimum academic entry requirement. Ready to get certified?",
        ],
        cta: { label: 'Start Your NSQ Application', url: PORTAL_URL },
    },
    skills_offered: {
        patterns: ['what skills', 'available skills', 'what can i learn', 'nsq trades'],
        responses: [
            "We offer 30+ NSQ-certified skills including: Aluminum Fabrication, Aquaculture, Automobile Maintenance, Carpentry & Joinery, Computer Hardware Maintenance, Cosmetology, Crop Production, Electrical Installation, Garment Making, Hospitality & Catering, Masonry, Photography, Plumbing, Web Application Development, Welding & Fabrication, and many more! Browse the full list and pick yours on the portal.",
        ],
        cta: { label: 'Browse All Skills & Enroll', url: PORTAL_URL },
    },
    registration: {
        patterns: ['how to register', 'register', 'registration process', 'sign up', 'enroll', 'apply', 'get started', 'how do i start'],
        responses: [
            "Registering is quick: head to the CSAD Portal, create your account, select your skill of interest, and begin your training journey the same day. No minimum academic qualification is required! Click below to get started right now.",
        ],
        cta: { label: 'Register on the Portal', url: PORTAL_URL },
    },
    pricing: {
        patterns: ['price', 'cost', 'fee', 'how much', 'payment', 'tuition'],
        responses: [
            "Fees vary by skill and are kept affordable to maximize access. The exact, up-to-date pricing for your chosen trade - plus any active discounts - is shown on the portal during registration.",
        ],
        cta: { label: 'View Fees & Enroll', url: PORTAL_URL },
    },
    entry_requirement: {
        patterns: ['entry requirement', 'qualification', 'minimum requirement', 'do i need'],
        responses: [
            "Great news! The NSQ certification has NO MINIMUM ACADEMIC ENTRY REQUIREMENT. This makes it accessible to everyone regardless of their educational background. We assess you based on hands-on competence and practical skills. There's nothing stopping you from applying today.",
        ],
        cta: { label: 'Apply Now', url: PORTAL_URL },
    },
    assessment: {
        patterns: ['assessment', 'how am i assessed', 'examination', 'test'],
        responses: [
            "NSQ assessment is competence-based and practical. You're assessed at the training centre and on the job to ensure you can actually perform the skills. This real-world evaluation means the certificate truly reflects your ability to do the work.",
        ],
    },
    benefits: {
        patterns: ['benefits', 'why nsq', 'advantages', 'what do i get', 'job', 'career', 'employment'],
        responses: [
            "NSQ certification benefits include:\n• Nationally recognized credential proving hands-on competence\n• Increased employability and job opportunities\n• Opens doors to self-employment and business licensing\n• Builds confidence in your skills\n• Assessed at your own pace in the skill you practice\n• Compliance with national standards for employers\n\nThe sooner you enroll, the sooner you can start building these skills.",
        ],
        cta: { label: 'Enroll Now', url: PORTAL_URL },
    },
    institution: {
        patterns: ['csad', 'centre for skills', 'who are you', 'about csad'],
        responses: [
            "CSAD - Centre for Skills Acquisition and Development - operates under Federal Polytechnic, Ado-Ekiti. We're committed to driving Nigeria's skills development and providing access to nationally recognized NSQ certification across 30+ hands-on trades. All applications and student accounts are managed on our portal.",
        ],
        cta: { label: 'Visit the CSAD Portal', url: PORTAL_URL },
    },
    contact: {
        patterns: ['contact', 'support', 'help desk', 'talk to someone', 'login', 'sign in'],
        responses: [
            "You can reach support and manage your account directly on the CSAD Portal - it's also where you log in, check application status, and make payments.",
        ],
        cta: { label: 'Go to Portal', url: PORTAL_URL },
    },
    default: {
        patterns: [],
        responses: [
            "I appreciate your question! While I'm specifically trained to answer questions about NSQ certification and our programs, I might not have the exact answer here. For registration, pricing, and full details, the CSAD Portal is the best place to look - or ask me about NSQ skills, benefits, or how to enroll.",
        ],
        cta: { label: 'Visit CSAD Portal', url: PORTAL_URL },
    },
};

const SUGGESTIONS = ['What skills can I learn?', 'How much does it cost?', 'How do I register?'];

export default function NSQChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: "Hello! 👋 I'm the CSAD NSQ Assistant. I can answer questions about NSQ certification, available skills, registration, and the assessment process. How can I help you today?",
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Close chatbot with ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Close chatbot when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (chatBoxRef.current && !chatBoxRef.current.contains(e.target as Node)) {
                const isButton = (e.target as HTMLElement).closest('button');
                if (!isButton) {
                    setIsOpen(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const findResponse = (userMessage: string): { content: string; cta?: { label: string; url: string } } => {
        const normalizedMessage = userMessage.toLowerCase().trim();

        for (const [key, faqItem] of Object.entries(NSQ_FAQ)) {
            if (key === 'default') continue;
            for (const pattern of faqItem.patterns) {
                if (normalizedMessage.includes(pattern)) {
                    return {
                        content: faqItem.responses[Math.floor(Math.random() * faqItem.responses.length)],
                        cta: 'cta' in faqItem ? faqItem.cta : undefined,
                    };
                }
            }
        }

        return { content: NSQ_FAQ.default.responses[0], cta: NSQ_FAQ.default.cta };
    };

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: text,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response delay
        setTimeout(() => {
            const { content, cta } = findResponse(text);
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content,
                cta,
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 500);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all hover:scale-110 z-40"
                title="Open chatbot"
            >
                <MessageCircle className="h-6 w-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)] rounded-2xl shadow-2xl bg-white flex flex-col z-50" ref={chatBoxRef}>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b bg-gradient-to-r from-primary to-purple-700 px-4 py-3 rounded-t-2xl flex-shrink-0">
                <div>
                    <h3 className="font-bold text-white">CSAD NSQ Assistant</h3>
                    <p className="text-xs text-white/80">Powered by AI</p>
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href={PORTAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary hover:bg-white/90 transition-all active:scale-95"
                    >
                        Enroll Now
                    </a>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-all active:scale-95"
                        title="Close (ESC)"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs rounded-lg px-4 py-2 text-sm ${message.type === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-white border border-gray-200 text-foreground rounded-bl-none'
                                }`}
                        >
                            {message.content.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                            {message.cta && (
                                <a
                                    href={message.cta.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition-colors"
                                >
                                    {message.cta.label} →
                                </a>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length < 2 && (
                <div className="flex flex-wrap gap-2 px-4 pb-2 flex-shrink-0">
                    {SUGGESTIONS.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => sendMessage(suggestion)}
                            className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary hover:bg-primary/10 transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="border-t p-4 flex gap-2 flex-shrink-0"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about NSQ certification..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                    title="Send message"
                >
                    <Send className="h-4 w-4" />
                </button>
            </form>
        </div>
    );
}

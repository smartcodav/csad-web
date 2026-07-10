import { MessageCircle, Send, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
}

const NSQ_FAQ = {
    greetings: {
        patterns: ['hello', 'hi', 'hey', 'greetings'],
        responses: [
            "Hello! Welcome to CSAD's NSQ Certification Portal. How can I assist you today? I can answer questions about NSQ certification, available skills, registration process, and more.",
        ],
    },
    what_is_nsq: {
        patterns: ['what is nsq', 'nsq certification', 'what is national skills qualification'],
        responses: [
            "The National Skills Qualification (NSQ) is a work-related, competence-based credential issued by recognized Awarding Bodies under NBTE. Unlike ND or HND, it certifies that you can actually DO the job - assessed at the training centre and on the job, with no minimum academic entry requirement.",
        ],
    },
    skills_offered: {
        patterns: ['what skills', 'available skills', 'what can i learn', 'nsq trades'],
        responses: [
            "We offer 30+ NSQ-certified skills including: Aluminum Fabrication, Aquaculture, Automobile Maintenance, Carpentry & Joinery, Computer Hardware Maintenance, Cosmetology, Crop Production, Electrical Installation, Garment Making, Hospitality & Catering, Masonry, Photography, Plumbing, Web Application Development, Welding & Fabrication, and many more!",
        ],
    },
    registration: {
        patterns: ['how to register', 'register', 'registration process', 'sign up'],
        responses: [
            "To register for NSQ certification, click on 'Student Login' on our homepage. You'll be directed to our secure portal where you can create an account, select your skill of interest, and begin your training journey. No minimum academic qualification is required!",
        ],
    },
    entry_requirement: {
        patterns: ['entry requirement', 'qualification', 'minimum requirement', 'do i need'],
        responses: [
            "Great news! The NSQ certification has NO MINIMUM ACADEMIC ENTRY REQUIREMENT. This makes it accessible to everyone regardless of their educational background. We assess you based on hands-on competence and practical skills.",
        ],
    },
    assessment: {
        patterns: ['assessment', 'how am i assessed', 'examination', 'test'],
        responses: [
            "NSQ assessment is competence-based and practical. You're assessed at the training centre and on the job to ensure you can actually perform the skills. This real-world evaluation means the certificate truly reflects your ability to do the work.",
        ],
    },
    benefits: {
        patterns: ['benefits', 'why nsq', 'advantages', 'what do i get'],
        responses: [
            "NSQ certification benefits include:\n• Nationally recognized credential proving hands-on competence\n• Increased employability and job opportunities\n• Opens doors to self-employment and business licensing\n• Builds confidence in your skills\n• Assessed at your own pace in the skill you practice\n• Compliance with national standards for employers",
        ],
    },
    institution: {
        patterns: ['csad', 'centre for skills', 'who are you', 'about csad'],
        responses: [
            "CSAD - Centre for Skills Acquisition and Development - operates under Federal Polytechnic, Ado-Ekiti. We're committed to driving Nigeria's skills development and providing access to nationally recognized NSQ certification across 30+ hands-on trades.",
        ],
    },
    default: {
        patterns: [],
        responses: [
            "I appreciate your question! While I'm specifically trained to answer questions about NSQ certification and our programs, I might not have the exact answer. Please contact us directly through the portal or visit our website for more information. Is there anything else about NSQ or our available skills I can help with?",
        ],
    },
};

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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findResponse = (userMessage: string): string => {
        const normalizedMessage = userMessage.toLowerCase().trim();

        for (const [key, faqItem] of Object.entries(NSQ_FAQ)) {
            if (key === 'default') continue;
            for (const pattern of faqItem.patterns) {
                if (normalizedMessage.includes(pattern)) {
                    return faqItem.responses[Math.floor(Math.random() * faqItem.responses.length)];
                }
            }
        }

        return NSQ_FAQ.default.responses[0];
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: findResponse(inputValue),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 500);
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
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl bg-white flex flex-col h-[600px] z-50">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b bg-gradient-to-r from-primary to-purple-700 p-4 rounded-t-2xl">
                <div>
                    <h3 className="font-bold text-white">CSAD NSQ Assistant</h3>
                    <p className="text-xs text-white/80">Powered by AI</p>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
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
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="border-t p-4 flex gap-2"
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

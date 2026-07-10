import { Facebook, Linkedin, MessageCircle, Twitter } from 'lucide-react';

interface SocialShareProps {
    title?: string;
    description?: string;
    url?: string;
}

export default function SocialShare({
    title = 'Centre for Skills Acquisition and Development - NSQ Certification Portal',
    description = 'Register and get NSQ certified across 30+ hands-on skill trades. Competence-based assessment with no minimum academic entry requirement.',
    url = 'https://csad.fedpolyado.edu.ng'
}: SocialShareProps) {
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    };

    return (
        <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-muted-foreground">Share:</p>
            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                title="Share on Facebook"
            >
                <Facebook className="h-5 w-5" />
            </a>
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                title="Share on Twitter"
            >
                <Twitter className="h-5 w-5" />
            </a>
            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                title="Share on LinkedIn"
            >
                <Linkedin className="h-5 w-5" />
            </a>
            <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                title="Share on WhatsApp"
            >
                <MessageCircle className="h-5 w-5" />
            </a>
        </div>
    );
}

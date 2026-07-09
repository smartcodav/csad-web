import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* Polytechnic shield / crest icon */}
            <path d="M24 2L6 10v14c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V10L24 2z" fill="currentColor" opacity="0.15" />
            <path d="M24 4.5L8 11.5v12.5c0 10 6.9 19.3 16 21.6 9.1-2.3 16-11.6 16-21.6V11.5L24 4.5z" stroke="currentColor" strokeWidth="2" fill="none" />
            {/* Book / open pages */}
            <path d="M16 20h16M16 24h16M16 28h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Graduation cap */}
            <path d="M24 13l-8 4 8 4 8-4-8-4z" fill="currentColor" />
            <path d="M18 18.5v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <line x1="32" y1="17" x2="32" y2="24" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    );
}

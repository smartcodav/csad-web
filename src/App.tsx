import {
    Award,
    Bird,
    BrickWall,
    Camera,
    CircuitBoard,
    Code,
    Cpu,
    Fish,
    Flame,
    GraduationCap,
    Hammer,
    Handshake,
    Hexagon,
    LayoutGrid,
    LogIn,
    Menu,
    PaintBucket,
    Package,
    PartyPopper,
    Plug,
    Ruler,
    ShieldCheck,
    Shirt,
    Smartphone,
    Sparkles,
    Sprout,
    UtensilsCrossed,
    Users,
    Wrench,
    X,
} from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from './components/AppLogoIcon';

const LOGO_URL = '/logo.png';

// Renders the institution logo image, falling back to the built-in crest icon
// if logo.png hasn't been placed in public/ (or fails to load) for some deploy.
function Logo({ className }: { className?: string }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return <AppLogoIcon className={className} />;
    }

    return <img src={LOGO_URL} alt="Logo" className={`${className} object-contain`} onError={() => setFailed(true)} />;
}

const INSTITUTION_NAME = 'Centre for Skills Acquisition and Development';
const INSTITUTION_TAGLINE = 'Compute-Based Examination Portal';


// The CSAD portal (Laravel app) lives on its own domain — every login / dashboard
// action on this marketing site links out to it rather than being handled here.
const PORTAL_URL = (import.meta.env.VITE_PORTAL_URL || 'https://csadportal.com').replace(/\/$/, '');
const LOGIN_URL = `${PORTAL_URL}/login`;

const officials = [
    {
        name: 'His Excellency, Bola Ahmed Tinubu',
        title: 'President',
        subtitle: 'Federal Republic of Nigeria',
        photo: '/img/Bola_Tinubu_portrait.jpg',
        ring: 'from-green-500 via-emerald-400 to-white',
    },
    {
        name: 'His Excellency, The Executive Governor',
        title: 'Governor',
        subtitle: 'Ekiti State',
        photo: '/img/governor.jpg',
        ring: 'from-amber-400 via-orange-500 to-rose-500',
    },
    {
        name: 'The Chairman',
        title: 'Governing Council',
        subtitle: 'Federal Polytechnic, Ado-Ekiti',
        photo: '/img/chairperson.jpeg',
        ring: 'from-sky-400 via-blue-500 to-indigo-500',
    },
    {
        name: 'The Rector',
        title: 'Rector',
        subtitle: 'Federal Polytechnic, Ado-Ekiti',
        photo: '/img/rector.jpg',
        ring: 'from-fuchsia-500 via-purple-500 to-violet-600',
    },
];

const skills = [
    { name: 'Aluminum Fabrication', icon: Hammer },
    { name: 'Aquaculture', icon: Fish },
    { name: 'Automobile Maintenance', icon: Package },
    { name: 'Bee Keeping', icon: Hexagon },
    { name: 'Carpentry & Joinery', icon: Ruler },
    { name: 'Computer Hardware Maintenance & Repair', icon: Cpu },
    { name: 'Cosmetology', icon: Sparkles },
    { name: 'Crop Production', icon: Sprout },
    { name: 'Electrical Installation', icon: Plug },
    { name: 'Electronic Maintenance', icon: CircuitBoard },
    { name: 'Event Management', icon: PartyPopper },
    { name: 'Garment Making', icon: Shirt },
    { name: 'GSM', icon: Smartphone },
    { name: 'Hospitality & Catering', icon: UtensilsCrossed },
    { name: 'Leather Works', icon: Package },
    { name: 'Masonry', icon: BrickWall },
    { name: 'Paint & Paint Making', icon: PaintBucket },
    { name: 'Photography', icon: Camera },
    { name: 'Plumbing', icon: Wrench },
    { name: 'Poultry Farming', icon: Bird },
    { name: 'Tiling', icon: LayoutGrid },
    { name: 'Web Application', icon: Code },
    { name: 'Welding & Fabrication', icon: Flame },
];

const skillCardStyles = [
    'from-rose-500/15 to-rose-500/5 text-rose-600',
    'from-orange-500/15 to-orange-500/5 text-orange-600',
    'from-amber-500/15 to-amber-500/5 text-amber-600',
    'from-lime-500/15 to-lime-500/5 text-lime-600',
    'from-emerald-500/15 to-emerald-500/5 text-emerald-600',
    'from-teal-500/15 to-teal-500/5 text-teal-600',
    'from-sky-500/15 to-sky-500/5 text-sky-600',
    'from-indigo-500/15 to-indigo-500/5 text-indigo-600',
    'from-fuchsia-500/15 to-fuchsia-500/5 text-fuchsia-600',
    'from-pink-500/15 to-pink-500/5 text-pink-600',
];

const nsqBenefits = [
    {
        audience: 'For You',
        icon: GraduationCap,
        color: 'from-emerald-500 to-teal-500',
        points: [
            'A nationally recognized credential proving real, hands-on competence — no minimum academic entry requirement',
            'Assessed on the job, at your own pace, in the skill you actually practice',
            'Builds confidence, employability and opens the door to self-employment and business licensing',
        ],
    },
    {
        audience: 'For Employers',
        icon: ShieldCheck,
        color: 'from-sky-500 to-indigo-500',
        points: [
            'A dependable measure of a candidate’s competence and safety awareness',
            'Reduces recruitment and re-training costs with pre-verified, work-ready skills',
            'Demonstrates compliance with national standards and strengthens contract bids',
        ],
    },
    {
        audience: 'For the Nation',
        icon: Handshake,
        color: 'from-amber-500 to-orange-500',
        points: [
            'Builds a skilled, export-ready workforce and reduces unemployment',
            'Bridges informal skill acquisition with formal, portable certification',
            'Drives more competitive, higher-quality Nigerian products and services',
        ],
    },
];

const sponsors = [
    { name: 'Federal Polytechnic, Ado-Ekiti', logo: '/img/fpa.png', href: 'https://fedpolyado.edu.ng' },
    { name: 'National Board for Technical Education', logo: '/img/nbte.png', href: 'https://web.nbte.gov.ng' },
    { name: 'Federal Ministry of Education', logo: '/img/fme.png', href: 'https://education.gov.ng' },
];

export default function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="border-b bg-card/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-4">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="flex h-32 w-32 shrink-0 items-center justify-center text-primary sm:h-32 sm:w-32">
                            <Logo className="h-32 w-32" />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-bold leading-tight sm:text-sm">{INSTITUTION_NAME}</p>
                            <p className="hidden text-xs text-muted-foreground sm:block">{INSTITUTION_TAGLINE}</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-2">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                        {/* Desktop login button */}
                        <a
                            href={LOGIN_URL}
                            className="hidden md:inline-flex shrink-0 items-center rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:px-5 sm:text-sm"
                        >
                            Log in
                        </a>
                    </nav>
                </div>
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="border-t md:hidden">
                        <div className="mx-auto max-w-6xl px-4 py-3">
                            <a
                                href={LOGIN_URL}
                                className="block rounded-lg bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {/* Leadership — colorful, top of page, inline with the skill acquisition mission */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-purple-900 py-10 sm:py-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.12),transparent_40%)]" />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/80">
                        Leading Nigeria&rsquo;s Drive for Skills Acquisition
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {officials.map((official) => (
                            <div key={official.title} className="flex flex-col items-center text-center">
                                <div className={`rounded-full bg-gradient-to-br p-1 shadow-lg ${official.ring}`}>
                                    <img
                                        src={official.photo}
                                        alt={official.title}
                                        className="h-20 w-20 rounded-full border-2 border-white object-cover md:h-24 md:w-24"
                                    />
                                </div>
                                <p className="mt-2 text-xs font-bold text-white md:text-sm">{official.title}</p>
                                <p className="text-[10px] text-white/80 md:text-xs">{official.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hero */}
            <main className="flex flex-1 flex-col">
                <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
                    <div className="mx-auto flex max-w-2xl flex-col items-center">
                        <div className="mb-8 flex h-56 w-56 items-center justify-center text-primary">
                            <Logo className="h-56 w-56" />
                        </div>

                        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
                            Skills Acquisition &amp;<br />
                            <span className="text-primary">NSQ Certification Portal</span>
                        </h1>

                        <p className="mb-10 max-w-lg text-base text-muted-foreground">
                            {INSTITUTION_NAME} — register, get certified, and get examined across 30+ hands-on,
                            industry-recognized National Skills Qualification (NSQ) trades.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href={LOGIN_URL}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
                            >
                                <Users className="h-5 w-5" />
                                Student Login
                            </a>
                            <a
                                href={LOGIN_URL}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border bg-card px-8 py-3.5 text-base font-semibold transition-all hover:bg-accent hover:shadow-md"
                            >
                                <LogIn className="h-5 w-5" />
                                Staff Login
                            </a>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <section className="border-t bg-muted/20 px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">30+ NSQ-Certified Skills</h2>
                            <p className="mt-3 text-muted-foreground">
                                From artisanal trades to modern digital skills — register for any of these
                                Directorate-supervised skills, not limited to the list below.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                            {skills.map((skill, i) => {
                                const Icon = skill.icon;
                                return (
                                    <div
                                        key={skill.name}
                                        className={`flex items-center gap-3 rounded-xl border bg-gradient-to-br p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md ${skillCardStyles[i % skillCardStyles.length]}`}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/70">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                                    </div>
                                );
                            })}
                            <div className="flex items-center justify-center rounded-xl border border-dashed p-4 text-center text-sm font-semibold text-muted-foreground">
                                + Many More NSQ Trades
                            </div>
                        </div>
                    </div>
                </section>

                {/* NSQ Benefits */}
                <section className="border-t px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why the NSQ Certificate Matters</h2>
                            <p className="mt-3 text-muted-foreground">
                                The National Skills Qualification (NSQ) is a work-related, competence-based
                                credential issued by recognized Awarding Bodies under the National Board for
                                Technical Education (NBTE). Unlike an ND or HND, it certifies that you can actually{' '}
                                <em>do</em> the job — assessed at the training centre and on the job, with no
                                minimum academic entry requirement.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-3">
                            {nsqBenefits.map((group) => {
                                const Icon = group.icon;
                                return (
                                    <div key={group.audience} className="rounded-2xl border p-6 shadow-sm">
                                        <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white ${group.color}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mb-3 text-lg font-bold">{group.audience}</h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {group.points.map((point) => (
                                                <li key={point} className="flex gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Sponsors / Partners */}
                <section className="border-t bg-muted/20 px-6 py-14">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            In Partnership With
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
                            {sponsors.map((sponsor) => (
                                <a
                                    key={sponsor.name}
                                    href={sponsor.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 grayscale transition-all hover:grayscale-0"
                                    title={sponsor.name}
                                >
                                    <img src={sponsor.logo} alt={sponsor.name} className="h-14 w-auto object-contain sm:h-16" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-6 text-center text-xs text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} {INSTITUTION_NAME}. All rights reserved.</p>
                <p className="mt-1">
                    Powered by{' '}
                    <a href="https://schoolgohost.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                        SchoolGoHost Systems Limited
                    </a>
                </p>
            </footer>
        </div>
    );
}

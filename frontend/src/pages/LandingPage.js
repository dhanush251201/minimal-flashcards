import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BoltIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";
export const LandingPage = () => {
    return (_jsxs("div", { className: "landing-page", children: [_jsx("header", { className: "landing-header", children: _jsxs("nav", { className: "landing-nav", children: [_jsxs(Link, { to: "/", className: "logo", children: [_jsx("span", { className: "logo-icon", children: "FD" }), _jsx("span", { children: "Flash-Decks" })] }), _jsxs("div", { className: "nav-actions", children: [_jsx(Link, { to: "/login", className: "btn btn-secondary", children: "Log in" }), _jsx(Link, { to: "/signup", className: "btn btn-primary", children: "Sign up" })] })] }) }), _jsxs("main", { children: [_jsxs("section", { className: "hero-section", children: [_jsxs("div", { className: "hero-content", children: [_jsx("span", { className: "hero-badge", children: "Spaced repetition done right" }), _jsx("h1", { className: "hero-title", children: "Retain more. Study smarter. Fall in love with learning again." }), _jsx("p", { className: "hero-description", children: "Flash-Decks combines adaptive scheduling, handcrafted decks, and beautiful analytics to keep you on track. Master anything with guided reviews, practice drills, and exam simulations." }), _jsxs("div", { className: "hero-actions", children: [_jsxs(Link, { to: "/signup", className: "btn btn-primary", children: ["Start learning free ", _jsx(ArrowRightIcon, { style: { width: '1rem', height: '1rem' } })] }), _jsxs("a", { href: "#features", className: "btn btn-secondary", children: ["Explore the platform ", _jsx(ArrowRightIcon, { style: { width: '1rem', height: '1rem' } })] })] }), _jsx("div", { className: "stats-grid", children: [
                                            { label: "Decks", value: "200+" },
                                            { label: "Active learners", value: "12k" },
                                            { label: "Avg. retention", value: "93%" },
                                            { label: "Daily cards reviewed", value: "65k" }
                                        ].map((stat) => (_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-label", children: stat.label }), _jsx("div", { className: "stat-value", children: stat.value })] }, stat.label))) })] }), _jsx("div", { className: "flex relative", children: _jsx("div", { className: "card", style: { width: '100%' }, children: _jsxs("div", { className: "space-y-4 p-8", children: [_jsxs("div", { className: "card", style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs", style: { color: '#64748b' }, children: "Due today" }), _jsx("p", { className: "text-3xl font-bold", children: "32 cards" })] }), _jsx("span", { className: "rounded-full px-4 py-2 text-xs font-semibold", style: { background: 'rgba(99, 102, 241, 0.1)', color: 'var(--brand-600)' }, children: "+12%" })] }), _jsxs("div", { className: "card", style: { background: '#f8fafc' }, children: [_jsx("p", { className: "text-sm", style: { color: '#64748b' }, children: "Daily streak" }), _jsx("p", { className: "text-3xl font-bold", children: "42 days" }), _jsx("div", { className: "mt-4", style: { height: '0.5rem', borderRadius: '9999px', background: '#e2e8f0' }, children: _jsx("div", { style: { height: '0.5rem', borderRadius: '9999px', width: '78%', background: 'linear-gradient(to right, var(--brand-400), var(--brand-600))' } }) })] })] }) }) })] }), _jsx("section", { id: "features", className: "features-section", children: [
                            {
                                icon: BoltIcon,
                                title: "Adaptive reviews",
                                body: "An SM-2 inspired scheduler keeps the right cards at your fingertips and powers personalized pacing."
                            },
                            {
                                icon: ChartBarIcon,
                                title: "Rich analytics",
                                body: "Understand your streaks, strengths, and blind spots with dashboards designed to boost motivation."
                            },
                            {
                                icon: ClockIcon,
                                title: "Flexible study modes",
                                body: "Switch between review, practice, and timed exam prep in seconds and sync across any device."
                            }
                        ].map((feature) => (_jsxs("div", { className: "feature-card", children: [_jsx(feature.icon, { className: "feature-icon" }), _jsx("h3", { className: "feature-title", children: feature.title }), _jsx("p", { className: "feature-description", children: feature.body })] }, feature.title))) })] }), _jsx("footer", { className: "landing-footer", children: _jsxs("div", { className: "footer-content", children: [_jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Flash-Decks. Stay curious."] }), _jsxs("div", { className: "footer-links", children: [_jsx(Link, { to: "/login", children: "Log in" }), _jsx(Link, { to: "/signup", children: "Sign up" })] })] }) })] }));
};

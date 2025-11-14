import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { SidebarNav } from "@/components/navigation/SidebarNav";
export const AppShell = ({ children }) => {
    // Simplified: Static streak, no auth, no mobile menu
    const staticStreak = 7;
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("aside", { className: "sidebar", children: [_jsx("div", { className: "sidebar-header", children: _jsx(Link, { to: "/app/dashboard", children: "Flash-Decks" }) }), _jsx("div", { children: _jsx(SidebarNav, {}) })] }), _jsxs("div", { className: "main-content", children: [_jsxs("header", { className: "app-header", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Welcome back" }), _jsx("span", { className: "text-sm", style: { color: '#64748b' }, children: "Stay consistent and your streak will thrive." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "card", style: { padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsx("span", { className: "text-xs", style: { color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Streak" }), _jsxs("span", { className: "font-semibold", style: { color: 'var(--brand-600)' }, children: [staticStreak, " \uD83D\uDD25"] })] }), _jsx(ThemeToggle, {})] })] }), _jsx("main", { className: "app-body", children: children })] })] }));
};

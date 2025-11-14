import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { HomeIcon, ListBulletIcon } from "@heroicons/react/24/outline";
const navItems = [
    { name: "Dashboard", to: "/app/dashboard", icon: HomeIcon },
    { name: "All Decks", to: "/app/dashboard?view=all", icon: ListBulletIcon }
];
export const SidebarNav = () => {
    return (_jsx("nav", { className: "sidebar-nav", children: navItems.map((item) => (_jsxs(NavLink, { to: item.to, className: ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`, children: [_jsx(item.icon, { className: "nav-icon" }), _jsx("span", { children: item.name })] }, item.name))) }));
};

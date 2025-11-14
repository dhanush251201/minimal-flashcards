import { NavLink } from "react-router-dom";
import { HomeIcon, ListBulletIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", to: "/app/dashboard", icon: HomeIcon },
  { name: "All Decks", to: "/app/dashboard?view=all", icon: ListBulletIcon }
];

export const SidebarNav = () => {
  return (
    <nav className="sidebar-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <item.icon className="nav-icon" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

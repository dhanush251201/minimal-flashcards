import { Link } from "react-router-dom";

import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { SidebarNav } from "@/components/navigation/SidebarNav";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  // Simplified: Static streak, no auth, no mobile menu
  const staticStreak = 7;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/app/dashboard">Flash-Decks</Link>
        </div>
        <div>
          <SidebarNav />
        </div>
      </aside>

      <div className="main-content">
        <header className="app-header">
          <div>
            <p className="font-semibold">Welcome back</p>
            <span className="text-sm" style={{ color: '#64748b' }}>Stay consistent and your streak will thrive.</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-xs" style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Streak</span>
              <span className="font-semibold" style={{ color: 'var(--brand-600)' }}>
                {staticStreak} 🔥
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="app-body">
          {children}
        </main>
      </div>
    </div>
  );
};

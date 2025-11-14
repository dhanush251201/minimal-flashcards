import { SunIcon } from "@heroicons/react/24/outline";

export const ThemeToggle = () => {
  // Non-functional theme toggle button (placeholder only)
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <SunIcon className="theme-icon" />
    </button>
  );
};

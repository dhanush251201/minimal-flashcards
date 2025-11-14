import { jsx as _jsx } from "react/jsx-runtime";
import { SunIcon } from "@heroicons/react/24/outline";
export const ThemeToggle = () => {
    // Non-functional theme toggle button (placeholder only)
    return (_jsx("button", { type: "button", className: "theme-toggle", "aria-label": "Toggle theme", children: _jsx(SunIcon, { className: "theme-icon" }) }));
};

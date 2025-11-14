import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export const SignupPage = () => {
    const navigate = useNavigate();
    // Simplified: Just redirect to dashboard immediately
    useEffect(() => {
        navigate("/app/dashboard", { replace: true });
    }, [navigate]);
    return (_jsx("div", { className: "auth-page", children: _jsxs("div", { className: "auth-card", children: [_jsx("h1", { className: "auth-title", children: "Create your account" }), _jsx("p", { className: "auth-subtitle", children: "Redirecting to dashboard..." }), _jsxs("p", { className: "auth-link", children: ["Already using Flash-Decks?", " ", _jsx(Link, { to: "/login", children: "Log in here" })] })] }) }));
};

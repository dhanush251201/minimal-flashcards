import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();

  // Simplified: Just redirect to dashboard immediately
  useEffect(() => {
    navigate("/app/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Redirecting to dashboard...</p>

        <p className="auth-link">
          Already using Flash-Decks?{" "}
          <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

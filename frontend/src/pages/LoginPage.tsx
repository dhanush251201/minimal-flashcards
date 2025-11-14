import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  // Simplified: Just redirect to dashboard immediately
  useEffect(() => {
    navigate("/app/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Redirecting to dashboard...</p>

        <p className="auth-link">
          No account?{" "}
          <Link to="/signup">Join now</Link>
        </p>
      </div>
    </div>
  );
};

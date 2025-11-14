import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DashboardPage } from "@/pages/DashboardPage";
import { DeckDetailPage } from "@/pages/DeckDetailPage";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { StudySessionPage } from "@/pages/StudySessionPage";
import { AppShell } from "@/components/layout/AppShell";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Simplified: No protected routes, direct access */}
        <Route
          element={
            <AppShell>
              <DashboardPage />
            </AppShell>
          }
          path="/app/dashboard"
        />
        <Route
          element={
            <AppShell>
              <DeckDetailPage />
            </AppShell>
          }
          path="/app/decks/:deckId"
        />
        <Route
          element={
            <AppShell>
              <StudySessionPage />
            </AppShell>
          }
          path="/app/study/:sessionId"
        />
        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

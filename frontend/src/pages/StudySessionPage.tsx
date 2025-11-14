import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { Flashcard } from "@/components/cards/Flashcard";
import { apiClient } from "@/lib/apiClient";
import type { Card, StudySession } from "@/types/api";

export const StudySessionPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const { data: session } = useQuery({
    queryKey: ["study-session", sessionId],
    queryFn: async () => {
      const { data } = await apiClient.get<StudySession>(`/study/sessions/${sessionId}`);
      return data;
    },
    enabled: !!sessionId
  });

  const { data: cards = [] } = useQuery({
    queryKey: ["session-cards", sessionId],
    queryFn: async () => {
      const { data } = await apiClient.get<Card[]>(`/study/sessions/${sessionId}/cards`);
      return data;
    },
    enabled: !!sessionId
  });

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFlipped(false);
    } else {
      // Session completed
      queryClient.invalidateQueries({ queryKey: ["study-session", sessionId] });
      navigate(`/app/dashboard`);
    }
  };

  const currentCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);

  if (!session || !currentCard) {
    return <div className="card">Loading...</div>;
  }

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="font-semibold">Review Session</span>
          <span className="text-sm" style={{ color: '#64748b' }}>
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(to right, var(--brand-400), var(--brand-600))',
              borderRadius: '9999px',
              transition: 'width 0.3s'
            }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div>
        <Flashcard card={currentCard} flipped={flipped} onToggle={() => setFlipped(!flipped)} />
      </div>

      {/* Controls */}
      {!flipped ? (
        <div className="card text-center">
          <button onClick={() => setFlipped(true)} className="btn btn-primary">
            Show Answer
          </button>
        </div>
      ) : (
        <div className="card text-center">
          <button onClick={handleNextCard} className="btn btn-primary">
            {currentIndex < cards.length - 1 ? 'Next Card' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
};

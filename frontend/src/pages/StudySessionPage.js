import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Flashcard } from "@/components/cards/Flashcard";
import { apiClient } from "@/lib/apiClient";
export const StudySessionPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const { data: session } = useQuery({
        queryKey: ["study-session", sessionId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/study/sessions/${sessionId}`);
            return data;
        },
        enabled: !!sessionId
    });
    const { data: cards = [] } = useQuery({
        queryKey: ["session-cards", sessionId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/study/sessions/${sessionId}/cards`);
            return data;
        },
        enabled: !!sessionId
    });
    const handleNextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setFlipped(false);
        }
        else {
            // Session completed
            queryClient.invalidateQueries({ queryKey: ["study-session", sessionId] });
            navigate(`/app/dashboard`);
        }
    };
    const currentCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);
    if (!session || !currentCard) {
        return _jsx("div", { className: "card", children: "Loading..." });
    }
    const progress = ((currentIndex + 1) / cards.length) * 100;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "card", children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }, children: [_jsx("span", { className: "font-semibold", children: "Review Session" }), _jsxs("span", { className: "text-sm", style: { color: '#64748b' }, children: [currentIndex + 1, " / ", cards.length] })] }), _jsx("div", { style: { width: '100%', height: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }, children: _jsx("div", { style: {
                                width: `${progress}%`,
                                height: '100%',
                                background: 'linear-gradient(to right, var(--brand-400), var(--brand-600))',
                                borderRadius: '9999px',
                                transition: 'width 0.3s'
                            } }) })] }), _jsx("div", { children: _jsx(Flashcard, { card: currentCard, flipped: flipped, onToggle: () => setFlipped(!flipped) }) }), !flipped ? (_jsx("div", { className: "card text-center", children: _jsx("button", { onClick: () => setFlipped(true), className: "btn btn-primary", children: "Show Answer" }) })) : (_jsx("div", { className: "card text-center", children: _jsx("button", { onClick: handleNextCard, className: "btn btn-primary", children: currentIndex < cards.length - 1 ? 'Next Card' : 'Finish' }) }))] }));
};

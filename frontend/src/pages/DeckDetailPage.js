import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Flashcard } from "@/components/cards/Flashcard";
import { apiClient } from "@/lib/apiClient";
export const DeckDetailPage = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isAddCardOpen, setAddCardOpen] = useState(false);
    const [newCardPrompt, setNewCardPrompt] = useState("");
    const [newCardAnswer, setNewCardAnswer] = useState("");
    const [isEditDeckOpen, setEditDeckOpen] = useState(false);
    const [editDeckTitle, setEditDeckTitle] = useState("");
    const [editDeckDescription, setEditDeckDescription] = useState("");
    const [editingCard, setEditingCard] = useState(null);
    const [editCardPrompt, setEditCardPrompt] = useState("");
    const [editCardAnswer, setEditCardAnswer] = useState("");
    const { data: deck } = useQuery({
        queryKey: ["deck", deckId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/decks/${deckId}`);
            return data;
        },
        enabled: !!deckId
    });
    const addCardMutation = useMutation({
        mutationFn: async () => {
            const { data } = await apiClient.post(`/decks/${deckId}/cards`, {
                type: "basic",
                prompt: newCardPrompt,
                answer: newCardAnswer,
                explanation: null,
                options: null,
                cloze_data: null
            });
            return data;
        },
        onSuccess: () => {
            setAddCardOpen(false);
            setNewCardPrompt("");
            setNewCardAnswer("");
            queryClient.invalidateQueries({ queryKey: ["deck", deckId] });
        }
    });
    const deleteCardMutation = useMutation({
        mutationFn: async (cardId) => {
            await apiClient.delete(`/decks/${deckId}/cards/${cardId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["deck", deckId] });
        }
    });
    const editCardMutation = useMutation({
        mutationFn: async () => {
            if (!editingCard)
                return;
            const { data } = await apiClient.put(`/decks/cards/${editingCard.id}`, {
                prompt: editCardPrompt,
                answer: editCardAnswer
            });
            return data;
        },
        onSuccess: () => {
            setEditingCard(null);
            setEditCardPrompt("");
            setEditCardAnswer("");
            queryClient.invalidateQueries({ queryKey: ["deck", deckId] });
        }
    });
    const editDeckMutation = useMutation({
        mutationFn: async () => {
            const { data } = await apiClient.put(`/decks/${deckId}`, {
                title: editDeckTitle,
                description: editDeckDescription
            });
            return data;
        },
        onSuccess: () => {
            setEditDeckOpen(false);
            queryClient.invalidateQueries({ queryKey: ["deck", deckId] });
            queryClient.invalidateQueries({ queryKey: ["decks"] });
        }
    });
    const deleteDeckMutation = useMutation({
        mutationFn: async () => {
            await apiClient.delete(`/decks/${deckId}`);
        },
        onSuccess: () => {
            navigate("/app/dashboard");
            queryClient.invalidateQueries({ queryKey: ["decks"] });
        }
    });
    const startReviewMutation = useMutation({
        mutationFn: async () => {
            const { data } = await apiClient.post("/study/sessions", {
                deck_id: parseInt(deckId),
                mode: "review",
                config: { endless: false }
            });
            return data;
        },
        onSuccess: (session) => {
            navigate(`/app/study/${session.id}`);
        }
    });
    if (!deck) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "card", children: [_jsx("h1", { className: "text-2xl font-bold", children: deck.title }), deck.description && _jsx("p", { className: "mt-2 text-sm", style: { color: '#64748b' }, children: deck.description }), _jsxs("div", { className: "flex gap-4 mt-4", children: [_jsx("button", { onClick: () => startReviewMutation.mutate(), className: "btn btn-primary", disabled: !deck.cards || deck.cards.length === 0, children: "Start Review" }), _jsx("button", { onClick: () => setAddCardOpen(true), className: "btn btn-secondary", children: "Add Card" }), _jsx("button", { onClick: () => {
                                    setEditDeckTitle(deck.title);
                                    setEditDeckDescription(deck.description || "");
                                    setEditDeckOpen(true);
                                }, className: "btn btn-secondary", children: "Edit Deck" }), _jsx("button", { onClick: () => {
                                    if (confirm("Are you sure you want to delete this deck? This action cannot be undone.")) {
                                        deleteDeckMutation.mutate();
                                    }
                                }, className: "btn btn-secondary", style: { color: '#ef4444' }, children: "Delete Deck" })] }), _jsx("div", { className: "mt-4 flex gap-4 text-sm", style: { color: '#94a3b8' }, children: _jsxs("span", { children: [deck.cards?.length || 0, " cards"] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Cards" }), deck.cards && deck.cards.length > 0 ? (_jsx("div", { className: "grid gap-4", style: { gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }, children: deck.cards.map((card) => (_jsxs("div", { className: "card", children: [_jsx("div", { style: { marginBottom: '1rem' }, children: _jsx(Flashcard, { card: card }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => {
                                                setEditingCard(card);
                                                setEditCardPrompt(card.prompt);
                                                setEditCardAnswer(card.answer);
                                            }, className: "btn btn-secondary flex-1 text-sm", children: "Edit" }), _jsx("button", { onClick: () => deleteCardMutation.mutate(card.id), className: "btn btn-secondary flex-1 text-sm", children: "Delete" })] })] }, card.id))) })) : (_jsx("div", { className: "card text-center", style: { color: '#64748b' }, children: "No cards yet. Add your first card to get started." }))] }), isAddCardOpen && (_jsx("div", { className: "modal-overlay", onClick: () => setAddCardOpen(false), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h3", { className: "modal-header", children: "Add New Card" }), _jsx("p", { className: "modal-description", children: "Create a basic flashcard with a question and answer." }), _jsxs("form", { className: "space-y-4 mt-6", onSubmit: (e) => {
                                e.preventDefault();
                                addCardMutation.mutate();
                            }, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Question (Front)" }), _jsx("textarea", { className: "form-textarea", value: newCardPrompt, onChange: (e) => setNewCardPrompt(e.target.value), placeholder: "What is the capital of France?", required: true, rows: 3 })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Answer (Back)" }), _jsx("textarea", { className: "form-textarea", value: newCardAnswer, onChange: (e) => setNewCardAnswer(e.target.value), placeholder: "Paris", required: true, rows: 3 })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { type: "button", onClick: () => setAddCardOpen(false), className: "btn btn-secondary", children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: addCardMutation.isPending, children: addCardMutation.isPending ? "Adding..." : "Add Card" })] })] })] }) })), isEditDeckOpen && (_jsx("div", { className: "modal-overlay", onClick: () => setEditDeckOpen(false), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h3", { className: "modal-header", children: "Edit Deck" }), _jsx("p", { className: "modal-description", children: "Update the deck's title and description." }), _jsxs("form", { className: "space-y-4 mt-6", onSubmit: (e) => {
                                e.preventDefault();
                                editDeckMutation.mutate();
                            }, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Deck Title" }), _jsx("input", { type: "text", className: "form-input", value: editDeckTitle, onChange: (e) => setEditDeckTitle(e.target.value), placeholder: "Deck title", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Description (Optional)" }), _jsx("textarea", { className: "form-textarea", value: editDeckDescription, onChange: (e) => setEditDeckDescription(e.target.value), placeholder: "Deck description", rows: 3 })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { type: "button", onClick: () => setEditDeckOpen(false), className: "btn btn-secondary", children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: editDeckMutation.isPending, children: editDeckMutation.isPending ? "Saving..." : "Save Changes" })] })] })] }) })), editingCard && (_jsx("div", { className: "modal-overlay", onClick: () => setEditingCard(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h3", { className: "modal-header", children: "Edit Card" }), _jsx("p", { className: "modal-description", children: "Update the card's question and answer." }), _jsxs("form", { className: "space-y-4 mt-6", onSubmit: (e) => {
                                e.preventDefault();
                                editCardMutation.mutate();
                            }, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Question (Front)" }), _jsx("textarea", { className: "form-textarea", value: editCardPrompt, onChange: (e) => setEditCardPrompt(e.target.value), placeholder: "What is the capital of France?", required: true, rows: 3 })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Answer (Back)" }), _jsx("textarea", { className: "form-textarea", value: editCardAnswer, onChange: (e) => setEditCardAnswer(e.target.value), placeholder: "Paris", required: true, rows: 3 })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { type: "button", onClick: () => setEditingCard(null), className: "btn btn-secondary", children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: editCardMutation.isPending, children: editCardMutation.isPending ? "Saving..." : "Save Changes" })] })] })] }) }))] }));
};

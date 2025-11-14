import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RectangleStackIcon, ChartBarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DeckCard } from "@/components/decks/DeckCard";
import { apiClient } from "@/lib/apiClient";
// Static activity data
const staticActivity = [
    { date: "2025-01-07", count: 15 },
    { date: "2025-01-08", count: 22 },
    { date: "2025-01-09", count: 18 },
    { date: "2025-01-10", count: 25 },
    { date: "2025-01-11", count: 12 },
    { date: "2025-01-12", count: 30 },
    { date: "2025-01-13", count: 20 }
];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const [isCreateDeckOpen, setCreateDeckOpen] = useState(false);
    const [newDeckTitle, setNewDeckTitle] = useState("");
    const [newDeckDescription, setNewDeckDescription] = useState("");
    const viewFilter = searchParams.get("view");
    const { data: decks = [] } = useQuery({
        queryKey: ["decks", viewFilter],
        queryFn: async () => {
            const { data } = await apiClient.get("/decks");
            return data;
        }
    });
    const createDeckMutation = useMutation({
        mutationFn: async () => {
            const { data } = await apiClient.post("/decks", {
                title: newDeckTitle,
                description: newDeckDescription,
                tag_names: []
            });
            return data;
        },
        onSuccess: () => {
            setCreateDeckOpen(false);
            setNewDeckTitle("");
            setNewDeckDescription("");
            queryClient.invalidateQueries({ queryKey: ["decks"] });
        }
    });
    const filteredDecks = useMemo(() => {
        if (viewFilter === "all")
            return decks;
        // Default view: show all decks
        return decks;
    }, [decks, viewFilter]);
    const totalDecks = decks.length;
    const totalCards = decks.reduce((sum, deck) => sum + deck.card_count, 0);
    // Dashboard view
    if (!viewFilter) {
        return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "dashboard-grid", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "stat-cards", children: [_jsxs("div", { className: "stat-card-white", children: [_jsx(RectangleStackIcon, { style: { width: '2rem', height: '2rem', color: '#94a3b8' } }), _jsx("p", { className: "text-3xl font-bold mt-4", children: totalDecks }), _jsx("p", { className: "text-sm mt-1", style: { color: '#64748b' }, children: "Active decks" })] }), _jsxs("div", { className: "stat-card-white", children: [_jsx(ChartBarIcon, { style: { width: '2rem', height: '2rem', color: '#94a3b8' } }), _jsx("p", { className: "text-3xl font-bold mt-4", children: totalCards }), _jsx("p", { className: "text-sm mt-1", style: { color: '#64748b' }, children: "Total cards" })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "card-title", children: "Quick start" }), _jsx("div", { className: "grid gap-4", style: { gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }, children: _jsxs("button", { type: "button", onClick: () => setCreateDeckOpen(true), className: "btn btn-primary", style: { justifyContent: 'flex-start', padding: '1rem', textAlign: 'left' }, children: [_jsx(PlusIcon, { style: { width: '2rem', height: '2rem' } }), _jsxs("div", { style: { marginLeft: '0.75rem' }, children: [_jsx("p", { className: "font-semibold", children: "New Deck" }), _jsx("p", { className: "text-xs", style: { opacity: 0.8 }, children: "Create flashcards" })] })] }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Your Decks" }), decks.length > 0 ? (_jsx("div", { className: "grid gap-4", style: { gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }, children: decks.slice(0, 6).map((deck) => (_jsx(DeckCard, { deck: deck }, deck.id))) })) : (_jsx("div", { className: "card text-center", style: { color: '#64748b' }, children: "No decks yet. Create your first deck to start studying." }))] })] }), _jsx("aside", { className: "space-y-6", children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h3", { className: "text-sm font-semibold", children: "Activity" }), _jsx("span", { className: "text-xs", style: { color: '#94a3b8' }, children: "7 days" })] }), _jsx("div", { className: "space-y-2", children: staticActivity.map((entry, index) => (_jsxs("div", { className: "activity-bar", children: [_jsx("div", { className: "activity-day", children: dayNames[index] }), _jsx("div", { className: "activity-bar-bg", children: _jsx("div", { className: "activity-bar-fill", style: { width: `${Math.min(entry.count * 3, 100)}%` } }) }), _jsx("div", { className: "activity-count", children: entry.count })] }, entry.date))) })] }) })] }), _jsx(CreateDeckModal, { isOpen: isCreateDeckOpen, onClose: () => setCreateDeckOpen(false), newDeckTitle: newDeckTitle, setNewDeckTitle: setNewDeckTitle, newDeckDescription: newDeckDescription, setNewDeckDescription: setNewDeckDescription, createDeckMutation: createDeckMutation })] }));
    }
    // All Decks view
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "All Decks" }), _jsxs("p", { className: "mt-1 text-sm", style: { color: '#64748b' }, children: ["Browse and manage your ", totalDecks, " deck", totalDecks !== 1 ? "s" : ""] })] }), _jsxs("button", { type: "button", onClick: () => setCreateDeckOpen(true), className: "btn btn-primary", children: [_jsx(PlusIcon, { style: { width: '1rem', height: '1rem' } }), "New Deck"] })] }), decks.length > 0 ? (_jsx("div", { className: "grid gap-4", style: { gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }, children: decks.map((deck) => (_jsx(DeckCard, { deck: deck }, deck.id))) })) : (_jsx("div", { className: "card text-center", style: { color: '#64748b' }, children: "No decks yet. Create your first deck to start studying." }))] }), _jsx(CreateDeckModal, { isOpen: isCreateDeckOpen, onClose: () => setCreateDeckOpen(false), newDeckTitle: newDeckTitle, setNewDeckTitle: setNewDeckTitle, newDeckDescription: newDeckDescription, setNewDeckDescription: setNewDeckDescription, createDeckMutation: createDeckMutation })] }));
};
// Create Deck Modal Component
const CreateDeckModal = ({ isOpen, onClose, newDeckTitle, setNewDeckTitle, newDeckDescription, setNewDeckDescription, createDeckMutation }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h3", { className: "modal-header", children: "Create a new deck" }), _jsx("p", { className: "modal-description", children: "Give your deck a name and optional description. You can add cards after it is created." }), _jsxs("form", { className: "space-y-4 mt-6", onSubmit: (e) => {
                        e.preventDefault();
                        if (!newDeckTitle.trim())
                            return;
                        createDeckMutation.mutate();
                    }, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "deck-title", className: "form-label", children: "Deck title" }), _jsx("input", { id: "deck-title", value: newDeckTitle, onChange: (e) => setNewDeckTitle(e.target.value), placeholder: "e.g. Organic Chemistry Basics", className: "form-input", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "deck-description", className: "form-label", children: "Description (optional)" }), _jsx("textarea", { id: "deck-description", value: newDeckDescription, onChange: (e) => setNewDeckDescription(e.target.value), rows: 3, placeholder: "Briefly describe what this deck covers", className: "form-textarea" })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { type: "button", onClick: onClose, className: "btn btn-secondary", disabled: createDeckMutation.isPending, children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: createDeckMutation.isPending, children: createDeckMutation.isPending ? "Creating..." : "Create deck" })] })] })] }) }));
};

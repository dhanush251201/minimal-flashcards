import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RectangleStackIcon, ChartBarIcon, PlusIcon } from "@heroicons/react/24/outline";

import { DeckCard } from "@/components/decks/DeckCard";
import { apiClient } from "@/lib/apiClient";
import type { DeckSummary, DeckDetail } from "@/types/api";

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
      const { data } = await apiClient.get<DeckSummary[]>("/decks");
      return data;
    }
  });

  const createDeckMutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<DeckDetail>("/decks", {
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
    if (viewFilter === "all") return decks;
    // Default view: show all decks
    return decks;
  }, [decks, viewFilter]);

  const totalDecks = decks.length;
  const totalCards = decks.reduce((sum, deck) => sum + deck.card_count, 0);

  // Dashboard view
  if (!viewFilter) {
    return (
      <>
        <div className="dashboard-grid">
          <div className="space-y-6">
            {/* Hero Stats */}
            <div className="stat-cards">
              <div className="stat-card-white">
                <RectangleStackIcon style={{ width: '2rem', height: '2rem', color: '#94a3b8' }} />
                <p className="text-3xl font-bold mt-4">{totalDecks}</p>
                <p className="text-sm mt-1" style={{ color: '#64748b' }}>Active decks</p>
              </div>
              <div className="stat-card-white">
                <ChartBarIcon style={{ width: '2rem', height: '2rem', color: '#94a3b8' }} />
                <p className="text-3xl font-bold mt-4">{totalCards}</p>
                <p className="text-sm mt-1" style={{ color: '#64748b' }}>Total cards</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="card-title">Quick start</h2>
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <button
                  type="button"
                  onClick={() => setCreateDeckOpen(true)}
                  className="btn btn-primary"
                  style={{ justifyContent: 'flex-start', padding: '1rem', textAlign: 'left' }}
                >
                  <PlusIcon style={{ width: '2rem', height: '2rem' }} />
                  <div style={{ marginLeft: '0.75rem' }}>
                    <p className="font-semibold">New Deck</p>
                    <p className="text-xs" style={{ opacity: 0.8 }}>Create flashcards</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recommended Decks */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Your Decks</h2>
              {decks.length > 0 ? (
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  {decks.slice(0, 6).map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                  ))}
                </div>
              ) : (
                <div className="card text-center" style={{ color: '#64748b' }}>
                  No decks yet. Create your first deck to start studying.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Activity */}
          <aside className="space-y-6">
            <div className="card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Activity</h3>
                <span className="text-xs" style={{ color: '#94a3b8' }}>7 days</span>
              </div>
              <div className="space-y-2">
                {staticActivity.map((entry, index) => (
                  <div key={entry.date} className="activity-bar">
                    <div className="activity-day">
                      {dayNames[index]}
                    </div>
                    <div className="activity-bar-bg">
                      <div
                        className="activity-bar-fill"
                        style={{ width: `${Math.min(entry.count * 3, 100)}%` }}
                      />
                    </div>
                    <div className="activity-count">
                      {entry.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <CreateDeckModal
          isOpen={isCreateDeckOpen}
          onClose={() => setCreateDeckOpen(false)}
          newDeckTitle={newDeckTitle}
          setNewDeckTitle={setNewDeckTitle}
          newDeckDescription={newDeckDescription}
          setNewDeckDescription={setNewDeckDescription}
          createDeckMutation={createDeckMutation}
        />
      </>
    );
  }

  // All Decks view
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">All Decks</h1>
            <p className="mt-1 text-sm" style={{ color: '#64748b' }}>
              Browse and manage your {totalDecks} deck{totalDecks !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateDeckOpen(true)}
            className="btn btn-primary"
          >
            <PlusIcon style={{ width: '1rem', height: '1rem' }} />
            New Deck
          </button>
        </div>

        {decks.length > 0 ? (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{ color: '#64748b' }}>
            No decks yet. Create your first deck to start studying.
          </div>
        )}
      </div>

      <CreateDeckModal
        isOpen={isCreateDeckOpen}
        onClose={() => setCreateDeckOpen(false)}
        newDeckTitle={newDeckTitle}
        setNewDeckTitle={setNewDeckTitle}
        newDeckDescription={newDeckDescription}
        setNewDeckDescription={setNewDeckDescription}
        createDeckMutation={createDeckMutation}
      />
    </>
  );
};

// Create Deck Modal Component
const CreateDeckModal = ({
  isOpen,
  onClose,
  newDeckTitle,
  setNewDeckTitle,
  newDeckDescription,
  setNewDeckDescription,
  createDeckMutation
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-header">Create a new deck</h3>
        <p className="modal-description">
          Give your deck a name and optional description. You can add cards after it is created.
        </p>

        <form
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newDeckTitle.trim()) return;
            createDeckMutation.mutate();
          }}
        >
          <div className="form-group">
            <label htmlFor="deck-title" className="form-label">
              Deck title
            </label>
            <input
              id="deck-title"
              value={newDeckTitle}
              onChange={(e) => setNewDeckTitle(e.target.value)}
              placeholder="e.g. Organic Chemistry Basics"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deck-description" className="form-label">
              Description (optional)
            </label>
            <textarea
              id="deck-description"
              value={newDeckDescription}
              onChange={(e) => setNewDeckDescription(e.target.value)}
              rows={3}
              placeholder="Briefly describe what this deck covers"
              className="form-textarea"
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={createDeckMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createDeckMutation.isPending}
            >
              {createDeckMutation.isPending ? "Creating..." : "Create deck"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

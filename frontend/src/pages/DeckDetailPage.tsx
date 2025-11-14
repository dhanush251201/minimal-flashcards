import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { Flashcard } from "@/components/cards/Flashcard";
import { apiClient } from "@/lib/apiClient";
import type { Card as CardModel, DeckDetail, StudySession } from "@/types/api";

export const DeckDetailPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const [newCardPrompt, setNewCardPrompt] = useState("");
  const [newCardAnswer, setNewCardAnswer] = useState("");

  const [isEditDeckOpen, setEditDeckOpen] = useState(false);
  const [editDeckTitle, setEditDeckTitle] = useState("");
  const [editDeckDescription, setEditDeckDescription] = useState("");

  const [editingCard, setEditingCard] = useState<CardModel | null>(null);
  const [editCardPrompt, setEditCardPrompt] = useState("");
  const [editCardAnswer, setEditCardAnswer] = useState("");

  const { data: deck } = useQuery({
    queryKey: ["deck", deckId],
    queryFn: async () => {
      const { data } = await apiClient.get<DeckDetail>(`/decks/${deckId}`);
      return data;
    },
    enabled: !!deckId
  });

  const addCardMutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<CardModel>(`/decks/${deckId}/cards`, {
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
    mutationFn: async (cardId: number) => {
      await apiClient.delete(`/decks/${deckId}/cards/${cardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deck", deckId] });
    }
  });

  const editCardMutation = useMutation({
    mutationFn: async () => {
      if (!editingCard) return;
      const { data } = await apiClient.put<CardModel>(
        `/decks/cards/${editingCard.id}`,
        {
          prompt: editCardPrompt,
          answer: editCardAnswer
        }
      );
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
      const { data } = await apiClient.put<DeckDetail>(`/decks/${deckId}`, {
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
      const { data } = await apiClient.post<StudySession>("/study/sessions", {
        deck_id: parseInt(deckId!),
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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-2xl font-bold">{deck.title}</h1>
        {deck.description && <p className="mt-2 text-sm" style={{ color: '#64748b' }}>{deck.description}</p>}

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => startReviewMutation.mutate()}
            className="btn btn-primary"
            disabled={!deck.cards || deck.cards.length === 0}
          >
            Start Review
          </button>
          <button
            onClick={() => setAddCardOpen(true)}
            className="btn btn-secondary"
          >
            Add Card
          </button>
          <button
            onClick={() => {
              setEditDeckTitle(deck.title);
              setEditDeckDescription(deck.description || "");
              setEditDeckOpen(true);
            }}
            className="btn btn-secondary"
          >
            Edit Deck
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this deck? This action cannot be undone.")) {
                deleteDeckMutation.mutate();
              }
            }}
            className="btn btn-secondary"
            style={{ color: '#ef4444' }}
          >
            Delete Deck
          </button>
        </div>

        <div className="mt-4 flex gap-4 text-sm" style={{ color: '#94a3b8' }}>
          <span>{deck.cards?.length || 0} cards</span>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Cards</h2>
        {deck.cards && deck.cards.length > 0 ? (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {deck.cards.map((card) => (
              <div key={card.id} className="card">
                <div style={{ marginBottom: '1rem' }}>
                  <Flashcard card={card} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCard(card);
                      setEditCardPrompt(card.prompt);
                      setEditCardAnswer(card.answer);
                    }}
                    className="btn btn-secondary flex-1 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCardMutation.mutate(card.id)}
                    className="btn btn-secondary flex-1 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{ color: '#64748b' }}>
            No cards yet. Add your first card to get started.
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      {isAddCardOpen && (
        <div className="modal-overlay" onClick={() => setAddCardOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-header">Add New Card</h3>
            <p className="modal-description">Create a basic flashcard with a question and answer.</p>

            <form
              className="space-y-4 mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                addCardMutation.mutate();
              }}
            >
              <div className="form-group">
                <label className="form-label">Question (Front)</label>
                <textarea
                  className="form-textarea"
                  value={newCardPrompt}
                  onChange={(e) => setNewCardPrompt(e.target.value)}
                  placeholder="What is the capital of France?"
                  required
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Answer (Back)</label>
                <textarea
                  className="form-textarea"
                  value={newCardAnswer}
                  onChange={(e) => setNewCardAnswer(e.target.value)}
                  placeholder="Paris"
                  required
                  rows={3}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setAddCardOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={addCardMutation.isPending}
                >
                  {addCardMutation.isPending ? "Adding..." : "Add Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Deck Modal */}
      {isEditDeckOpen && (
        <div className="modal-overlay" onClick={() => setEditDeckOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-header">Edit Deck</h3>
            <p className="modal-description">Update the deck's title and description.</p>

            <form
              className="space-y-4 mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                editDeckMutation.mutate();
              }}
            >
              <div className="form-group">
                <label className="form-label">Deck Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={editDeckTitle}
                  onChange={(e) => setEditDeckTitle(e.target.value)}
                  placeholder="Deck title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={editDeckDescription}
                  onChange={(e) => setEditDeckDescription(e.target.value)}
                  placeholder="Deck description"
                  rows={3}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setEditDeckOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={editDeckMutation.isPending}
                >
                  {editDeckMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {editingCard && (
        <div className="modal-overlay" onClick={() => setEditingCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-header">Edit Card</h3>
            <p className="modal-description">Update the card's question and answer.</p>

            <form
              className="space-y-4 mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                editCardMutation.mutate();
              }}
            >
              <div className="form-group">
                <label className="form-label">Question (Front)</label>
                <textarea
                  className="form-textarea"
                  value={editCardPrompt}
                  onChange={(e) => setEditCardPrompt(e.target.value)}
                  placeholder="What is the capital of France?"
                  required
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Answer (Back)</label>
                <textarea
                  className="form-textarea"
                  value={editCardAnswer}
                  onChange={(e) => setEditCardAnswer(e.target.value)}
                  placeholder="Paris"
                  required
                  rows={3}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={editCardMutation.isPending}
                >
                  {editCardMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

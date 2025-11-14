import { Link } from "react-router-dom";
import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";

import type { DeckSummary } from "@/types/api";

export const DeckCard = ({ deck }: { deck: DeckSummary }) => {
  return (
    <Link
      to={`/app/decks/${deck.id}`}
      className="deck-card"
    >
      <div className="deck-stats">
        <span>{deck.card_count} cards</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--brand-600)', fontSize: '0.75rem' }}>
          <ClockIcon style={{ width: '1rem', height: '1rem' }} /> {deck.due_count} due
        </span>
      </div>

      <h3 className="deck-title">{deck.title}</h3>

      <p className="deck-description">
        {deck.description ?? "Stay on track with fresh cards and adaptive scheduling."}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
        {deck.tags.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className="rounded-full px-4 py-2 text-xs font-medium"
            style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--brand-600)' }}
          >
            {tag.name}
          </span>
        ))}
        {deck.tags.length > 3 && (
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            +{deck.tags.length - 3} more
          </span>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 500, color: 'var(--brand-600)' }}>
        View deck
        <ArrowRightIcon style={{ width: '1rem', height: '1rem' }} />
      </div>
    </Link>
  );
};

import { useState } from "react";

import type { Card } from "@/types/api";

type FlashcardProps = {
  card: Card;
  flipped?: boolean;
  onToggle?: () => void;
};

export const Flashcard = ({ card, flipped, onToggle }: FlashcardProps) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isControlled = typeof flipped === "boolean";
  const isFlipped = isControlled ? flipped : internalFlipped;

  const handleClick = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="flashcard-text">{card.prompt}</div>
        </div>
        <div className="flashcard-back">
          <div className="flashcard-text">{card.answer}</div>
        </div>
      </div>
    </div>
  );
};

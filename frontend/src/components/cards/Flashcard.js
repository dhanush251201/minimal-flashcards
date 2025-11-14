import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export const Flashcard = ({ card, flipped, onToggle }) => {
    const [internalFlipped, setInternalFlipped] = useState(false);
    const isControlled = typeof flipped === "boolean";
    const isFlipped = isControlled ? flipped : internalFlipped;
    const handleClick = () => {
        if (isControlled) {
            onToggle?.();
        }
        else {
            setInternalFlipped((prev) => !prev);
        }
    };
    return (_jsx("div", { className: `flashcard ${isFlipped ? 'flipped' : ''}`, onClick: handleClick, children: _jsxs("div", { className: "flashcard-inner", children: [_jsx("div", { className: "flashcard-front", children: _jsx("div", { className: "flashcard-text", children: card.prompt }) }), _jsx("div", { className: "flashcard-back", children: _jsx("div", { className: "flashcard-text", children: card.answer }) })] }) }));
};

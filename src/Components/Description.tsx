// components/Description.tsx
"use client";
import { useState } from "react";

export default function Description({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  const visibleText = expanded ? text : text.slice(0, limit);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Descripción</h3>
      <p className="text-gray-700">
        {visibleText}
        {!expanded && text.length > limit && "..."}
      </p>
      {text.length > limit && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-orange font-medium mt-2"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}

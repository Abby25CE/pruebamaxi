"use client";
import { useState } from "react";

export default function Description({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  const safeText = text || "";
  const shouldTruncate = safeText.length > limit;
  const visibleText =
    expanded || !shouldTruncate ? safeText : safeText.slice(0, limit);

  if (!safeText) return null;

  // Debug: Añade esto temporalmente para ver los valores
  console.log({
    textLength: safeText.length,
    limit,
    shouldTruncate,
    expanded,
    visibleTextLength: visibleText.length,
  });

  return (
    <div className="mt-6 font-sans">
      <h3 className="text-lg font-semibold mb-2">Descripción</h3>
      <p className="text-gray-700">
        {visibleText}
        {!expanded && shouldTruncate && "..."}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-orange-500 font-medium mt-2 hover:cursor-pointer hover:underline"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}

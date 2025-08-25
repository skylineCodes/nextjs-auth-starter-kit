// components/UseCaseSelector.tsx
"use client";

import { useState } from "react";
import clsx from "clsx";

const USE_CASES = [
  { label: "Summarize", value: "summarize" },
  { label: "Extract Clauses", value: "extract_clauses" },
  { label: "Generate Legal Questions", value: "legal_questions" },
  { label: "Summarize + Legal Questions", value: "summarize_legal_questions" },
];

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export default function UseCaseSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {USE_CASES.map((useCase) => (
        <button
          key={useCase.value}
          onClick={() => onSelect(useCase.value)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm border transition-all",
            selected === useCase.value
              ? "bg-black text-white border-black"
              : "bg-white text-gray-800 border-gray-300"
          )}
        >
          {useCase.label}
        </button>
      ))}
    </div>
  );
}

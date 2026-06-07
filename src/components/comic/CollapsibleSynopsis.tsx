"use client";

import React, { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface CollapsibleSynopsisProps {
  text: string;
}

export default function CollapsibleSynopsis({ text }: CollapsibleSynopsisProps) {
  const [expanded, setExpanded] = useState(false);

  const cleanText = text || "No synopsis available.";
  const showButton = cleanText.length > 280;

  return (
    <div className="space-y-2.5" id="synopsis-wrapper">
      <div 
        className={`text-sm text-text-secondary leading-relaxed transition-all duration-300 ${
          !expanded && showButton ? "line-clamp-4 md:line-clamp-none" : ""
        }`}
        id="synopsis-content-text"
      >
        {cleanText}
      </div>

      {showButton && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="md:hidden flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover tracking-wider uppercase py-1 cursor-pointer transition-colors"
          aria-expanded={expanded}
          id="btn-synopsis-toggle"
        >
          <span>{expanded ? "Show Less" : "Read More"}</span>
          {expanded ? <LuChevronUp size={12} aria-hidden="true" /> : <LuChevronDown size={12} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

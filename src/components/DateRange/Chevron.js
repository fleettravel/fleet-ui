import React from "react";

// Overrides react-day-picker's built-in Chevron (see
// node_modules/react-day-picker/src/components/Chevron.tsx) with the exact
// path from the original design's prev/next caret SVG — react-day-picker's
// own chevron is a different shape entirely, not just a styling mismatch.
export function Chevron({ orientation }) {
  const rotation = orientation === "right" ? "rotate(180deg)" : "none";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ transform: rotation }}>
      <path
        fillRule="evenodd"
        d="M14.207 7.793a1 1 0 0 1 0 1.414L11.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0z"
        fill="#777e91"
      />
    </svg>
  );
}

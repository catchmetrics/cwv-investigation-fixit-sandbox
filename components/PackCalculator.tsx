"use client";

import { useState } from "react";

/*
 * PackCalculator — a "Calculate pack load" button that does heavy work.
 *
 * CWV-ISSUE[INP][LoAF]: The onClick handler runs a ~300,000,000-iteration
 * synchronous loop on the main thread. While it runs, the browser cannot respond
 * to any input, render frames, or fire events — producing a single Long
 * Animation Frame (LoAF) of several hundred milliseconds and a terrible
 * Interaction to Next Paint (INP) for this interaction.
 * CWV-FIX: move the heavy computation off the critical path — chunk it across
 * frames (setTimeout / requestIdleCallback / scheduler.yield), offload it to a
 * Web Worker, or precompute/memoize the result so the click handler returns
 * almost immediately and the UI stays responsive.
 */
export default function PackCalculator() {
  const [score, setScore] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  function computeLoad() {
    setRunning(true);

    // Synchronous, main-thread-blocking busy work. This is the whole point.
    let total = 0;
    for (let i = 0; i < 300_000_000; i++) {
      total += Math.sqrt(i) * 0.000001;
    }

    setScore(Math.round((total % 100) * 10) / 10);
    setRunning(false);
  }

  return (
    <div className="card">
      <h3>Base-weight calculator</h3>
      <p className="muted" style={{ marginBottom: "1rem" }}>
        Crunches your gear list, food, and water against terrain and trip length
        to estimate a recommended base weight for your pack.
      </p>
      <button className="button" onClick={computeLoad} disabled={running}>
        {running ? "Calculating…" : "Calculate pack load"}
      </button>
      {score !== null && (
        <p style={{ marginTop: "1rem" }}>
          Recommended base weight: <strong>{score} kg</strong>
        </p>
      )}
    </div>
  );
}

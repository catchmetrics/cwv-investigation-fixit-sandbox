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

  async function computeLoad() {
    setRunning(true);

    // Same computation as before, but chunked across event-loop turns so it no
    // longer runs as one long, main-thread-blocking task. Each chunk is short,
    // and we yield to the browser between chunks so it can paint and handle
    // input — keeping INP low while producing an identical result.
    let total = 0;
    const TOTAL = 300_000_000;
    const CHUNK = 5_000_000;
    for (let start = 0; start < TOTAL; start += CHUNK) {
      const end = Math.min(start + CHUNK, TOTAL);
      for (let i = start; i < end; i++) {
        total += Math.sqrt(i) * 0.000001;
      }
      // Yield to the event loop so the main thread stays responsive.
      await new Promise((resolve) => setTimeout(resolve));
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

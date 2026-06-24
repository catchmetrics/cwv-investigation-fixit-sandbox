"use client";

import { useState } from "react";

/*
 * HeavyButton — an "Estimate trip difficulty" button that does heavy work.
 *
 * CWV-ISSUE[INP]: The onClick handler runs a ~300,000,000-iteration synchronous
 * loop on the main thread. While it runs, the browser cannot respond to any
 * input, render frames, or fire events — producing a single Long Animation Frame
 * (LoAF) of several hundred milliseconds and a terrible Interaction to Next
 * Paint (INP) for this interaction.
 * CWV-FIX: move the heavy computation off the critical path — chunk it across
 * frames (setTimeout / requestIdleCallback / scheduler.yield), offload it to a
 * Web Worker, or precompute/memoize the result so the click handler returns
 * almost immediately and the UI stays responsive.
 */
export default function HeavyButton() {
  const [score, setScore] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  function computeDifficulty() {
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
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h3>Trip difficulty estimator</h3>
      <p className="muted" style={{ marginBottom: "1rem" }}>
        Crunches terrain, elevation, and weather data to score your planned route.
      </p>
      <button className="button" onClick={computeDifficulty} disabled={running}>
        {running ? "Calculating…" : "Estimate difficulty"}
      </button>
      {score !== null && (
        <p style={{ marginTop: "1rem" }}>
          Estimated difficulty: <strong>{score} / 100</strong>
        </p>
      )}
    </div>
  );
}

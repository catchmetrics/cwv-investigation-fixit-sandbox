"use client";

import { useEffect, useRef } from "react";

/*
 * ErrorScenarios — deliberately triggers realistic JavaScript errors.
 *
 * Each scenario fires once per page load with a short stagger so the error
 * tracking captures distinct stack traces and timestamps. The errors mimic
 * common real-world patterns: null-reference crashes, failed API responses,
 * missing globals, type coercion bugs, and unhandled promise rejections.
 *
 * This component is invisible in the UI — it renders nothing.
 */

function parseUserProfile(json: string) {
  const data = JSON.parse(json);
  return data.user.profile.displayName;
}

function formatPrice(item: { price?: unknown }) {
  const cents = (item.price as number).toFixed(2);
  return `$${cents}`;
}

async function fetchInventory() {
  const res = await fetch("/api/inventory/check");
  if (!res.ok) throw new Error(`Inventory API returned ${res.status}`);
  return res.json();
}

function initThirdPartyWidget() {
  // Simulates accessing a global that a third-party script was supposed to define
  // but failed to load (ad blocker, network error, script load race).
  const w = window as unknown as Record<string, unknown>;
  if (!w.__northpeak_analytics) {
    throw new ReferenceError("__northpeak_analytics is not defined");
  }
}

function processCartItems(items: unknown) {
  // A real bug: code assumes items is always an array but the API
  // sometimes returns { items: null } when the cart is empty.
  (items as unknown[]).forEach((item: unknown) => {
    const i = item as { sku: string };
    document.getElementById(`cart-${i.sku}`)?.classList.add("active");
  });
}

export default function ErrorScenarios() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // 1. TypeError — null dereference deep in a call chain (very common)
    setTimeout(() => {
      try {
        parseUserProfile('{"user": {"profile": null}}');
      } catch {
        // Re-throw so the global error handler picks it up
        setTimeout(() => {
          parseUserProfile('{"user": {"profile": null}}');
        }, 0);
      }
    }, 800);

    // 2. TypeError — calling method on undefined (cart items bug)
    setTimeout(() => {
      processCartItems(null);
    }, 1600);

    // 3. ReferenceError — missing third-party global
    setTimeout(() => {
      initThirdPartyWidget();
    }, 2400);

    // 4. Unhandled promise rejection — failed API fetch
    setTimeout(() => {
      fetchInventory();
    }, 3200);

    // 5. TypeError — calling .toFixed on undefined
    setTimeout(() => {
      formatPrice({ price: undefined });
    }, 4000);

    // 6. SyntaxError — malformed JSON from "API response"
    setTimeout(() => {
      JSON.parse('{"items": [{"sku": "NP-001", "name": "Summit Pack"');
    }, 4800);

    // 7. RangeError — invalid array length (e.g. bad pagination calc)
    setTimeout(() => {
      const pageSize = -1; // bug: negative page size from query param
      new Array(pageSize);
    }, 5600);
  }, []);

  return null;
}

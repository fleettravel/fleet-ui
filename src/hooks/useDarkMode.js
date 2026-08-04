import { useEffect, useState, useSyncExternalStore } from "react";

// Replaces the `use-dark-mode` package (dropped — its "^16.8.0" react peer
// requirement was the actual reason `npm install` needed --legacy-peer-deps
// here, separately from react-dates). Same externally observable behavior:
// toggling flips a `dark-mode` class on <body> (see styles/common.sass and
// helpers.sass, which target that exact class) and persists the choice to
// localStorage under the given key. Every component calling this hook shares
// one value — `use-dark-mode` did too, via its own internal singleton — via
// a module-level store + useSyncExternalStore so Image.js and Theme/index.js
// (which each call this independently, with no shared state of their own)
// stay in sync with each other and with whatever class is currently on
// <body>.
let value = false;
let storageKey = null;
const listeners = new Set();

function applyToBody(next) {
  document.body.classList.toggle("dark-mode", next);
}

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return value;
}

export default function useDarkMode(initialValue = false, { storageKey: key } = {}) {
  const [initialized, setInitialized] = useState(false);
  const current = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    if (initialized) return;
    storageKey = key ?? storageKey;
    const stored = storageKey ? localStorage.getItem(storageKey) : null;
    value = stored !== null ? stored === "true" : initialValue;
    applyToBody(value);
    setInitialized(true);
    notify();
    // Only ever needs to seed from storage once per app load — later
    // toggle() calls are the sole source of truth after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  function set(next) {
    value = next;
    applyToBody(value);
    if (storageKey) localStorage.setItem(storageKey, String(value));
    notify();
  }

  return {
    value: current,
    toggle: () => set(!value),
    enable: () => set(true),
    disable: () => set(false),
  };
}

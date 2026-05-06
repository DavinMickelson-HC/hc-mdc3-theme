import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'hc-theme';

/**
 * Manages the application colour-theme (light / dark / system preference).
 *
 * Sets a `data-theme` attribute on `<html>` that the global stylesheet uses
 * to toggle between the light and dark `mat.theme()` blocks.
 *
 * The chosen mode is persisted to `localStorage` so it survives page reloads.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** The currently active theme mode. Write via `setMode()`. */
  readonly mode = signal<ThemeMode>(this.#readStoredMode());

  constructor() {
    // Reactively apply + persist whenever `mode` changes.
    effect(() => {
      const mode = this.mode();
      this.#applyToDocument(mode);
      this.#persist(mode);
    });
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  #readStoredMode(): ThemeMode {
    if (!this.isBrowser) return 'system';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  }

  #applyToDocument(mode: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', mode);
  }

  #persist(mode: ThemeMode): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }
}

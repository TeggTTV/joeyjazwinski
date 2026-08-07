export type AccentColor = string;

export function getStoredAccent(): AccentColor | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accent');
}

export function getDefaultAccent(): AccentColor {
  return '#10B981'; // Emerald by default
}

export function applyAccent(accent: AccentColor): void {
  document.documentElement.style.setProperty('--accent', accent);
}

export function initAccent(): AccentColor {
  const stored = getStoredAccent();
  const accent = stored || getDefaultAccent();
  applyAccent(accent);
  return accent;
}

export function saveAccent(accent: AccentColor): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accent', accent);
  applyAccent(accent);
}

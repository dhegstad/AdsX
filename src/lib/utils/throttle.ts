/**
 * Throttles a function to run at most once per animation frame
 * More appropriate than debounce for scroll events as it syncs with browser repaints
 */
export function throttleRAF<T extends (...args: unknown[]) => void>(fn: T): T {
  let rafId: number | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };

  return throttled as T;
}

/**
 * Simple debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };

  return debounced as T;
}

/**
 * Converts text to URL-friendly slug
 * Used for categories, tags, and other dynamic routes
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Formats a date string for display
 * @param date - ISO date string
 * @param format - 'long' (January 15, 2026) or 'short' (JAN 15)
 */
export function formatDate(
  date: string,
  format: "long" | "short" | "iso" = "long"
): string {
  const d = new Date(date);

  switch (format) {
    case "long":
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "short":
      return d
        .toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
        .toUpperCase();
    case "iso":
      return d.toISOString().split("T")[0];
    default:
      return d.toLocaleDateString("en-US");
  }
}

/**
 * Formats a date for uppercase display (used in brutalist theme)
 */
export function formatDateUppercase(date: string): string {
  return new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase()
    .replace(",", "");
}

/**
 * Truncates text to a maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generates initials from a name
 * "John Doe" -> "JD"
 * "AdsX Team" -> "AT"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Pads a number with leading zeros
 * padNumber(5, 2) -> "05"
 */
export function padNumber(num: number, length: number = 2): string {
  return String(num).padStart(length, "0");
}

/**
 * Converts reading time to uppercase format
 * "5 min read" -> "5 MIN READ"
 */
export function formatReadingTime(readingTime: string): string {
  return readingTime.toUpperCase();
}

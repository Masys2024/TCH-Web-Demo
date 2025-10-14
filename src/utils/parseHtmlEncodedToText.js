import he from "he";
import DOMPurify from "dompurify";
import { htmlToText } from "html-to-text";

/**
 * Formats an API description string into either safe HTML or plain text.
 *
 * @param {string} input - The raw API string (may include encoded HTML or Unicode).
 * @param {'html' | 'text'} mode - The output type: 'html' (default) or 'text'.
 * @returns {string} The formatted description, ready for rendering or display.
 */

export function parseHtmlEncodedToText(input, mode = "html") {
  if (!input || typeof input !== "string") return "";

  try {
    // 1️⃣ Decode HTML entities and Unicode escapes
    const decoded = he.decode(input);

    if (mode === "text") {
      // 2️⃣ Convert HTML to plain text (removes tags, keeps readable spacing)
      return htmlToText(decoded, { wordwrap: false });
    }

    // 3️⃣ Sanitize HTML to prevent XSS attacks
    const sanitized = DOMPurify.sanitize(decoded);

    return sanitized;
  } catch (error) {
    console.error("formatDescription error:", error);
    return input; // fallback to raw string
  }
}

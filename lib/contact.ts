// Central Contact & WhatsApp link builder
// PLACEHOLDER — replace with real numbers before launch

export const BRAND_PHONE_DISPLAY = "+91 90000 00001"; // Central Kitchen & HQ (Barkas)

/**
 * Builds a standardized WhatsApp direct-message URL.
 * Automatically formats the country code (defaults to 91 for 10-digit Indian numbers).
 */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  let formattedNumber = digits;

  if (digits.length === 10) {
    formattedNumber = `91${digits}`;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    formattedNumber = digits;
  }

  const baseUrl = `https://wa.me/${formattedNumber}`;
  if (message && message.trim().length > 0) {
    return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
  }
  return baseUrl;
}

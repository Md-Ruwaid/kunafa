// ============================================================================
// ⚠️ CLIENT CONTACT & HOTLINE CONFIGURATION BLOCK (PLACEHOLDER)
// Replace these placeholder contact numbers before production client launch.
// ============================================================================

export const BRAND_CONTACT_CONFIG = {
  // Main Hotline / Central Kitchen & HQ (Barkas)
  mainHotline: "+91 90000 00001", // PLACEHOLDER — Update with verified client hotline

  // Direct branch numbers
  branchPhones: {
    barkas: "+91 90000 00001", // PLACEHOLDER — Update with real Barkas branch number
    malakpet: "+91 90000 00002", // PLACEHOLDER — Update with real Malakpet branch number
    tolichowki: "+91 90000 00003", // PLACEHOLDER — Update with real Tolichowki branch number
    jubileehills: "+91 90000 00004", // PLACEHOLDER — Update with real Jubilee Hills branch number
    aerocity: "+91 90000 00005", // PLACEHOLDER — Update with real Aero City branch number
  },

  // Aero City location details
  aeroCityAddress: "PLACEHOLDER — Aero City, Shamshabad Road, Hyderabad", // PLACEHOLDER — Update with real street address
} as const;

export const BRAND_PHONE_DISPLAY = BRAND_CONTACT_CONFIG.mainHotline;

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

/**
 * Format raw numbers or price strings consistently as "Rs. XXX" or "Rs. XXX/pc"
 */
export function formatPrice(value: number | string): string {
  if (typeof value === "number") {
    return `Rs. ${value}`;
  }
  
  if (!value) return "Rs. 0";

  // Standardize string starting with PKR or Rs.
  let cleaned = value.trim();
  cleaned = cleaned.replace(/^(PKR|Rs\.?)\s*/i, "").trim();
  
  // Extract number and trailing suffix if any (e.g. "1900/kg", "30/pc")
  const match = cleaned.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (match) {
    const num = match[1];
    const suffix = match[2] ? ` ${match[2]}` : "";
    return `Rs. ${num}${suffix}`;
  }

  return `Rs. ${cleaned}`;
}

/* ================== AVATAR ALT ================== */
export function getAvatarAlt(userName: string): string {
  return userName ? `${userName}'s avatar` : "User avatar";
}

export const normalizeWebsite = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;
};

export const isValidWebsiteFinal = (value: string): boolean => {
  if (!value.trim()) return true; 

  const normalized = normalizeWebsite(value);

  return (
    normalized.includes(".") &&
    (() => {
      try {
        new URL(normalized);
        return true;
      } catch {
        return false;
      }
    })()
  );
};

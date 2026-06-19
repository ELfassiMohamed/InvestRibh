/**
 * Utilitaires de formatage pour la plateforme.
 * Tous les formats respectent la locale fr-FR + devise MAD.
 */

const mad = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

const madDecimal = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 2,
});

const num = new Intl.NumberFormat("fr-FR");
const pct = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1,
});

export function formatMAD(value: number, decimals = false): string {
  return (decimals ? madDecimal : mad).format(value);
}

export function formatNumber(value: number): string {
  return num.format(value);
}

export function formatPercent(value: number, asFraction = false): string {
  return pct.format(asFraction ? value : value / 100);
}

export function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function formatDateLong(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Masque une donnée sensible (CIN, RIB) en ne laissant que les derniers caractères.
 */
export function maskSensitive(value: string, visible = 4): string {
  const cleaned = value.replace(/\s/g, "");
  if (cleaned.length <= visible) return "••••";
  const last = cleaned.slice(-visible);
  return `•••• •••• ${last}`;
}

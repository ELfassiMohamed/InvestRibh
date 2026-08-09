import { useTranslation } from "react-i18next";
import { modeMeta } from "@/lib/modes";

interface ModeTabsProps {
  value?: string;
  onChange: (slug?: string) => void;
}

export function ModeTabs({ value, onChange }: ModeTabsProps) {
  const { t } = useTranslation();
  const active = value ?? "";
  const pills = [
    { slug: "", label: t("modes.all") },
    ...modeMeta.map((m) => ({ slug: m.slug, label: t(m.labelKey) })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((p) => (
        <button
          key={p.slug}
          onClick={() => onChange(p.slug || undefined)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === p.slug
              ? "border-primary bg-primary text-on-primary"
              : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

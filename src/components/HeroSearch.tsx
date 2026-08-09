import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { modeMeta } from "@/lib/modes";

export function HeroSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const options = [
    { value: "all", label: t("hero.types.tous") },
    ...modeMeta.map((m) => ({ value: m.slug, label: t(m.labelKey) })),
  ];

  const current = options.find((o) => o.value === mode) ?? options[0];

  const submit = () => {
    void navigate({
      to: "/projets",
      search: { mode: mode === "all" ? undefined : mode, q: q.trim() || undefined },
    });
  };

  return (
    <div className="flex items-center rounded-full bg-surface-lowest p-1.5 shadow-elevated backdrop-blur-md">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-on-surface hover:bg-surface-container"
        >
          {current.label}
          <ChevronDown className="h-4 w-4 opacity-60" />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl bg-surface-lowest p-1.5 shadow-elevated">
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  setMode(o.value);
                  setOpen(false);
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-container"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="hidden h-6 w-px bg-outline-variant sm:block" />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder={t("hero.searchPlaceholder")}
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
      />
      <button
        aria-label={t("hero.search")}
        onClick={submit}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-container"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}

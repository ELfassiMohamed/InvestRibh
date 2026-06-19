import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const types = ["Tous", "Immobilier", "Crypto", "Startup & Affaires", "Talent", "Objets de valeur"];

export function HeroSearch() {
  const [type, setType] = useState(types[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center rounded-full bg-surface-lowest p-1.5 shadow-elevated backdrop-blur-md">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-on-surface hover:bg-surface-container"
        >
          {type}
          <ChevronDown className="h-4 w-4 opacity-60" />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl bg-surface-lowest p-1.5 shadow-elevated">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setOpen(false);
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-container"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="hidden h-6 w-px bg-outline-variant sm:block" />
      <input
        type="text"
        placeholder="Que cherchez-vous ?"
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
      />
      <button
        aria-label="Rechercher"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-container"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}

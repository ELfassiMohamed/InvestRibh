import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { availableLanguages, changeLanguage, getCurrentLanguage } from "@/lib/i18n";

export function TopUtilityBar() {
  const { t } = useTranslation();
  const current = getCurrentLanguage();

  return (
    <div className="bg-inverse-surface text-inverse-on-surface">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-2 text-xs sm:px-10">
        <div className="flex items-center gap-1">
          {availableLanguages.map((lang) => {
            const active = current === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
                  active
                    ? "bg-primary text-on-primary"
                    : "hover:text-inverse-primary"
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/ou-investir"
            className="hidden items-center gap-1.5 rounded-md bg-primary-container/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-primary-container/30 sm:inline-flex"
          >
            Où investir ?
          </Link>
          <Link
            to="/login"
            className="ml-2 flex items-center gap-1.5 rounded-md bg-primary-container/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-primary-container/30"
          >
            <User className="h-3.5 w-3.5" />
            {t("common.login")}
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Bell, Heart, Share2, ShoppingBag, User } from "lucide-react";
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
          <button aria-label={t("topBar.share")} className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <Share2 className="h-4 w-4" />
          </button>
          <button aria-label={t("topBar.notifications")} className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <Bell className="h-4 w-4" />
          </button>
          <button aria-label={t("topBar.favorites")} className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <Heart className="h-4 w-4" />
          </button>
          <button aria-label={t("topBar.cart")} className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <ShoppingBag className="h-4 w-4" />
          </button>
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

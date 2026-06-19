import { Link } from "@tanstack/react-router";
import { Bell, Heart, Share2, ShoppingBag, User } from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="bg-inverse-surface text-inverse-on-surface">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-2 text-xs sm:px-10">
        <div className="flex items-center gap-4">
          <button className="label-sm hover:text-inverse-primary transition-colors">
            Français
          </button>
          <span className="text-outline-variant/40">|</span>
          <button className="label-sm hover:text-inverse-primary transition-colors">
            MAD
          </button>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <button aria-label="Partager" className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <Share2 className="h-4 w-4" />
          </button>
          <button aria-label="Notifications" className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <Bell className="h-4 w-4" />
          </button>
          <button aria-label="Favoris" className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <Heart className="h-4 w-4" />
          </button>
          <button aria-label="Panier" className="hidden p-2 hover:text-inverse-primary sm:inline-flex">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <Link
            to="/investisseur"
            className="ml-2 flex items-center gap-1.5 rounded-md bg-primary-container/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-primary-container/30"
          >
            <User className="h-3.5 w-3.5" />
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

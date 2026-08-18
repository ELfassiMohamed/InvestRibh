import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";

import favicon from "@/assets/favicon.png";
import { availableLanguages, changeLanguage, getCurrentLanguage } from "@/lib/i18n";

const NAV_ITEMS = [
  { labelKey: "common.home", to: "/" },
  { labelKey: "navbar.projets", to: "/projects" },
  { labelKey: "faq.navLabel", to: "/faq" },
  { labelKey: "assurance.navLabel", to: "/assurance" },
] as const;

const Navbar1 = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = getCurrentLanguage();

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const isActive = (to: string) => pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));

  return (
    <div className="flex w-full justify-center px-4 py-6">
      <div className="relative z-10 flex w-full max-w-3xl items-center justify-between rounded-full bg-surface-lowest px-6 py-3 shadow-elevated ring-1 ring-outline-variant/50">
        <Link to="/" className="flex items-center" aria-label="Place2Invest" onClick={closeMenu}>
          <motion.img
            src={favicon}
            alt="Place2Invest"
            className="mr-6 h-8 w-8 rounded-full object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.to) ? "text-primary" : "text-on-surface hover:text-primary"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Language Switcher */}
        <div className="mr-1 hidden items-center gap-1 md:flex">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
                current === lang.code
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-on-primary transition-colors hover:bg-primary-container"
          >
            {t("common.login")}
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="flex items-center md:hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? t("common.back") : t("common.login")}
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6 text-on-surface" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-surface-lowest px-6 pt-24 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute right-6 top-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6 text-on-surface" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
                      current === lang.code
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className={`text-base font-medium ${
                      isActive(item.to) ? "text-primary" : "text-on-surface"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-base text-on-primary transition-colors hover:bg-primary-container"
                >
                  {t("common.login")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
